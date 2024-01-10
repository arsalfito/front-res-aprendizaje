import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSharedService } from 'src/app/services/app-shared-service';

interface MenuItem{
  title: string;
  route: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public reactiveMenu: MenuItem[] = [];

  public myForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required], []],
    password: ['', [Validators.required], []]
  });

  constructor(private fb: FormBuilder, 
    private router: Router,
    private appSharedService: AppSharedService) { }
  
  ngOnInit(): void {
  }

  login(){
    //console.log('login');
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }    

    this.reactiveMenu = [
      {title: 'Calificaciones', route: './aprendizaje/calificaciones'},
      {title: 'Resultados', route: './aprendizaje/resultados'},
      {title: 'Criterios de evaluación', route: './aprendizaje/criterios'},
      {title: 'Cerrar sesión', route: './aprendizaje/salir'},
    ];

    this.reactiveMenu.forEach(menuItem => {
      this.appSharedService.actualizarInformacion(menuItem);
    });
    //this.appSharedService.actualizarInformacion(this.reactiveMenu[0]);

    sessionStorage.setItem('logged', '1');
    this.router.navigate(['./aprendizaje']);
  }

  logout(){
    console.log('logout');
    sessionStorage.setItem('logged', '0');
    this.router.navigate(['./login/login']);
  }

  isValiedField(field: string):boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caractres.`;
      }
    }
    return '';
  }

}
