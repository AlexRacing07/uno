export class CardModel {
  public isSpecial: boolean;  // Wenn +2 oder farbwechsel, True
  public digit: number;  // 0-9
  public color: string;  // r,g,b,y
  public special: string;  // +2, cs (colorswitch)
  public id: string;     //  Wenn isSpecial False: "[digit].[color]" Example: 9.y
                         // Wenn isSpecial True: "[special].[color]" Example: +2.r, cs

  constructor(isSpecial: boolean, id: string) {
    this.isSpecial = isSpecial;
    this.id = id;
  }
}

export const Cards: CardModel[] = []

