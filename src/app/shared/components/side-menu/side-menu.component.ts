import { Component, Input, OnInit } from '@angular/core';
import { AppSharedService } from 'src/app/services/app-shared-service';

interface MenuItem{
  title: string;
  route: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public reactiveMenu: MenuItem[] = [];

  
   /*public reactiveMenu: MenuItem[] = [
    {title: 'Calificaciones', route: './aprendizaje/calificaciones'},
    {title: 'Resultados', route: './aprendizaje/resultados'},
    {title: 'Criterios de evaluación', route: './aprendizaje/criterios'},
    {title: 'Cerrar sesión', route: './aprendizaje/salir'},
  ];*/
   

  constructor(private appSharedService: AppSharedService) { }

  ngOnInit(): void {
    this.appSharedService.informacion$.subscribe((nuevaInformacion) => {
      if(nuevaInformacion!=null){
        console.log(nuevaInformacion);
        this.reactiveMenu.push(nuevaInformacion!);
      }else{
        this.reactiveMenu = [];
      }     
    });
  }

}
