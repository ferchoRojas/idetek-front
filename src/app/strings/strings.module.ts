import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { CharacterCountComponent } from './character-count/character-count.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringsRoutingModule } from './strings-routing.module';



@NgModule({
  declarations: [
    PasswordGeneratorComponent,
    CharacterCountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StringsRoutingModule
  ]
})
export class StringsModule { }
