import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/core/comentario.service';
import { PublicacionService } from 'src/app/core/publicacion.service';
import { Comentario } from 'src/model/comentario';
import { Publicacion } from 'src/model/publicacion';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css'],
})
export class PublicationDetailComponent implements OnInit, OnDestroy {
  publicacion: Publicacion;
  id: number;
  isActive:boolean = false;
  skeletonState:boolean = true;
  publicacionSuscriber: Subscription;
  comentario: Comentario[];
  comment: Comentario = {
    description: '',
    publicacion: {
      id: undefined,
    },
  };
  constructor(
    private publicacionService: PublicacionService,
    private router: ActivatedRoute,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {
    this.publicacionSuscriber = this.router.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.publicacionService
          .getPublicacionbyId(this.id)
          .subscribe((publicacion) => {
            this.publicacion = publicacion;
            this.comment.publicacion.id = this.id;
            this.skeletonState = false
          });
      }
    );

    this.getComentarioBypublicacion(this.id);
  }

  getComentarioBypublicacion(id: number) {
    this.comentarioService
      .getComentariosByPublication(id)
      .subscribe((comentario) => {
        this.comentario = comentario;
      });
  }
  changeState(value:boolean){
    this.isActive = !this.isActive
   }

  onSubmit() {
    this.comentarioService.postComments(this.comment).subscribe(() => {
      this.getComentarioBypublicacion(this.id);
    });
  }

  ngOnDestroy(): void {
    this.publicacionSuscriber.unsubscribe();
  }
}
