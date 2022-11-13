import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/model/nuevoUsuario';
import Swal from 'sweetalert2';
import { AuthService } from '../core/auth.service';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isActive:boolean = false;
  errMsj:string;
  registerForm:FormGroup;
  constructor(private route:Router, private authService:AuthService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'nombre' : new FormControl('', Validators.required),
      'nombreUsuario': new FormControl('', Validators.required),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required])
    })

  }


  get Nombre(){
    return this.registerForm.get("nombre");
  }
  get NombreUsuario(){
    return this.registerForm.get("nombreUsuario");
  }
  get Email(){
    return this.registerForm.get("email");
  }
  get Password(){
    return this.registerForm.get("password");
  }

  changeState(value:boolean){
    this.isActive = !this.isActive
    console.log(this.isActive)
   }

   onConsole(){
    console.log(this.registerForm.value)
   }

   onRegister(){
    let usuarioRegistro:NuevoUsuario = this.registerForm.value;
    this.authService.nuevo(usuarioRegistro).subscribe(user => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario  ' + usuarioRegistro.nombreUsuario +'  se ha Creado Correctamente',
        showConfirmButton: false,
        timer: 7000
    },)
       
    this.route.navigate(["/login"])
    },
    err => {
  
      this.errMsj = err.error.mensaje;
      Swal.fire({
        icon: 'error',
        title: this.errMsj,
        text: 'Error con la registración'
      })

    })
   }

}
