import { Component, Input, OnInit } from '@angular/core';

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

  public reactiveMenu: MenuItem[] = [
    {title: 'Calificaciones', route: './aprendizaje/calificaciones'},
    {title: 'Resultados', route: './aprendizaje/resultados'},
    {title: 'Criterios de evaluación', route: './aprendizaje/criterios'},
    {title: 'Cerrar sesión', route: './aprendizaje/salir'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
