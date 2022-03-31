import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';

const routes: Routes = [
  {
    path: 'json-to-excel',
    component: JsonToXlsxComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ConversionsRoutingModule { }
