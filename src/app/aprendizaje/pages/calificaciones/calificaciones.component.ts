import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  public logged: string = '0';
  constructor() { }

  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged')!;
    console.log(this.logged);
  }

}
