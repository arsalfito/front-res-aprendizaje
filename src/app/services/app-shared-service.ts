// app-shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../model/model-interface';

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  private informacionSubject = new BehaviorSubject<MenuItem | null>(null); // Puedes ajustar el tipo de dato según tus necesidades
  informacion$ = this.informacionSubject.asObservable();

  actualizarInformacion(nuevaInformacion: MenuItem | null) {
    this.informacionSubject.next(nuevaInformacion);
  }
}
