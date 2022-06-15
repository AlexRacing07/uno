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
  turn: string = "player1";
  lastId: number = -1;
  showCs: boolean = false;

  constructor() {}

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

  draw(player: PlayerModel, amount: number): void {
    player.draw(amount);
    if(this.turn.includes("player1")) { this.turn = "player2"; }
    else if(this.turn.includes("player2")) { this.turn = "player1"; }
  }
  place(player: PlayerModel, id: number): void {
    if(this.turn.includes(player.name)) {
      let stringarr: string[] = player.place(id, this.lastCardId);
      this.lastCardId = stringarr[0];
      if (stringarr[1].includes("true") && !this.lastCardId.includes("cs")) {
        if (this.turn.includes("player1")) {
          this.turn = "player2";
        } else if (this.turn.includes("player2")) {
          this.turn = "player1";
        }
      }
      if(this.lastCardId.includes("+2")) {
        this.plus2()
      }
      if(stringarr[1].includes("true")) {
        this.lastId = id;
      }
      if(this.cards[id].isCs && stringarr[1].includes("true")) {
        this.showCs = true;
      }
    }
  }

  plus2(): void {
    if(this.turn.includes("player1")) {
      this.draw(this.player1, 2);
    }
    else if(this.turn.includes("player2")) {
      this.draw(this.player2, 2);
    }
  }

  colorswitch(color: string, id: number): void {
    this.cards[id].color = color;
    switch(color) {
      case "r": this.cards[id].cardId = "cs.r"; this.lastCardId = "cs.r"; break;
      case "g": this.cards[id].cardId = "cs.g"; this.lastCardId = "cs.g"; break;
      case "b": this.cards[id].cardId = "cs.b"; this.lastCardId = "cs.b"; break;
      case "y": this.cards[id].cardId = "cs.y"; this.lastCardId = "cs.y"; break;
    }
    if (this.turn.includes("player1")) {
      this.turn = "player2";
    }
    else if (this.turn.includes("player2")) {
      this.turn = "player1";
    }
    this.showCs = false;
  }

  player2random(): void {
    setTimeout(() => {
      let x = 0;
      let arr: string[] = [this.lastCardId, "false"];
      while(x < this.player2.ownedCards.length) {
        arr = this.player2.place(this.player2.ownedCards[x], this.lastCardId);
        if(arr[1].includes("true")) {
          this.lastCardId = arr[0];
          this.lastId = this.player2.ownedCards[x];
          break;
        }
        x++;
      }
      if(arr[1].includes("false")) {
        this.player2.draw(1);
      }
      if(this.cards[this.lastId].isCs) {
        this.colorswitch("r", this.lastId);
      }
      this.turn = "player1";
    }, 1000)
  }
}



