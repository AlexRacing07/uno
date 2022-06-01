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
  cards: CardModel[] = Cards;

  constructor() { }

  ngOnInit(): void {
    // Karten IDs vergeben
    for(let i in this.cards) {
      this.cards[parseInt(i)].id = parseInt(i);
    }

    //////////////////////////////////////////////////////
    //// TESTING /////////////////////////////////////////
    //////////////////////////////////////////////////////

  }

  Start(): string {
    let winner = "";

    // Beide Spieler ziehen 7 Karten
    this.player1.draw(7);
    this.player2.draw(7);


    return winner;
  }
}



