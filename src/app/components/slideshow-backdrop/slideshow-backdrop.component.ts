import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMovie } from '../../interfaces/interfaces';
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: IMovie[] = [];

  slidesOpts = {
    slidesPerView: 1.2,
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
