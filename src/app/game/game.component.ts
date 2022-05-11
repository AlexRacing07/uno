import { Component, OnInit } from '@angular/core';
import { SpielerModel, Spieler } from "src/app/models/spieler";
import { CardModel, Cards } from "src/app/models/cards";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  spieler:SpielerModel[] = []
  cards:CardModel[] = []

  constructor() { }

  ngOnInit(): void {
    this.spieler = Spieler;
    console.log(this.spieler);
    this.cards = Cards;
    console.log(this.cards);
  }

}



