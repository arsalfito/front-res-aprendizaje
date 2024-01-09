import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { CriteriosComponent } from './pages/criterios/criterios.component';
import { SalirComponent } from './pages/salir/salir.component';

const routes: Routes = [
  {
    path: '',
    children: [      
      {path: 'calificaciones', component: CalificacionesComponent},
      {path: 'resultados', component: ResultadosComponent},
      {path: 'criterios', component: CriteriosComponent},
      {path: 'salir', component: SalirComponent},
      {path: '**', redirectTo: 'calificaciones'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprendizajeRoutingModule { }
