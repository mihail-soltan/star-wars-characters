import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Character } from 'src/app/interfaces/character';
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css'],
})
export class CharactersListComponent implements OnInit {
  constructor(private data: DataService) {}

  characters: Character[] = [];
  currentPage: string = '1';
  searchText: string = '';
  showDetails: any;

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: string) {
    this.characters = [];
    this.data.getCharacters(page).subscribe((data) => {
      this.characters = data.results;
    });
  }

  prevPage() {
    this.currentPage = (parseInt(this.currentPage) - 1).toString();
    this.getCharacters(this.currentPage);
    this.goToTop();
  }

  nextPage() {
    this.currentPage = (parseInt(this.currentPage) + 1).toString();
    this.getCharacters(this.currentPage);
    this.goToTop();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  search() {
    this.currentPage = '';
    this.characters = [];
    // this.data.getCharacters(this.currentPage).subscribe((data) => {
    //   data.results.forEach((character: Character) => {
    //     if (character.name.toLowerCase().includes(this.searchText.toLowerCase())) {
    //       this.characters.push(character);
    //     }
    //   });
    // });
    this.data.searchCharacter(this.searchText).subscribe((data) => {
      this.characters = data.results;
      this.searchText = '';
    }
    );
  }

  clearSearch() {
    this.currentPage = '1';
    this.searchText = '';
    this.getCharacters(this.currentPage);
  }
  setActive(character: Character) {
    this.showDetails = (this.showDetails === character) ? null : character;
  }
}
