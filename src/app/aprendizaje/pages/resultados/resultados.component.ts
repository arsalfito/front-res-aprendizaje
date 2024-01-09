import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public logged: string = '0';

  constructor() { }

  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged')!;
    console.log(this.logged);
  }

}
