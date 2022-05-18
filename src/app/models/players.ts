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
    while(amount>0) {

    }
  }
}

export const Players: PlayerModel[] = [
  new PlayerModel(1,"Du"),
  new PlayerModel(2,"Bot")
]
