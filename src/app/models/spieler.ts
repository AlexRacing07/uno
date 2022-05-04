export class SpielerModel {
  public id: number;
  public name: string;

  constructor(id:number, name:string) {
    this.id = id;
    this.name = name;
  }
}

export const Spieler: SpielerModel[] = [
  new SpielerModel(1,"Alex"),
  new SpielerModel(2,"Bot")
]
