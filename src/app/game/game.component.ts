import { Component, OnInit } from '@angular/core';
import { PlayerModel, Player1, Player2 } from "src/app/models/players";
import { CardModel, Cards } from "src/app/models/cards";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  player1: PlayerModel = Player1;
  player2: PlayerModel = Player2;
  cards: CardModel[] = []

  constructor() { }

  ngOnInit(): void {
    for(let i in Cards) {
      Cards[parseInt(i)].id = parseInt(i);
    }
    this.cards = Cards;
    this.player1 = Player1;
    this.player2 = Player2;

    Player1.draw(88);
    Player1.place(10,"5.r")
    console.log("Arraylength: " + Player1.ownedCards.length);
    for(let x in Player1.ownedCards) {
      console.log(Player1.ownedCards[parseInt(x)]);
    }
    console.log(Cards[15].owned)
  }
}



