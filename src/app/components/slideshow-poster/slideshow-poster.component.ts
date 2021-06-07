import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMovie, IMovieDetail } from '../../interfaces/interfaces';
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: IMovie[] = [];

  slidesOpts = {
    slidesPerView: 3.5,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async verDetalle( id: number ) {
    const modal = await this.modalCtrl.create( {
      component: ModalDetalleComponent,
      componentProps: {
        id
      }
    } );

    modal.present();
  }

}
