import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { IMovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculasFavoritas: IMovieDetail[] = [];
  public enFavorito: boolean = false;

  constructor( private storage: Storage,
               private toastCtrl: ToastController ) { 
    storage.create();
    this.cargarPeliculasFavoritas();
  }

  guardarPeliculas( pelicula: IMovieDetail ) {
    
    const existente = this.peliculasFavoritas.find( p => p.id === pelicula.id );

    if ( !existente ) {
      
      this.peliculasFavoritas.unshift( pelicula );
      this.enFavorito = true;
      this.storage.set('Favoritos', this.peliculasFavoritas);
      this.presentToast( 'La pelicula se agrego a Favoritos', 'primary' );
    }else {
      //this.enFavorito = false;
      this.borrarPelicula( pelicula );
    }
  }

  borrarPelicula( pelicula: IMovieDetail ) {

    this.enFavorito = false;
    this.peliculasFavoritas = this.peliculasFavoritas.filter( p => p.id !== pelicula.id );
    this.storage.set('Favoritos', this.peliculasFavoritas);
    this.presentToast( 'La pelicula se removio de Favoritos', 'danger' );
  }

  async cargarPeliculasFavoritas() {
    
    const favoritos = await this.storage.get('Favoritos');
    // especificamos que si favoritos es null, nos carga un 
    // araay vacio
    this.peliculasFavoritas = favoritos || [];
    //this.enFavorito = true;
    return this.peliculasFavoritas;
  }

  async existePelicula( id ) {
    
    await this.cargarPeliculasFavoritas();
    const existente = this.peliculasFavoritas.find( p => p.id === id );

    return (existente) ? true : false;
  }

  async presentToast( mensaje: string, color: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2200,
      color: color
    });

    toast.present();
  }
}
