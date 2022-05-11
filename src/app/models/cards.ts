export class CardModel {
  public isCs: boolean;  // Wenn +2 oder farbwechsel, True
  public digit: string;  // 0-9, +2, cs
  public color: string;  // r,g,b,y,null
  public id: string;     //  Wenn isSpecial False: "[digit].[color]" Example: 9.y
                         // Wenn isSpecial True: "[special].[color]" Example: +2.r, cs

  constructor(id: string) {
    this.isCs = false;
    this.id = id;
    const parts = id.split('.',2);
    this.digit = parts[0];
    this.color = parts[1];
    if(this.digit.includes("cs")) {
      this.isCs = true;
    }
  }
}

export const Cards: CardModel[] = [   // Ein paar Beispiel Karten
  new CardModel("5.r"),
  new CardModel("cs.null"),
  new CardModel("+2.y"),
  new CardModel("3.b"),
  new CardModel("7.g")
]

