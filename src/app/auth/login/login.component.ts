import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO, MenuDTO, MenuItem, ResponseDetailLoginDTO } from 'src/app/model/model-interface';
import { AppSharedService } from 'src/app/services/app-shared-service';
import { UsuariosServiceService } from 'src/app/services/usuarios-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public reactiveMenu: MenuDTO[] = [];
  public error: string = "";

  public myForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required], []],
    password: ['', [Validators.required], []]
  });

  constructor(private fb: FormBuilder, 
    private router: Router,
    private appSharedService: AppSharedService,
    private usuariosServiceService: UsuariosServiceService) { }
  
  ngOnInit(): void {
  }

  login(){
    //console.log('login');
    this.error = "";
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }    

    let login: LoginDTO = {
      userName: this.myForm.get('userName')?.value,
      password: this.myForm.get('password')?.value
    }

    this.usuariosServiceService.login(login).subscribe({
      next:(detalleLogin: ResponseDetailLoginDTO)=>{
        if(detalleLogin!=null){
          //console.log(detalleLogin);
          sessionStorage.setItem('usuario', JSON.stringify(detalleLogin));
          this.reactiveMenu = detalleLogin.menu;          
          this.reactiveMenu.forEach(menuItem => {
            this.appSharedService.actualizarInformacion(menuItem);
          });     
          sessionStorage.setItem('logged', '1');
          this.router.navigate(['./aprendizaje']);     
        }  
      },
      error:(error: any)=>{
        this.error = error.error.message;
      }
    });
  }

  logout(){
    //console.log('logout');
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
