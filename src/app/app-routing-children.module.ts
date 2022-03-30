import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCountComponent } from './character-count/character-count.component';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'json-to-excel',
        component: JsonToXlsxComponent
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
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AppRoutingChildrenModule { }
