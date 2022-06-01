import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { ScoreComponent } from './score/score.component';
import { AboutComponent } from './about/about.component';
import { CopyrightComponent } from './copyright/copyright.component';

const routes: Routes = [
  {path: '',component: GameComponent},
  {path: 'uno',component: GameComponent},
  {path: 'score', component: ScoreComponent},
  {path: 'about', component: AboutComponent},
  {path: 'copyright', component: CopyrightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
