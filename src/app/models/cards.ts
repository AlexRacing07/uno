export class CardModel {
  public isSpecial: boolean;  // Wenn +2 oder farbwechsel, True
  public digit: number;  // 0-9
  public color: string;  // r,g,b,y,null
  public special: string;  // +2, cs.null (cs = colorswitch, null damit color leer ist.)
  public id: string;     //  Wenn isSpecial False: "[digit].[color]" Example: 9.y
                         // Wenn isSpecial True: "[special].[color]" Example: +2.r, cs

  constructor(isSpecial: boolean, id: string) {
    this.digit = 0;
    this.special = "";
    this.isSpecial = isSpecial;
    this.id = id;
    const parts = this.id.split('.');
    this.color = parts[1];
    if(this.isSpecial) {
      this.special = parts[0];
    }
    else {
      this.color = parts[0];
    }

  }
}

export const Cards: CardModel[] = [   // Ein paar Beispiel Karten
  new CardModel(false,"5.r"),
  new CardModel(true,"cs.null"),
  new CardModel(true,"+2.y"),
  new CardModel(false,"3.b"),
  new CardModel(false,"7.g")
]

