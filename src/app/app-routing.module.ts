import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { CharacterCountComponent } from './character-count/character-count.component'
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'json-to-excel',
    component: JsonToXlsxComponent,
  },
  {
    path: 'strong-random-password',
    component: PasswordGeneratorComponent
  },
  {
    path: 'character-counter',
    component: CharacterCountComponent
  }, 
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
