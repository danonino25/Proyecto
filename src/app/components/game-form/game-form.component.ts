import { Component, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Games';
import { GamesService } from 'src/app/services/games.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})


export class GameFormComponent {
  @HostBinding('class') classes = "row";

  game : Game = {
    
    id: 0,
    titulo: '',
    author: '',
    description: '',
    created_at: new  Date (),
  }
  edit: boolean = false;

  constructor(private gamesService: GamesService, private router: Router , private activeRoute : ActivatedRoute){}
  ngOnInit(){
    const params = this.activeRoute.snapshot.params
    if (params['id'] ){
      this.gamesService.getGame(params['id']).subscribe(
        resp => {
          console.log(resp);
          this.game = resp;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewGame(){
    delete this.game.created_at;
    delete this.game.id;
    this.gamesService.saveGames(this.game).subscribe(
      resp=> {console.log(resp)
               this.router.navigate(['/games']);},
      err=> console.error(err)

    )

  }
  updateGame() {
    // Verificar si this.game.id no es undefined antes de llamar a la función
    if (this.game.id !== undefined) {
      this.gamesService.updateGame(this.game.id, this.game);
    }
  }
}
