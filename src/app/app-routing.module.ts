import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'json-to-excel',
    pathMatch: 'full'
  },
  {
    path: 'json-to-excel',
    component: JsonToXlsxComponent, 
    data: {
      title: 'json to excel',
      description:'Convert json data to excel and csv file'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
