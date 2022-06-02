import { Cards } from "src/app/models/cards";

export class PlayerModel {
  public ownedCards: number[];
  public score: number;
  public success: boolean;

  constructor() {
    this.score = 0;
    this.ownedCards = [];
    this.success = false;
  }

  // User zieht angegebene Anzahl an Karten. Funktion stellt sicher das die Karte nicht bereits jemand hat.
  draw(amount: number): void {
    let retry = true;
    let x;
    while(amount>0) {
      while(retry) {
        x = Math.floor(Math.random() * 84);
        if(!this.ownedCards.includes(x) && !Cards[x].owned) {
          Cards[x].owned = true;
          this.ownedCards.push(x);
          retry = false;
        }
      }
      retry = true;
      amount--;
    }
  }

  // Platziert eine Karte. returned die cardId der gelegten Karte für den nächsten Zug.
  // Testet nicht mehr ob die Karte gelegt werden kann. Muss jetzt in der Gameloop manuell gemacht werden.
  place(id: number, lastCardId: string): string {
    // Standard die alte ID für falls nichts gelegt werden kann.
    let newLastCardId = lastCardId;

    // Überprüfen ob der Spieler die Karte hat
    if(this.ownedCards.includes(id)) {
      // Last Card ID setzen
      newLastCardId = Cards[id].cardId;

      // Kartenattribut owned wird auf false gesetzt.
      Cards[id].owned = false;

      // Die Karte wird aus dem SpielerhandArray entfernt. Die kartenID wird im Array mit Stelle 0 ausgetauscht, und dann mit arr.shift() entfernt.
      let temp = this.ownedCards[0];
      let index = this.ownedCards.indexOf(id);
      this.ownedCards[0] = this.ownedCards[index]
      this.ownedCards[index] = temp;
      this.ownedCards.shift();

      // Punkte zuweisen
      // Wenn normale Zahlenkarte
      if(Cards[id].digit.includes("+2")) {
        this.score += 20;
      }
      else if(Cards[id].digit.includes("cs")) {
        this.score += 50;
      }
      else {
        this.score += parseInt(Cards[id].digit);
      }
    }
    return newLastCardId;
  }
}

export const Player1: PlayerModel = new PlayerModel();
export const Player2: PlayerModel = new PlayerModel();

