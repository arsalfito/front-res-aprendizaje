import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

  public logged: string = '0';

  constructor() { }

  ngOnInit(): void {
    this.logged = sessionStorage.getItem('logged')!;
    console.log(this.logged);
  }

}
