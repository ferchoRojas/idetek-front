import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonToXlsxComponent } from './json-to-xlsx/json-to-xlsx.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ConversionsRoutingModule } from './conversions-routing.module';



@NgModule({
  declarations: [
    JsonToXlsxComponent
  ],
  imports: [
    ConversionsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ConversionsModule { }
