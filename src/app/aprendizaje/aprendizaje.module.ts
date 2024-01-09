import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprendizajeRoutingModule } from './aprendizaje-routing.module';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { CriteriosComponent } from './pages/criterios/criterios.component';
import { SharedModule } from '../shared/shared.module';
import { SalirComponent } from './pages/salir/salir.component';


@NgModule({
  declarations: [
    CalificacionesComponent,
    ResultadosComponent,
    CriteriosComponent,
    SalirComponent
  ],
  imports: [
    CommonModule,
    AprendizajeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AprendizajeModule { }
