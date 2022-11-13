import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './core/authguard.service';
import { FormularioEducacionComponent } from './educacion/formulario-educacion/formulario-educacion.component';
import { FormularioComponent } from './experiencia/formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PublicationDetailComponent } from './publication/publication-detail/publication-detail.component';
import { PublicationFormComponent } from './publication/publication-form/publication-form.component';
import { PublicationComponent } from './publication/publication.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "home", component:MainComponent},
  {path: "", redirectTo:"home", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path:"publication/form", component:PublicationFormComponent , canActivate:[AuthguardService]},
  {path: "publication", component:PublicationComponent},
  {path: "publication/:id", component:PublicationDetailComponent},
  {path: "register", component:RegisterComponent},
  {path: "experiencia/form", component:FormularioComponent , canActivate:[AuthguardService]},
  {path: "experiencia/form/:id", component:FormularioComponent},
  {path: "educacion/form", component:FormularioEducacionComponent , canActivate:[AuthguardService]},
  {path: "educacion/form/:id", component:FormularioEducacionComponent},
  
  {
    path: "**",
    component: PagenotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
