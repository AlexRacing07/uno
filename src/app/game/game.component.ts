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
  counter: number = 0;

  constructor() {
    this.counter = 0;
  }

  ngOnInit(): void {
    // Karten IDs vergeben
    for(let i in this.cards) {
      this.cards[parseInt(i)].id = parseInt(i);
    }
    this.player1 = Player1;
    this.player2 = Player2;

    this.resetCards();
    this.generateTopCard();
    this.player1.draw(7);
    this.player2.draw(7);
  }

  // Die Spiel Methode. Wird ausgeführt wenn der Start Button gedrückt wird. Returned den Gewinner für Testing.
  StartGame(): string {


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

  increaseCounter(): void {
    this.counter = this.counter + 1;
  }
}



