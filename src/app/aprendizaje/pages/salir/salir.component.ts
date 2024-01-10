import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSharedService } from 'src/app/services/app-shared-service';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent implements OnInit {

  constructor(private router: Router,
    private appSharedService: AppSharedService) { }

  ngOnInit(): void {
  }

  logout(){
    console.log('logout');

    this.appSharedService.actualizarInformacion(null);
    sessionStorage.setItem('logged', '0');
    this.router.navigate(['./login/login']);
  }
}
