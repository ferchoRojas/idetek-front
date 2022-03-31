import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCountComponent } from './character-count/character-count.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';

const routes: Routes = [
  {
    path: 'character-counter',
    component: CharacterCountComponent
  },
  {
    path: 'strong-random-password',
    component: PasswordGeneratorComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class StringsRoutingModule { }
