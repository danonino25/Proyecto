import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Game} from '../models/Games';



@Injectable({
  providedIn: 'root'
})
export class GamesService {
//API_URI = 'http://localhost:3000/src/data';//fuente de datos archivo json y servidor json
API_URI = 'http://localhost:3000/api';//fuente de datos back-en y base de datos
  constructor(private http : HttpClient) { }

  getGames(){
    return this.http.get(`${this.API_URI}/games`);


  }
  getGame(id: string){
    return this.http.get(`${this.API_URI}/games/${id}`);


  }
  saveGames(game: Game){
    return this.http.post(`${this.API_URI}/games`,game);

  }

  deleteGame (id : string){
       return this.http.delete(`${this.API_URI}/games/${id}`);
     

  }
  updateGame (id : string | number, updateGame : Game){
    return this.http.put(`${this.API_URI}/games/${id}`, updateGame);

}
}