import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DnsComponent } from './dns/dns.component';

const routes: Routes = [
  {
    path: '',
    component: DnsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
