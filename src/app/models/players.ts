import { Cards } from "src/app/models/cards";

export class PlayerModel {
  public ownedCards: number[];
  public score: number;
  public success: boolean;
  public name: string;

  constructor(name: string) {
    this.name = name
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

  // Platziert eine Karte. returned die cardId der gelegten Karte für den nächsten Zug.
  // Testet nicht mehr ob die Karte gelegt werden kann. Muss jetzt in der Gameloop manuell gemacht werden.

  place(id: number, lastCardId: string): string[] {

    // Standard die alte id und auf false
    let newLastCardId: string[] = [lastCardId, "false"];

    // Schauen ob es eine cs karte ist
    if(!Cards[id].isCs) {
      let temp = lastCardId.split(".");
      if(temp[0].includes(Cards[id].digit) || temp[1].includes(Cards[id].color)) {
        // LastCardId updaten
        newLastCardId[0] = Cards[id].cardId;

        // Kartenattribut owned wird auf false gesetzt.
        Cards[id].owned = false;

        // Die Karte wird aus dem SpielerhandArray entfernt. Die kartenID wird im Array mit Stelle 0 ausgetauscht, und dann mit arr.shift() entfernt.
        let temp = this.ownedCards[0];
        let index = this.ownedCards.indexOf(id);
        this.ownedCards[0] = this.ownedCards[index]
        this.ownedCards[index] = temp;
        this.ownedCards.shift();
        newLastCardId[1] = "true";

        // Punkte verteilen
        if(Cards[id].digit.includes("+2")) {
          this.score+=20;
        }
        else {
          this.score+=parseInt(Cards[id].digit);
        }
      }

    }
    else {
      // LastCardId updaten
      newLastCardId[0] = Cards[id].cardId;

      // Kartenattribut owned wird auf false gesetzt.
      Cards[id].owned = false;

      // Die Karte wird aus dem SpielerhandArray entfernt. Die kartenID wird im Array mit Stelle 0 ausgetauscht, und dann mit arr.shift() entfernt.
      let temp = this.ownedCards[0];
      let index = this.ownedCards.indexOf(id);
      this.ownedCards[0] = this.ownedCards[index]
      this.ownedCards[index] = temp;
      this.ownedCards.shift();
      newLastCardId[1] = "true";

      this.score+=50;
    }
    return newLastCardId;
  }
}

export const Player1: PlayerModel = new PlayerModel("player1");
export const Player2: PlayerModel = new PlayerModel("player2");

