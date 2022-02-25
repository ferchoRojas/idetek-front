import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-character-count',
  templateUrl: './character-count.component.html',
  styleUrls: ['./character-count.component.css']
})
export class CharacterCountComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  textareaData: any
  characters: number = 0
  words: number = 0
  sentences: number = 0
  paragraphs: number = 0
  spaces: number = 0

  ngOnInit(): void {
    this.title.setTitle('Idetek | Character counter');
    this.meta.updateTag({ name: 'description', content: 'Words, spaces, paragraphs, sentences and characters counter' });
  }

  textareaChange(e: any): void {
    if (e.length > 0) {
      this.characters = e.length
      this.wordCount(e)
      this.sentencesCount(e)
      this.spacesCount(e)
      this.paragraphsCount(e)
    } else {
      this.clean()
    }
  }

  wordCount(e: any): void {
    e = e.trim()
    e = e.replace(/\s+/g,' ')
    this.words = e.split(' ').length
  }

  sentencesCount(e: any): void {
    let count = e.match(/[\w|\)][.?!](\s|$)/g)
    this.sentences = count?.length > 0 ? count.length : 0
  }

  spacesCount(e: any): void {
    let count = e.match(/ /g) || []
    this.spaces = count?.length > 0 ? count.length : 0
  }

  paragraphsCount(e: any): void {
    this.paragraphs = e.split('\n').length
  }

  clean(): void {
    this.characters = 0
    this.words = 0
    this.sentences = 0
    this.paragraphs = 0
    this.spaces = 0
  }

}
