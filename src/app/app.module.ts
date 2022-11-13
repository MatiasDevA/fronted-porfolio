import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicationComponent } from './publication/publication.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProvider } from './core/prod-interceptor.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PublicationFormComponent } from './publication/publication-form/publication-form.component';
import { PublicationDetailComponent } from './publication/publication-detail/publication-detail.component'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { EducacionComponent } from './educacion/educacion.component';
import { FormularioComponent } from './experiencia/formulario/formulario.component';
import { FormularioEducacionComponent } from './educacion/formulario-educacion/formulario-educacion.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PublicationComponent,
    PagenotfoundComponent,
    LoadingSpinnerComponent,
    PublicationFormComponent,
    PublicationDetailComponent,
    ExperienciaComponent,
    EducacionComponent,
    FormularioComponent,
    FormularioEducacionComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
