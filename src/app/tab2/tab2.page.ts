import { Component, OnInit } from '@angular/core';
import { PeliculasServiceService } from '../services/peliculas-service.service';
import { IMovie, IGenre, IMovieDetail } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ModalDetalleComponent } from '../components/modal-detalle/modal-detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  textoBuscar: string = '';
  peliculas: IMovieDetail[] = [];
  genero: IGenre[] = [];
  spinner: boolean = false;

  slidesOpts = {
    slidesPerView: 0.2,
    freeMode: true,
    spaceBetween: -5
  };

  constructor( private service: PeliculasServiceService,
               private modalCtrl: ModalController ) {}

  async ngOnInit() {
    this.cargarPeliculas();
    this.genero = await this.service.getGenres();
    // this.service.getGenres()
    //   .subscribe( data => {
    //     this.genero.name = data.name;
    //     this.genero.id = data.id
    //     console.log(this.genero);
    //   })
  }

  buscar( event: any ) {

    const valor: string = event.detail.value;
    
    if ( valor.length === 0 ) {
      
      this.spinner = false;
      this.cargarPeliculas();  
    }else {

      this.service.getSearchMovie( valor )
        .subscribe( data => {
          this.peliculas = data.results
          //console.log( this.peliculas )
          this.spinner = false;
        } );
    }
  }

  buscarGenero( genero?: string ) {
    this.service.getSearchMovieGenre( genero )
      .subscribe( data => {
        this.peliculas = data.genres;
        console.log(this.peliculas);
        
      } )
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
  
  cargarPeliculas() {
    this.spinner = true;
    this.service.getMoviesPopularity()
      .subscribe( data => {
        this.peliculas = data.results;
        this.spinner = false;
      } )
  }
}
