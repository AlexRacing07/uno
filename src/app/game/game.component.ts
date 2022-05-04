import { Component, OnInit } from '@angular/core';
import { SpielerModel, Spieler } from "src/app/models/spieler";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  spieler:SpielerModel[] = []

  constructor() { }

  ngOnInit(): void {
    this.spieler = Spieler;
    console.log(this.spieler);
  }

}



