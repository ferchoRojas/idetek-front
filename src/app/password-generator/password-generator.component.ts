import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private clipboard: Clipboard) { }

  reactiveForm = new FormGroup({
    length: new FormControl(''),
    uppercase: new FormControl(''),
    lowercase: new FormControl(''),
    symbols: new FormControl('')
  })

  ngOnInit(): void {
    this.title.setTitle('Idetek | Strong password');
    this.meta.updateTag({ name: 'description', content: 'Generate strong password' });
    // Set default values 
    this.reactiveForm.setValue({
      length: 12,
      uppercase: true,
      lowercase: true,
      symbols: true
    })
    // Generate password
    this.generatePassword()
    // Every change generates a new password
    this.reactiveForm.get('length')?.valueChanges.subscribe((x) => {
      if (!x) {
        this.reactiveForm.get('length')?.setValue(12)
      }
      if (x > 60) {
        this.reactiveForm.get('length')?.setValue(10)
      }
      this.generatePassword()
    })
    this.reactiveForm.get('uppercase')?.valueChanges.subscribe(() => {
      this.generatePassword()
    })
    this.reactiveForm.get('lowercase')?.valueChanges.subscribe(() => {
      this.generatePassword()
    })
    this.reactiveForm.get('symbols')?.valueChanges.subscribe(() => {
      this.generatePassword()
    })
  }
  showMessage = false
  strongPassword = ''


  copy(): void {
    this.showMessage = true
    this.clipboard.copy(this.strongPassword)
    setTimeout(() => {
      this.showMessage = false
    }, 1000)
  }

  generatePassword(): void {
    let chars = "0123456789"
    if (this.reactiveForm.get('uppercase')?.value) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (this.reactiveForm.get('lowercase')?.value) {
      chars += 'abcdefghijklmnopqrstuvwxyz'
    }
    if (this.reactiveForm.get('symbols')?.value) {
      chars += '!@#$%^&*()'
    }
    let password = ""
    for (var i = 0; i < this.reactiveForm.get('length')?.value; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length)
      password += chars.substring(randomNumber, randomNumber +1)
    }

    this.strongPassword = password
  }

  passwordOptions(e: any): void {
    console.log('text')
  }

}
