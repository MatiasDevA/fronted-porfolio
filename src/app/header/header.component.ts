import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   isLogged:boolean = false
  isActivere:boolean = false;
  @Output() isActive = new EventEmitter<boolean>();
  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else { this.isLogged = false}
  }

   toggleBoton(value:boolean){
    this.isActivere = !this.isActivere ;
    this.isActive.emit(value)
  } 

  onLogout():void{
    this.tokenService.logOut();
    window.location.reload();

  }

}
