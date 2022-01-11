import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.css']
})
export class DnsComponent implements OnInit {

  constructor(private _title: Title) { }

  public domain = 'idetek'

  ngOnInit(): void {
    this._title.setTitle('Idetek - DNS lookup')
  }

  search() {
    console.log(this.domain)
  }

}
