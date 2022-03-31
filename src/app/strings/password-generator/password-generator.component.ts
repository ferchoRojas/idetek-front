import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private clipboard: Clipboard) { }

  defaultLength = localStorage.getItem('length')
  defaultRounds = localStorage.getItem('rounds')
  roundsEnabled = true
  showPasswordMessage = false
  showHashMessage = false
  strongPassword = ''
  hashPassword = ''

  reactiveForm = new FormGroup({
    length: new FormControl(''),
    uppercase: new FormControl(''),
    lowercase: new FormControl(''),
    symbols: new FormControl(''),
    hash: new FormControl(''),
    rounds: new FormControl({value: '', disabled: true}, [])
  })

  ngOnInit(): void {
    console.log('password generator')
    this.title.setTitle('Idetek | Strong password');
    this.meta.updateTag({ name: 'description', content: 'Generate strong password' });
    
    // Set default values 
    this.reactiveForm.setValue({
      length: this.defaultLength ? parseInt(this.defaultLength) : 12,
      uppercase: true,
      lowercase: true,
      symbols: true,
      hash: '0',
      rounds: this.defaultRounds ? parseInt(this.defaultRounds) : 10
    })
    // Generate password
    this.generatePassword()
    // Every change generates a new password
    this.reactiveForm.get('length')?.valueChanges.subscribe((x) => {
      if (!(/[0-9]/g).test(x) || x > 60) {
        this.reactiveForm.get('length')?.setValue(60)
      }
      if (x == 0) {
        this.reactiveForm.get('length')?.setValue(1)
      }
      if (x > 0 && x <= 60) {
        localStorage.setItem('length', String(x))
        this.generatePassword()
      }
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
    this.reactiveForm.get('hash')?.valueChanges.subscribe((value) => {
      if (value == 2) {
        this.reactiveForm.get('rounds')?.enable()
        this.hashPassword = this.bcryptHash(this.strongPassword, 10)
      } else {
        this.reactiveForm.get('rounds')?.disable()
        this.hashPassword = this.md5Hash(this.strongPassword)
      }
    })
    this.reactiveForm.get('rounds')?.valueChanges.subscribe((x) => {
      if (!(/[0-9]/g).test(x) || x > 12) {
        this.reactiveForm.get('rounds')?.setValue(12)
      }
      if (x < 6) {
        this.reactiveForm.get('rounds')?.setValue(6)
      }
      if (x > 5 && x <= 12) {
        localStorage.setItem('rounds', String(x))
        this.hashPassword = this.bcryptHash(this.strongPassword, x)
      }
    })
  }

  md5Hash(password: string): string {
    return Md5.hashStr(password)
  }

  bcryptHash(password: string, salt: number): string {
    const rounds = bcrypt.genSaltSync(salt);
    return bcrypt.hashSync(password, rounds);
  }

  copy(value: string): void {
    if (value === 'hash') {
      this.clipboard.copy(this.hashPassword)
      this.showHashMessage = true
    } else if (value === 'pass') {
      this.clipboard.copy(this.strongPassword)
      this.showPasswordMessage = true
    }
    setTimeout(() => {
      if (value === 'hash') {
        this.showHashMessage = false
      } else if (value === 'pass') {
        this.showPasswordMessage = false
      }
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
