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

    console.log(this.StartGame());
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
    GameLoop:
    while(this.player1.score < 500 && this.player2.score < 500 && this.player1.ownedCards.length > 0 && this.player1.ownedCards.length > 0) {
      counter++;
      this.player1.success = false;
      this.player2.success = false;

      //// PLAYER 1: ////

      if (this.lastCardId.includes("+2")) {
        this.player1.draw(2);
      } else {
        this.lastCardVal = this.lastCardId.split(".");
        ForSuccess1:
          for (let i in this.player1.ownedCards) {
            if (this.cards[this.player1.ownedCards[parseInt(i)]].digit == this.lastCardVal[0] || this.cards[this.player1.ownedCards[parseInt(i)]].color.includes(this.lastCardVal[1])) {
              this.lastCardId = this.player1.place(this.player1.ownedCards[parseInt(i)], this.lastCardId);
              this.player1.success = true;
              if(this.player1.success) break ForSuccess1;
            }
          }
        if (!this.player1.success) {
          this.player1.draw(21);
        }
      }

      console.log("Runde: " + counter + " Player 1 Punkte: " + this.player1.score);
      console.log("Player 1 Karten übrig: " + this.player1.ownedCards.length);

      //// PLAYER 2: ////

      if (this.lastCardId.includes("+2")) {
        this.player2.draw(2);
      } else {
        this.lastCardVal = this.lastCardId.split(".");
        ForSuccess2:
          for (let i in this.player2.ownedCards) {
            if (this.cards[this.player2.ownedCards[parseInt(i)]].digit == this.lastCardVal[0] || this.cards[this.player2.ownedCards[parseInt(i)]].color.includes(this.lastCardVal[1])) {
              this.lastCardId = this.player2.place(this.player2.ownedCards[parseInt(i)], this.lastCardId);
              this.player2.success = true;
              if(this.player2.success) break ForSuccess2;
            }
          }
        if (!this.player2.success) {
          this.player2.draw(1);
        }
      }

      console.log("Player 2 Punkte: " + this.player2.score);
      console.log("Player 2 Karten übrig: " + this.player2.ownedCards.length);


      if (counter > 200) break GameLoop;
    }

    // Gewinner ermitteln

    if(this.player1.score >= 500 || this.player1.ownedCards.length == 0) {
      this.winner = "Player 1";
    }
    else if(this.player2.score >= 500 || this.player2.ownedCards.length == 0) {
      this.winner = "Player 2";
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



