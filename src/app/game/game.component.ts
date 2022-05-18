import { Component, OnInit } from '@angular/core';
import { PlayerModel, Players } from "src/app/models/players";
import { CardModel, Cards } from "src/app/models/cards";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  players:PlayerModel[] = []
  cards:CardModel[] = []

  constructor() { }

  ngOnInit(): void {
    this.players = Players;
    for(var index in Cards) {
      Cards[parseInt(index)].id = parseInt(index);
    }

  }

  shuffle(arr: CardModel[]): CardModel[] {
    var j, x, i;
    for (i = Cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = Cards[i];
      Cards[i] = Cards[j];
      Cards[j] = x;
    }
    return Cards;
  }

}



