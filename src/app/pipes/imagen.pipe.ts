import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.urlimage;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, size: string = "w500"): string {
    
    // al no tener una imagen, por defecto nos traera esta
    if ( !img ) {
      return './assets/no-image-banner.jpg';
    }

    // concatenamos la url que nos da la api para poder ver la imagen
    // y le agregamos el path de la imagen de cada pelicula que viene
    // en la respuesta de la api, que pasamos a la interfas
    const urlImg = `${ url }/${ size }${ img }`;
    
    return urlImg;
  }

}
