import { Component, Input, OnInit } from '@angular/core';
import { MenuDTO, MenuItem } from 'src/app/model/model-interface';
import { AppSharedService } from 'src/app/services/app-shared-service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public reactiveMenu: MenuDTO[] = [];
  
  constructor(private appSharedService: AppSharedService) { }

  ngOnInit(): void {
    this.appSharedService.informacion$.subscribe((nuevaInformacion) => {
      if(nuevaInformacion!=null){
        //console.log(nuevaInformacion);
        this.reactiveMenu.push(nuevaInformacion!);
      }else{
        this.reactiveMenu = [];
      }     
    });
  }

}
