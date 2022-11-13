import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtDTO } from 'src/model/jwttoken';
import { LoginUsuario } from 'src/model/loginUsuario';
import { NuevoUsuario } from 'src/model/nuevoUsuario';
import Swal from 'sweetalert2';
import { LoginService } from '../core/login.service';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isActive:boolean = false;
  loginForm:FormGroup
  errMsj:string | undefined;
  usuarioLogin:NuevoUsuario ;
  isloading:boolean = false;

  constructor(private router:Router, private loginService:LoginService,private tokenService:TokenService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'nombreUsuario' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', Validators.required)
    })

  }


  get NombreUsuario(){
    return this.loginForm.get('nombreUsuario')
  }

  get Password(){
    return this.loginForm.get('password');
  }

  changeState(value:boolean){
    this.isActive = !this.isActive
    console.log(this.isActive)
   }

   onSubmit(){
    let logForm:LoginUsuario = this.loginForm.value
    this.isloading = true;
    if(this.loginForm.valid)
    this.loginService.loginUser(logForm).subscribe((user)=> {
      this.tokenService.setToken(user.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario  ' + logForm.nombreUsuario+'  ha ingresado correctamente',
        showConfirmButton: false,
        timer: 7000
    })
    this.isloading = false;
    this.router.navigate(["/home"])
    }, err => {
      this.errMsj = err.error.message;
        Swal.fire({
          icon: 'error',
          title: this.errMsj,
          text: 'No pudo conectarse'
        })
        this.isloading = false;
    } )
   }

}
