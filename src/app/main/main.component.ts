
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/model/publicacion';
import { PublicacionService } from '../core/publicacion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
   isActive:boolean = false;
   publicaciones:Publicacion[]
   suscription:Subscription;
   skeletonState:boolean = true
 
  constructor(private publicationService:PublicacionService) { }
 

  ngOnInit(): void {
   this.suscription = this.publicationService.getPublicacion().subscribe( publicacion =>{
      this.publicaciones = publicacion;
      this.skeletonState =false;
    })
  }

  changeState(value:boolean){
   this.isActive = !this.isActive
   
   console.log(this.isActive)
  }

  ngOnDestroy(): void {
  this.suscription.unsubscribe();
  }

}
