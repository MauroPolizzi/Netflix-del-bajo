import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMovie, IMovieDetail } from '../../interfaces/interfaces';
import { ModalDetalleComponent } from '../modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-slideshow-paresr',
  templateUrl: './slideshow-paresr.component.html',
  styleUrls: ['./slideshow-paresr.component.scss'],
})
export class SlideshowParesrComponent implements OnInit {

  @Input() peliculas: IMovie[] = [];
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.5,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async verDetalle( id: string ) {
    const modal = await this.modalCtrl.create( {
      component: ModalDetalleComponent,
      componentProps: {
        id,
      }
    } );

    modal.present();
  }

  verMas() {
    this.cargarMas.emit(); 
  }

}
