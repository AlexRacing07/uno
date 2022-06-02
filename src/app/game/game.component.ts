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

  lastCardId: string = "";
  lastCardVal: string[] = [];
  winner: string = "";

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

  // Die Spiel Methode. Wird ausgeführt wenn der Start Button gedrückt wird. Returned den Gewinner für Testing.
  StartGame(): string {
    // Karten Resetten
    this.resetCards();

    // Beide Spieler ziehen 7 Karten
    this.player1.draw(7);
    this.player2.draw(7);

    // Erste Karte wird gelegt
    this.generateTopCard();

    let counter = 0;
    // Gameloop. Läuft so lange bis einer der Spieler 500 Punkte erreicht oder keine Karten mehr hat.
    while(this.player1.score < 500 && this.player2.score < 500 && this.player1.ownedCards.length > 0 && this.player1.ownedCards.length > 0) {
      counter++;

      // Spieler 1 versucht karte zu legen. Falls unmöglich, 1 Karte ziehen.
      this.lastCardVal = this.lastCardId.split(".");
      if(!this.lastCardVal[0].includes("+2")) {
        for(let i in this.player1.ownedCards) {
          this.lastCardId = this.player1.place(this.player1.ownedCards[parseInt(i)], this.lastCardId);
          if(this.player1.success) { break; }
        }
        if(!this.player1.success) {
          this.player1.draw(1);
        }
      }
      else {
        this.player1.draw(2);
      }
      console.log("Runde " + counter + ": Player 1 Punkte: " + this.player1.score);
      console.log("Player 1 Anzahl Karten: " + this.player1.ownedCards.length);

      // Das selbe für Spieler 2
      this.lastCardVal = this.lastCardId.split(".");
      if(!this.lastCardVal[0].includes("+2")) {
        for(let i in this.player2.ownedCards) {
          this.lastCardId = this.player2.place(this.player2.ownedCards[parseInt(i)], this.lastCardId);
          if(this.player2.success) { break; }
        }
        if(!this.player2.success) {
          this.player2.draw(1);
        }
      }
      else {
        this.player2.draw(2);
      }
      console.log("Player 2 Punkte: " + this.player2.score);
      console.log("Player 2 Anzahl Karten: " + this.player1.ownedCards.length);


    }

    // Gewinner ermitteln

    if(this.player1.score >= 500 || this.player1.ownedCards.length == 0) {
      this.winner = "player1";
    }
    else if(this.player2.score >= 500 || this.player2.ownedCards.length == 0) {
      this.winner = "player2";
    }

    return this.winner;
  }

  // Mit dieser Methode werden alle Karten zurückgesetzt. Alle Karten sind im Stapel, kein Spieler hat Karten.
  resetCards(): void {
    // beide player.ownedCards Arrays leeren
    this.player1.ownedCards = [];
    this.player2.ownedCards = [];

    // cards.owned überall auf false setzen
    for(let i in this.cards) {
      this.cards[parseInt(i)].owned = false;
    }
  }

  // Am Anfang der StartGame() Methode ausgeführt. Randomized welche Karte am Stapel liegt. Es wird die cardId returned, die Karte ist danach nicht owned.
  // Einzige Karte die nicht hier aufgedeckt werden kann ist eine cs karte.
  generateTopCard(): string {
    let id = Math.floor(Math.random() * 84);
    this.lastCardId = this.cards[id].cardId;
    return this.lastCardId;
  }
}



