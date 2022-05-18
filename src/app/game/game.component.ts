import { Component, OnInit } from '@angular/core';
import { PlayerModel, Players } from "src/app/models/players";
import { CardModel, Cards } from "src/app/models/cards";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  players:PlayerModel[] = []
  cards:CardModel[] = []

  constructor() { }

  ngOnInit(): void {
    this.players = Players;
    this.cards = Cards;
    for(var index in this.cards) {
      this.cards[parseInt(index)].id = parseInt(index);
    }
  }

}



