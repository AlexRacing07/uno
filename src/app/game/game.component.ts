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
    Player2.draw(7);

    Player1.place(10,"1.r")

    for(let i in Player1.ownedCards) {
      console.log(Player1.ownedCards[parseInt(i)]);
    }
    console.log("Karte 1: owned = " + Cards[Player1.ownedCards[0]].owned);
    console.log("Karte 2: owned = " + Cards[Player1.ownedCards[1]].owned);
    console.log("Karte 3: owned = " + Cards[Player1.ownedCards[2]].owned);
    console.log("Karte 4: owned = " + Cards[Player1.ownedCards[3]].owned);
    console.log("Karte 5: owned = " + Cards[Player1.ownedCards[4]].owned);
    console.log("Karte 6: owned = " + Cards[Player1.ownedCards[5]].owned);
    console.log("Karte 7: owned = " + Cards[Player1.ownedCards[6]].owned);


  }
}



