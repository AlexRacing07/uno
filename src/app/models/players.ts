import { Cards } from "src/app/models/cards";

export class PlayerModel {
  public ownedCards: number[];
  public score: number;
  public success: boolean;

  constructor() {
    this.score = 0;
    this.ownedCards = [];
    this.success = true;
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

  // Platziert eine Karte. returned die cardId der gelegten Karte für den nächsten Zug
  place(id: number, lastCardId: string): string {
    // Standard die alte ID für falls nichts gelegt werden kann.
    let newLastCardId = lastCardId;

    // Überprüfen ob der Spieler die Karte hat
    if(this.ownedCards.includes(id)) {
      let lastCardVal = lastCardId.split(".");

      // Überprüfen ob karte cs ist, da wenn die Karte ein cs ist, sie immer gelegt werden kann.
      if (!Cards[id].isCs) {
        // Ob die Karte wegen Farb- oder Zahlübereinstimmung gelegt werden kann

        if (Cards[id].digit.includes(lastCardVal[0]) || Cards[id].color.includes(lastCardVal[1])) {

          // cardId der gelegten Karte wird gespeichert und returned für den nächsten place() (Oberste Karte am Stapel)
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
          if(!Cards[id].digit.includes("+")) {
            this.score = this.score + parseInt(Cards[id].digit);
          }
          else {
            this.score = this.score + 20;
          }
          this.success = true;
        } else {
          this.success = false;
        }
      }
      else {

        ///////////////////////////////
        //// TESTING, DELETE LATER ////
        ///////////////////////////////
        let x = Math.floor(Math.random()*4);
        switch(x) {
          case 0: Cards[id].color = "r"; break;
          case 1: Cards[id].color = "g"; break;
          case 2: Cards[id].color = "b"; break;
          case 3: Cards[id].color = "y"; break;
        }
        ///////////////////////////////
        ///////////////////////////////
        ///////////////////////////////

        // Selbiges wie ab Zeile 40, nur das Kontrollen übersprungen werden da die Karte sowieso gelegt werden kann.
        newLastCardId = Cards[id].cardId;
        Cards[id].owned = false;
        let temp = this.ownedCards[0];
        let index = this.ownedCards.indexOf(id);
        this.ownedCards[0] = this.ownedCards[index]
        this.ownedCards[index] = temp;
        this.ownedCards.shift();
        this.score = this.score + 50;
        this.success = true;
      }
    } else {
      this.success = false;
    }
    return newLastCardId;
  }
}

export const Player1: PlayerModel = new PlayerModel();
export const Player2: PlayerModel = new PlayerModel();

