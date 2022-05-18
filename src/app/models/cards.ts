export class CardModel {
  public isCs: boolean;  // Wenn farbwechsel, True
  public digit: string;  // 0-9, +2, cs
  public color: string;  // r,g,b,y, wenn digit == cs, color = null. null wird dann bei Farbauswahl mit der Wunschfarbe überschrieben.
  public cardId: string; // [cs/digit].[color]  (Beispiel: "2.y", "cs.null"). Beinhaltet die wichtigen attribute einer karte zum erstellen.
  public id: number;     // Einzigartige Id für jede Karte

  constructor(cardId: string) {
    this.id = 0;    // Vorübergehend 0. bei onInit: id = ArrayIndex
    this.isCs = false;
    this.cardId = cardId;
    const parts = cardId.split('.',2);
    this.digit = parts[0];
    this.color = parts[1];
    if(this.digit.includes("cs")) {
      this.isCs = true;
    }
  }
}

export const Cards: CardModel[] = [   // Cards Array: (19 Zahlenkarten pro farbe, 4 cs, 2 +2 pro farbe)
  // Red
  new CardModel("0.r"),
  new CardModel("1.r"),
  new CardModel("1.r"),
  new CardModel("2.r"),
  new CardModel("2.r"),
  new CardModel("3.r"),
  new CardModel("3.r"),
  new CardModel("4.r"),
  new CardModel("4.r"),
  new CardModel("5.r"),
  new CardModel("5.r"),
  new CardModel("6.r"),
  new CardModel("6.r"),
  new CardModel("7.r"),
  new CardModel("7.r"),
  new CardModel("8.r"),
  new CardModel("8.r"),
  new CardModel("9.r"),
  new CardModel("9.r"),
  new CardModel("+2.r"),
  new CardModel("+2.r"),

  // Green
  new CardModel("0.g"),
  new CardModel("1.g"),
  new CardModel("1.g"),
  new CardModel("2.g"),
  new CardModel("2.g"),
  new CardModel("3.g"),
  new CardModel("3.g"),
  new CardModel("4.g"),
  new CardModel("4.g"),
  new CardModel("5.g"),
  new CardModel("5.g"),
  new CardModel("6.g"),
  new CardModel("6.g"),
  new CardModel("7.g"),
  new CardModel("7.g"),
  new CardModel("8.g"),
  new CardModel("8.g"),
  new CardModel("9.g"),
  new CardModel("9.g"),
  new CardModel("+2.g"),
  new CardModel("+2.g"),

  // Blue
  new CardModel("0.b"),
  new CardModel("1.b"),
  new CardModel("1.b"),
  new CardModel("2.b"),
  new CardModel("2.b"),
  new CardModel("3.b"),
  new CardModel("3.b"),
  new CardModel("4.b"),
  new CardModel("4.b"),
  new CardModel("5.b"),
  new CardModel("5.b"),
  new CardModel("6.b"),
  new CardModel("6.b"),
  new CardModel("7.b"),
  new CardModel("7.b"),
  new CardModel("8.b"),
  new CardModel("8.b"),
  new CardModel("9.b"),
  new CardModel("9.b"),
  new CardModel("+2.b"),
  new CardModel("+2.b"),

  // Yellow
  new CardModel("0.y"),
  new CardModel("1.y"),
  new CardModel("1.y"),
  new CardModel("2.y"),
  new CardModel("2.y"),
  new CardModel("3.y"),
  new CardModel("3.y"),
  new CardModel("4.y"),
  new CardModel("4.y"),
  new CardModel("5.y"),
  new CardModel("5.y"),
  new CardModel("6.y"),
  new CardModel("6.y"),
  new CardModel("7.y"),
  new CardModel("7.y"),
  new CardModel("8.y"),
  new CardModel("8.y"),
  new CardModel("9.y"),
  new CardModel("9.y"),
  new CardModel("+2.y"),
  new CardModel("+2.y"),

  // 4x ColorSwitch
  new CardModel("cs.null"),
  new CardModel("cs.null"),
  new CardModel("cs.null"),
  new CardModel("cs.null")
]

