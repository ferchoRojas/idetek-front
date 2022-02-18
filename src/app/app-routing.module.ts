import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'strong-random-password',
    pathMatch: 'full'
  },
  {
    path: 'json-to-excel',
    component: JsonToXlsxComponent, 
  },
  {
    path: 'strong-random-password',
    component: PasswordGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
