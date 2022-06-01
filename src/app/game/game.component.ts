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
    // Karten IDs vergeben
    for(let i in Cards) {
      Cards[parseInt(i)].id = parseInt(i);
    }
    // Lokale Objekte init
    this.cards = Cards;
    this.player1 = Player1;
    this.player2 = Player2;
    // Beide Spieler starten mit 7 Karten
    Player1.draw(7);

    //////////////////////////////////////////////////////
    //// TESTING /////////////////////////////////////////
    //////////////////////////////////////////////////////

    console.log("Player 1 Kartendeck: ");
    for(let i in Player1.ownedCards) {
      console.log(Player1.ownedCards[parseInt(i)]);
    }
    console.log("Karte 10 owned: " + Cards[10].owned);
    console.log("Player 1 Score: " + Player1.score);

    console.log("----------------------------------------------");

    Player1.place(10,"+2.r");

    console.log("Player 1 Kartendeck nach dem legen: ");
    for(let i in Player1.ownedCards) {
      console.log(Player1.ownedCards[parseInt(i)]);
    }
    console.log("Karte 10 owned: " + Cards[10].owned);
    console.log("Player 1 Score: " + Player1.score);
  }
}



