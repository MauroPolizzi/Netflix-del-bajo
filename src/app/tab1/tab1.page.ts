import { Component, OnInit } from '@angular/core';
import { PeliculasServiceService } from '../services/peliculas-service.service';
import { IMovie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: IMovie[] = [];
  peliculasPopulares: IMovie[] = [];

  constructor( private service: PeliculasServiceService ) {}

  ngOnInit() {
    this.getMovieRecent();
    this.getMoviesPopularity();
  }
  
  cargarMasPopulares() {
    this.getMoviesPopularity()
  }

  cargarMasRecientes() {
    this.getMovieRecentPoster();
  }
  
  getMovieRecent() {
    this.service.getMovies()
      .subscribe( data => {
        this.peliculasRecientes = data.results;
    } )
  }
  
  getMoviesPopularity() {
    this.service.getMoviesPopularity()
      .subscribe( data => {
        const arrayTemp = [ ...this.peliculasPopulares, ...data.results ];
        this.peliculasPopulares = arrayTemp;
      } )
  }

  getMovieRecentPoster() {
    this.service.getMovies()
      .subscribe( data => {
        const arrayTemp = [...this.peliculasRecientes, ...data.results];
        this.peliculasRecientes = arrayTemp;
      } )
  }

}
