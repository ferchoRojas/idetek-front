import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'conversions',
    loadChildren: () => import('./conversions/conversions.module').then( m => m.ConversionsModule )
  },
  {
    path: 'strings',
    loadChildren: () => import('./strings/strings.module').then( m => m.StringsModule )
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
