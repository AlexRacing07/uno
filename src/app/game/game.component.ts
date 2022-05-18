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
    console.log("Hello World");
    console.log(Cards[15].cardId);
    this.cards = this.shuffle(Cards);
    console.log(this.cards[15].cardId);
    Players[0].draw(88);
    console.log(Cards[15].owned);
  }

  shuffle(arr: CardModel[]): CardModel[] {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

}



