import { Publicacion } from "./publicacion";

export class Comentario{
    id?:number;
    description:string;
    publicacion:Publicacion;
    constructor(id:number,description:string, publicacion:Publicacion){
        this.id = id;
        this.description = description;
        this.publicacion = publicacion;
    }
}