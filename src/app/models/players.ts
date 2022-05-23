import { Cards } from "src/app/models/cards";

export class PlayerModel {
  public id: number;
  public name: string;
  public ownedCards: number[];
  public score: number;

  constructor(id:number, name:string) {
    this.score = 0;
    this.id = id;
    this.name = name;
    this.ownedCards = [];
  }

  // User zieht angegebene Anzahl an Karten. Funktion stellt sicher das die Karte nicht bereits jemand hat.
  draw(amount: number): void {
    let retry = true;
    let x;
    while(amount>0) {
      while(retry) {
        x = Math.floor(Math.random() * 88);
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
        }
      }
      else {
        // Selbiges wie ab Zeile 40, nur das Kontrollen übersprungen werden da die Karte sowieso gelegt werden kann.
        newLastCardId = Cards[id].cardId;
        Cards[id].owned = false;
        let temp = this.ownedCards[0];
        let index = this.ownedCards.indexOf(id);
        this.ownedCards[0] = this.ownedCards[index]
        this.ownedCards[index] = temp;
        this.ownedCards.shift();
        this.score = this.score + 50;
      }
    }
    return newLastCardId;
  }
}

export const Player1: PlayerModel = new PlayerModel(1,"User");
export const Player2: PlayerModel = new PlayerModel(2, "Bot");

