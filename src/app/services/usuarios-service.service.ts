import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginDTO, ResponseDetailLoginDTO } from '../model/model-interface';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  private baseUrl = 'http://localhost:8080/usuario/v1';

  constructor(private http: HttpClient) { }

  login(login: LoginDTO): Observable<ResponseDetailLoginDTO>{

    if(!login) return of({ success: false, message: 'Faltan credenciales' } as ResponseDetailLoginDTO);

    const url: string = `${ this.baseUrl }/login/`;
    return this.http.post<ResponseDetailLoginDTO>(url, login);
  }

}
