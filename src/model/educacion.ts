export class Educacion{
    id?:string;
    titulo:string;
    descripcion:string;

    constructor(id:string,titulo:string,descripcion:string){
        this.id = id;
        this.titulo = titulo
        this.descripcion = descripcion
    }
}