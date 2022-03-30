import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';
import { CharacterCountComponent } from './character-count/character-count.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { AppRoutingChildrenModule } from './app-routing-children.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    JsonToXlsxComponent,
    CharacterCountComponent,
    NotFoundComponent,
    PasswordGeneratorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingChildrenModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class PagesModule { }
