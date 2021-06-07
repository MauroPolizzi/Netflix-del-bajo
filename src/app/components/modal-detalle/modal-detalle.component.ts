import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculasServiceService } from '../../services/peliculas-service.service';
import { IMovieDetail, ICast } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.scss'],
})
export class ModalDetalleComponent implements OnInit {

  @Input() id: string;
  enFavorito: boolean;
  pelicula: IMovieDetail = {};
  overview: number = 150;
  actores: ICast[] = [];

  slidesOpts = {
    slidesPerView: 3.5,
    freeMode: true,
    spaceBetween: -5
  };

  constructor( private modalCtrl: ModalController,
              private service: PeliculasServiceService,
              public serviceLocal: DataLocalService ) { }

  async ngOnInit() {
    
    const existe = await this.serviceLocal.existePelicula( this.id );
    this.enFavorito = existe;
    //console.log('pelicula detalle: ', existe);
    

    this.service.getMovieDetail( this.id )
      .subscribe( data => {
        this.pelicula = data;
        //console.log('Detalle', this.pelicula);
      } )

      this.service.getActorsMovie( this.id )
        .subscribe( data => {
          this.actores = data.cast;
          //console.log('actores' ,this.actores);
        } )
  }
  
  // cerrarModal() {
  //   this.modalCtrl.dismiss();
  // }

  salirModal() {
    this.modalCtrl.dismiss();
  }

  agregarFavorito() {
    this.serviceLocal.guardarPeliculas( this.pelicula );
    this.enFavorito = true;
    //this.serviceLocal.enFavorito;
    //console.log('Agregar a favoritos');
  }

  borrarFavorito() {
    this.serviceLocal.borrarPelicula( this.pelicula );
    this.enFavorito = false;
  }
}
