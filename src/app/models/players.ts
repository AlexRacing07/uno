import { CardModel, Cards } from "src/app/models/cards";

export class PlayerModel {
  public id: number;
  public name: string;
  public ownedCards: number[];

  constructor(id:number, name:string) {
    this.id = id;
    this.name = name;
    this.ownedCards = [];
  }
  draw(amount: number): void {
    var retry = true;
    var x;
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
  place(id: number, lastCardId: string): string {
    // Standard leer damit falls nichts gelegt werden kann, nicht null
    var newLastCardId = "";

    // Überprüfen ob der Spieler die Karte hat
    if(this.ownedCards.includes(id)) {
      var lastCardVal = lastCardId.split(".");

      // Überprüfen ob karte cs ist, da wenn die Karte ein cs ist, sie immer gelegt werden kann.
      if (!Cards[id].isCs) {
        // Ob die Karte wegen Farb- oder Zahlübereinstimmung gelegt werden kann

        if (Cards[id].digit.includes(lastCardVal[0]) || Cards[id].color.includes(lastCardVal[1])) {

          // cardId der gelegten Karte wird gespeichert und returned für den nächsten place() (Oberste Karte am Stapel)
          newLastCardId = Cards[id].cardId;

          // Kartenattribut owned wird auf false gesetzt.
          Cards[id].owned = false;

          // Die Karte wird aus dem SpielerhandArray entfernt. Die kartenID wird im Array mit Stelle 0 ausgetauscht, und dann mit arr.shift() entfernt.
          var temp = this.ownedCards[0];
          var index = this.ownedCards.indexOf(id);
          this.ownedCards[0] = this.ownedCards[index]
          this.ownedCards[index] = temp;
          this.ownedCards.shift();
        }
      }
      else {
        // Selbiges wie ab Zeile 40, nur das Kontrollen übersprungen werden da die Karte sowieso gelegt werden kann.
        newLastCardId = Cards[id].cardId;
        Cards[id].owned = false;
        var temp = this.ownedCards[0];
        var index = this.ownedCards.indexOf(id);
        this.ownedCards[0] = this.ownedCards[index]
        this.ownedCards[index] = temp;
        this.ownedCards.shift();
      }
    }
    return newLastCardId;
  }
}

export const Player1: PlayerModel = new PlayerModel(1,"User");
export const Player2: PlayerModel = new PlayerModel(2, "Bot");

