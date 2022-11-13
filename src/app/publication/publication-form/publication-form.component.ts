import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionService } from 'src/app/core/publicacion.service';
import { TokenService } from 'src/app/core/token.service';
import { Publicacion } from 'src/model/publicacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  isActive:boolean = false;
  publicationForm:FormGroup
  archivoImage: string = "";


  constructor(private publicationService:PublicacionService, private route:Router, private tokenService:TokenService) { }

  ngOnInit(): void {

    this.publicationForm = new FormGroup({
      'header' : new FormControl('', Validators.required),
      'imagen' : new FormControl(this.archivoImage, Validators.required),
      'body' : new FormControl('', Validators.required)
    })
  }

  get Header(){
    return this.publicationForm.get('header')
  }
  get Imagen(){
    return this.publicationForm.get('imagen')
  }
  get Body(){
    return this.publicationForm.get('body')
  }

  onSubmit(){
    let publiForm:Publicacion = {
      header: this.publicationForm.get(['header']).value,
      imagen: this.archivoImage,
      body: this.publicationForm.get(['body']).value

    }

    this.publicationService.savePublication(publiForm).subscribe( publication => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La publicacion se ha creado correctamente',
        showConfirmButton: false,
        timer: 2500
    })
    this.route.navigate(["/home"])
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio algun error',
        text: 'No pudo conectarse'
      })
    })
  }


  changeState(value:boolean){
    this.isActive = !this.isActive
    console.log(this.isActive)
   }


   changeImageBase64(event:any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.archivoImage = reader.result as string;
    };
  }
}
