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
    var success = false;
    var x;
    while(amount>0) {
      do {
        x = Math.floor(Math.random() * 88);
        if(this.ownedCards.includes(x) && Cards[x].owned == false) {
          Cards[x].owned = true;
          this.ownedCards.push(x);
          success = true;
        }
      } while(success == false);
      success = false;
      amount--;
    }
  }
}

export const Players: PlayerModel[] = [
  new PlayerModel(1,"Du"),
  new PlayerModel(2,"Bot")
]
