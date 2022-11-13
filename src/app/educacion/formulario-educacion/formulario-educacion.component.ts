import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EducacionService } from 'src/app/core/educacion.service';
import { Educacion } from 'src/model/educacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-educacion',
  templateUrl: './formulario-educacion.component.html',
  styleUrls: ['./formulario-educacion.component.css']
})
export class FormularioEducacionComponent implements OnInit {
  isActive:boolean = false;
  educacionForm:FormGroup
  educacionId:string;
  currentEducacion:Educacion[] = []
  constructor(private router:Router, private educacionService:EducacionService, private route:ActivatedRoute, private fb:FormBuilder) {
    this.educacionId = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    if (this.educacionId) {
        this.educacionService.getEducacionById(this.educacionId)
        .subscribe((response) => {
          this.currentEducacion.push(response);
          this.educacionForm = this.fb.group({
            titulo: [
              this.currentEducacion[0].titulo,
              [Validators.required],
            ],
            descripcion: [
              this.currentEducacion[0].descripcion,
              Validators.required,
            ],
          });
        });
    } else {
      this.educacionForm = this.fb.group({
        titulo: ["", [Validators.required]],
        descripcion:["", Validators.required]
      });
    }
  }

  get Titulo(){
    return this.educacionForm.get('titulo')
  }
  get Descripcion(){
    return this.educacionForm.get('descripcion')
  }
 



  changeState(value:boolean){
    this.isActive = !this.isActive
    console.log(this.isActive)
   }

   onCommit(){
    let educacionCommit = {
      titulo: this.educacionForm.get(['titulo']).value,
      descripcion: this.educacionForm.get(['descripcion']).value
    }
    if(this.educacionId){
      this.educacionService.updateEducacion(this.educacionId,educacionCommit).subscribe(
        (response:Educacion) =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha actualizado correctamente',
            showConfirmButton: false,
            timer: 2500
        })
          this.router.navigate(['/home']);
          return response;
         
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio algun error',
            text: 'No se pudo actualizar correctamente'
          })
        }) ;
      this.educacionForm.reset()
    } else if(!this.educacionId){
      this.educacionService.saveEducacion(educacionCommit).subscribe( (response:Educacion) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha creado exitosamente!',
          showConfirmButton: false,
          timer: 2500
      })
      this.router.navigate(['/home']);
        return response
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio algun error',
          text: 'No se pudo crear'
        })
      }
      )
    }
   }

}
