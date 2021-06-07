import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRespuesta, IMovieDetail, IRespuestaActores, IGenre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { promise } from 'selenium-webdriver';

const url = environment.url;
const apiKey = environment.apiKey;
const language = 'language=es';
const languageImg = 'include_image_language=es';

@Injectable({
  providedIn: 'root'
})
export class PeliculasServiceService {

  private popularityPage = 0;
  private page = 0;
  private generos: IGenre[] = [];

  constructor( private http: HttpClient ) { }


  private getQuery<T>( query: string ) {

    query = url + query;
    query += `&api_key=${ apiKey }&${ language }&${ languageImg }`
    return this.http.get<T>( query );
  }

  getMovies() {

    this.page ++;

    // Aqui obtenemos el rango de las fechas de busqueda por defecto
    
    const today = new Date(); // Fecha de hoy

    // Obtiene el ultimo dia del mes anterior obtenido
    // Ej: si obtiene el mes febrero, obtendra el dia 31 de enero
    // por lo tanto tambien cambia el mes a enero
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0 ).getDate();
    const month = today.getMonth() + 1; // Obtiene el mes y le suma uno, porque JS arrancan desde 0
    let monthString; // Variable en la cual se guarda la concatenacion de un 0 si el mes es menor a 10

    if ( month < 10 ) {
      monthString = '0' + month;
    }else{
      monthString = month;
    }

    // Obtiene siempre el dia 01 del mes, 
    // esta es la fecha con la que se iniciara el rango de busqueda
    const startDate = `${ today.getFullYear() }-${ monthString }-01`;
    // Obtiene siempre el ultimo dia del mes
    // esta sera la fecha con la que terminara el rango de buqueda
    const endDate = `${ today.getFullYear() }-${ monthString }-${ lastDay }`
    
    const query = `/discover/movie?primary_release_date.gte=${ startDate }&primary_release_date.lte=${ endDate }&page=${ this.page }`
    

    return this.getQuery<IRespuesta>( `${ query }` );
  }

  getMoviesPopularity() {
    
    this.popularityPage ++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularityPage }`;

    return this.getQuery<IRespuesta>( `${ query }` )
  }

  getMovieDetail( id: string ) {
    return this.getQuery<IMovieDetail>(`/movie/${ id }?a=1`);
  }

  getActorsMovie( id: string ) {
    return this.getQuery<IRespuestaActores>(`/movie/${ id }/credits?a=1`);
  }

  getSearchMovie( query: string ) {
    return this.getQuery<IRespuesta>(`/search/movie?query=${ query }`);
  }

  getSearchMovieGenre( query: string ) {
    return this.getQuery<IMovieDetail>(`/search/movie?query=${ query }`)
  }

  getGenres(): Promise<IGenre[]> {
    
    return new Promise( resp => {

      this.getQuery(`/genre/movie/list?a=1`)
        .subscribe( data => {
          this.generos = data['genres'];
          //console.log(this.generos);

          resp(this.generos)
        } );
    } )
    
  }
}
