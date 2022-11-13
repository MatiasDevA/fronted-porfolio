import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/model/publicacion';
import Swal from 'sweetalert2';
import { PublicacionService } from '../core/publicacion.service';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, OnDestroy {

   publicaciones:Publicacion[] = [];
    suscription:Subscription;
    isActive:boolean = false;
    skeletonState:boolean = true;
  constructor(private publicacionService:PublicacionService, private router:ActivatedRoute, private tokenService:TokenService, private route:Router) {
    
   }
 

  ngOnInit(): void {
   
  this.suscription =  this.publicacionService.getPublicacion().subscribe( publicacion => {
    this.publicaciones = publicacion;
    this.skeletonState = false;
  }
  )


  }

  changeState(value:boolean){
    this.isActive = !this.isActive
   }



  onDelete(id:Number){
    const getUser = this.tokenService.getToken();
    if(!getUser){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Necesitas registrarte para poder eliminar',
        footer: '<a href="/register">¿Porque me sucede esto?</a>'
      })
    } else{
      Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'La publicacion se ha eliminado Correctamente',
            'success'
          )
        }
        this.publicacionService.deletePublication(+id).subscribe( () =>{
          this.suscription
          this.route.navigate(['home'])
        });
    })
}

  }

  
  ngOnDestroy(): void {
  this.suscription.unsubscribe();
  }
}
