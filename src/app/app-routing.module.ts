import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path: '',component: StartComponent},
  {path: 'uno',component: GameComponent},
  {path: 'about', component: AboutComponent},
  {path: 'copyright', component: CopyrightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
