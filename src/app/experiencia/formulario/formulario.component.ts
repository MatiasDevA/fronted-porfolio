import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaService } from 'src/app/core/experiencia.service';
import { Experiencia } from 'src/model/experiencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  isActive:boolean = false;
  experienciaForm:FormGroup
  experienciaId:string;
  currentExperiencia:Experiencia[] = []
  constructor(private router:Router, private experienciaService:ExperienciaService, private route:ActivatedRoute, private fb:FormBuilder) {
    this.experienciaId = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    if (this.experienciaId) {
        this.experienciaService.getExperienciaById(this.experienciaId)
        .subscribe((response) => {
          this.currentExperiencia.push(response);
          this.experienciaForm = this.fb.group({
            titulo: [
              this.currentExperiencia[0].titulo,
              [Validators.required],
            ],
            descripcion: [
              this.currentExperiencia[0].descripcion,
              Validators.required,
            ],
          });
        });
    } else {
      this.experienciaForm = this.fb.group({
        titulo: ["", [Validators.required]],
        descripcion:["", Validators.required]
      });
    }
  }

  get Titulo(){
    return this.experienciaForm.get('titulo')
  }
  get Descripcion(){
    return this.experienciaForm.get('descripcion')
  }
 



  changeState(value:boolean){
    this.isActive = !this.isActive
    console.log(this.isActive)
   }

   onCommit(){
    let experienciaCommit = {
      titulo: this.experienciaForm.get(['titulo']).value,
      descripcion: this.experienciaForm.get(['descripcion']).value
    }
    if(this.experienciaId){
      this.experienciaService.updateExperiencia(this.experienciaId,experienciaCommit).subscribe(
        (response:Experiencia) =>{
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
      this.experienciaForm.reset()
    } else if(!this.experienciaId){
      this.experienciaService.saveExperiencia(experienciaCommit).subscribe( (response:Experiencia) =>{
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
