import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { filter, forkJoin, switchMap, tap } from 'rxjs';
import { AsignaturaDTO, CriteriosEvaluacionDTO, EstudianteGrupoDTO, GrupoDTO, ProgramaDTO, ResponseDetailLoginDTO, ResultadoAprendizajeDTO } from 'src/app/model/model-interface';
import { CalificacionServiceService } from 'src/app/services/calificacion-service.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  public logged: string = '0';
  public programas: ProgramaDTO[] = [];
  public asignaturasProfesor: AsignaturaDTO[] = [];
  public grupos: GrupoDTO[] = [];
  public resultados: ResultadoAprendizajeDTO[] = [];
  public criterios: CriteriosEvaluacionDTO[] = [];
  public estudiantes: EstudianteGrupoDTO[] = [];
  public documento: string = '';
  public resultadoSelected: number = 0;
  public criterioSelected: number = 0;  
  public asignaturaSelected = 0;
  public error: string = '';
  public mensaje: string = '';

  constructor(private fb: FormBuilder, 
    private calificacionServiceService: CalificacionServiceService) { }

  public myForm: FormGroup = this.fb.group({
    programa: ['', Validators.required],    
    resultado: ['', Validators.required],
    asignatura: ['', Validators.required],
    criterio: ['', Validators.required],
    grupo: ['', Validators.required],
    estudiantesCalificaciones: this.fb.array([]),
  });
  
  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged')!;
    let usuario: ResponseDetailLoginDTO = JSON.parse(sessionStorage.getItem('usuario')!);;
    this.documento = usuario.documento;    
    this.loadProgramas();
    this.onProgramaChange();
    this.onAsignaturaChange();
    this.onResultadoChange();
    this.onCriterioChange();
  }

  get estudiantesCalificaciones() {
    return this.myForm.get('estudiantesCalificaciones') as FormArray;
  }
  
  loadProgramas(){
    this.calificacionServiceService.findAllProgramas()
      .subscribe({
        next:(prog: ProgramaDTO[])=>{          
          this.programas = prog;
        },
        error:(error: any)=>{
          console.log(error.error.message);
        }});
  }

  onProgramaChange() {
    this.myForm.get('programa')!.valueChanges.pipe(
      tap(() => this.myForm.get('asignatura')!.setValue('')),
      tap(()=>this.limpiarVariables()),
      filter((value: any) => typeof value === 'string' && value.length > 0),
      switchMap(programa =>
        forkJoin({
          asignaturas: this.calificacionServiceService.findAsignaturasProfesor(this.documento, programa),
          resultadosAprendizaje: this.calificacionServiceService.findResultadoAprendizajePrograma(programa)          
        })
      )
    ).subscribe(({ asignaturas, resultadosAprendizaje }) => {      
      this.asignaturasProfesor = asignaturas;
      this.resultados = resultadosAprendizaje;      
    });
  }

  onAsignaturaChange(){
    this.myForm.get('asignatura')!.valueChanges.pipe(
      tap(()=>this.myForm.get('grupo')!.setValue('')),    
      tap(()=>this.limpiarVariables()),  
      filter((value: any) => typeof value === 'string' && value.length > 0),
      switchMap(asignatura => 
        forkJoin({          
          grupos: this.calificacionServiceService.findGruposByAsignatura(asignatura, false),
          critriosEvaluacion: this.calificacionServiceService.findCriteriosEvaluacionAsignatura(asignatura, this.resultadoSelected)
        })   
      )     
    ).subscribe(({grupos,critriosEvaluacion})=>{      
      this.asignaturaSelected = this.myForm.get('asignatura')?.value;      
      this.grupos = grupos;
      this.criterios = critriosEvaluacion;
    });
  }

  onResultadoChange(){    
    this.myForm.get('resultado')!.valueChanges.pipe(
      filter((value: any) => typeof value === 'string' && value.length > 0),
      tap(()=>this.myForm.get('criterio')!.setValue('')),
      tap(()=>this.limpiarVariables()),
      tap((resultado)=> this.resultadoSelected = resultado),
      switchMap(resultado=>this.calificacionServiceService.findCriteriosEvaluacionAsignatura(
        this.asignaturaSelected, resultado)),
    ).subscribe(critriosEvaluacion=>{
      this.criterios = critriosEvaluacion;
    })
  }

  onCriterioChange(){
    this.myForm.get('criterio')!.valueChanges.pipe(
      tap(()=>this.limpiarVariables()),
      filter((value: any) => typeof value === 'string' && value.length > 0),
    ).subscribe(criterio=>{      
      this.criterioSelected = criterio;      
    })
  }

  cargarEstudiantes(){
    let idGrupo = this.myForm.get('grupo')?.value;
    let idResultado = this.myForm.get('resultado')?.value;
    let idCriterio = this.myForm.get('criterio')?.value;
    this.calificacionServiceService.findEstudiantesByGrupoCriterioEvaluacion(idGrupo, idResultado, idCriterio)
      .subscribe({
        next:(est=>{
          this.estudiantes = est;
          this.estudiantesCalificaciones.clear();
          this.estudiantes.forEach(elemento=>{
            this.agregarEstudianteCalificacion(elemento.idCalificacion, elemento.codigo, elemento.nombre, elemento.calificacion);
          })
        }),
        error: (error: any)=>{
          console.log(error.error);
        }
      })          
  }

  agregarEstudianteCalificacion(idCalificacion: number, codigo: string, nombre: string, calificacion: number) {    
    this.estudiantesCalificaciones.push(this.fb.group({
      idCalificacion: [idCalificacion, []], 
      codigo: [codigo, Validators.required],
      nombre: [nombre, Validators.required],
      calificacion: [calificacion, Validators.required],
    }));
  }

  registrarCalificaciones(){    
    this.mensaje = '';
    this.error = '';
    let idCriterioEvaluacionAsignatura: number = 0;        
    this.criterios.find(crit=>{
      if(crit.id==this.criterioSelected)
        idCriterioEvaluacionAsignatura = crit.idCriterioEvaluacionAsignatura;
    });
    
    this.estudiantes.forEach(est=>{      
      this.estudiantesCalificaciones.value.forEach((estudiante: any) => {      
        if(est.codigo===estudiante.codigo){          
          est.idCriterioEvaluacionAsignatura = idCriterioEvaluacionAsignatura;
          est.idCalificacion = estudiante.idCalificacion !== undefined ? estudiante.idCalificacion : null;
          est.calificacion = estudiante.calificacion;
        }
      });
    })

    let bandera: boolean = true;
    let mensaje = '';
    this.estudiantes.forEach(est=>{
      if(est.calificacion<0 || est.calificacion > 5){
        bandera = false;
        mensaje += `La calificación del estudiante: ${est.nombre} debe estar entre 0 y 5 -`;
      }
    });

    if(!bandera){
      this.error = mensaje;
      console.log(mensaje);
      return;
    }
    this.calificacionServiceService.registrarCalificaciones(this.estudiantes).subscribe({
      next:(resp=>{
        console.log(resp);
        this.mensaje = resp.message;
        this.cargarEstudiantes();
      }),
      error: (error: any)=>{
        console.log(error.error);
      }
    })
  }

  limpiarVariables(){
    this.error = '';
    this.mensaje = '';
    this.estudiantes = [];
    this.estudiantesCalificaciones.clear();
  }

}
