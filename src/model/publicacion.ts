import { Comentario } from "./comentario";

export class Publicacion{
    id?:number;
    header?:string;
    imagen?:string;
    body?:string
    constructor(id:number,header:string,imagen:string, body:string, ){
        this.id = id;
        this.header = header;
        this.imagen = imagen
        this.body = body;
    }
}