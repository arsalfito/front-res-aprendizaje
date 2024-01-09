import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    console.log('logout');
    sessionStorage.setItem('logged', '0');
    this.router.navigate(['./login/login']);
  }
}
