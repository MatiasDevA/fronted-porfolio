import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Experiencia } from 'src/model/experiencia';
import Swal from 'sweetalert2';
import { ExperienciaService } from '../core/experiencia.service';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit, OnDestroy {
  experiencia:Experiencia[]
  skeletonState:boolean = true
  suscription:Subscription;
  constructor(private experienciaService:ExperienciaService,private router:Router, private route:ActivatedRoute,private tokenService:TokenService) { 
  }
 

  ngOnInit(): void {
  this.suscription = this.experienciaService.getAllExperiencia().subscribe( response =>{
    this.experiencia = response
    this.skeletonState = false
  })
  }

 

    deleteUsers(args: any) {
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
              'Se ha eliminado Correctamente',
              'success'
            )
          }
          let id = String(args);
       this.experienciaService.deleteExperiencia(id).subscribe(() => {
     this.suscription
    });
     })
  }
  
  };
  
  onEdit(id:string){
    const getUser = this.tokenService.getToken();
    if(!getUser){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Necesitas registrarte para poder editar',
        footer: '<a href="/register">¿Porque me sucede esto?</a>'
      })
    } else {
      this.router.navigate([`/experiencia/form/${id}`])
    }
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe
   }
}
