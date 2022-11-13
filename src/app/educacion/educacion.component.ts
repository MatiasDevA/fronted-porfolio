import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Educacion } from 'src/model/educacion';
import Swal from 'sweetalert2';
import { EducacionService } from '../core/educacion.service';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit ,OnDestroy{
  skeletonState:boolean= true
  educacion:Educacion[]
  suscription:Subscription;
  constructor(private educacionService:EducacionService,private router:Router, private route:ActivatedRoute,private tokenService:TokenService) { 
  }


  ngOnInit(): void {
   this.suscription = this.educacionService.getAllEducacion().subscribe( response =>{
    this.educacion = response
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
       this.educacionService.deleteEducacion(id).subscribe(() => {
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
    this.suscription.unsubscribe();
   }
}
