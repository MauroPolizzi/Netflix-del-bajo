import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../services/data-local.service';
import { ModalDetalleComponent } from '../components/modal-detalle/modal-detalle.component';
import { IGenre, IMovieDetail, IMovie } from '../interfaces/interfaces';
import { PeliculasServiceService } from '../services/peliculas-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  enFavorito: boolean = true;
  favoritoGenero: any[] = [];
  pelicula: IMovieDetail[] = [];
  generos: IGenre[] = [];

  constructor( public serviceLocal: DataLocalService,
               private modalCtrl: ModalController,
               private service: PeliculasServiceService ) 
  {}

  async ngOnInit() {
    this.generos = await this.service.getGenres();
    this.pelicula = await this.serviceLocal.cargarPeliculasFavoritas();
    this.peliculasPorGenero( this.generos, this.pelicula );
  }

  async verDetalle( id: number ) {
    const modal = await this.modalCtrl.create( {
      component: ModalDetalleComponent,
      componentProps: {
        id
      }
    } );

    modal.present();
  }

  peliculasPorGenero( generos: IGenre[], peliculas: IMovieDetail[] ) {
    this.favoritoGenero = [];

    generos.forEach( genero => 
        this.favoritoGenero.push( {
          genero: genero.name,
          pelis: peliculas.filter( peli => {
            return peli.genres.find( genre => genre.id === genero.id );
          } )
        } ) );
        
        //console.log('Pelis por generos' ,this.favoritoGenero);
        
  }

}
