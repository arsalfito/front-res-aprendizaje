import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsignaturaDTO, CriteriosEvaluacionAsignaturaDTO, CriteriosEvaluacionDTO, EstudianteGrupoDTO, GrupoDTO, ProgramaDTO, ResponseDTO, ResultadoAprendizajeDTO } from '../model/model-interface';

@Injectable({
  providedIn: 'root'
})
export class CalificacionServiceService {

  private baseUrl = 'http://localhost:8080/calificacion/v1';

  constructor(private http: HttpClient) { }

  findAllProgramas(): Observable<ProgramaDTO[]>{
    const url: string = `${ this.baseUrl }/find-all-programas`;
    return this.http.get<ProgramaDTO[]>(url);    
  }

  findAsignaturasProfesor(documento: string, idPrograma: number): Observable<AsignaturaDTO[]>{    
    const url: string = `${ this.baseUrl }/find-asignaturas-profesor/${documento}/${idPrograma}`;
    return this.http.get<AsignaturaDTO[]>(url);
  }

  findGruposByAsignatura(idAsignatura: number, cerrado: boolean): Observable<GrupoDTO[]>{
    const url: string = `${ this.baseUrl }/find-grupos-asignatura/${idAsignatura}/${cerrado}`;
    return this.http.get<GrupoDTO[]>(url);
  }

  findResultadoAprendizajePrograma(idPrograma: number): Observable<ResultadoAprendizajeDTO[]>{
    const url: string = `${ this.baseUrl }/find-resultado-aprendizaje-programa/${idPrograma}`;
    return this.http.get<ResultadoAprendizajeDTO[]>(url);
  }

  findCriteriosEvaluacionPrograma(idPrograma: number): Observable<CriteriosEvaluacionDTO>{
    const url: string = `${ this.baseUrl }/find-criterios-evaluacion-programa/${idPrograma}`;
    return this.http.get<CriteriosEvaluacionDTO>(url);
  }

  findCriteriosEvaluacionAsignatura(idAsignatura: number, idResApr: number): Observable<CriteriosEvaluacionDTO[]>{
    const url: string = `${ this.baseUrl }/find-criterios-evaluacion-asignatura/${idAsignatura}/${idResApr}`;
    return this.http.get<CriteriosEvaluacionAsignaturaDTO[]>(url)
    .pipe(
      map(criterios=>criterios.map(criterio=>({
        id: criterio.criteriosEvaluacionDTO.id,
        codigo: criterio.criteriosEvaluacionDTO.codigo,
        criterio: criterio.criteriosEvaluacionDTO.criterio,
        estado: criterio.criteriosEvaluacionDTO.estado,
        idPrograma: criterio.criteriosEvaluacionDTO.idPrograma,
        idCriterioEvaluacionAsignatura: criterio.id,
      })))
    );
  }

  findEstudiantesByGrupoCriterioEvaluacion(idGrupo: number, idResultado: number, idCriterio: number): Observable<EstudianteGrupoDTO[]>{
    const url: string = `${ this.baseUrl }/find-estudiantes-grupo-criterio-evaluacion/${idGrupo}/${idResultado}/${idCriterio}`;
    return this.http.get<EstudianteGrupoDTO[]>(url);
  }

  registrarCalificaciones(estudiantes: EstudianteGrupoDTO[]): Observable<ResponseDTO>{
    const url: string = `${ this.baseUrl }/registrar-calificaciones`;
    return this.http.post<ResponseDTO>(url, estudiantes);
  }

}
