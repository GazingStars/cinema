import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-main-page-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './main-page-component.component.html',
  styleUrl: './main-page-component.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [animate('1s ease-in-out')]),
      transition('visible => hidden', [animate('1s ease-in-out')]),
    ]),
  ],
})
export class MainPageComponentComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  randomNumber = 0;
  rPoster: any = '';
  private intervalId: any;
  animationState = 'visible';
  currentPage = 1;
  maxPage = 1;
  isSelectingPage = false;
  selectedPage: number = this.currentPage;
  randomIndex = 0;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getTopMovies();
  }

  getTopMovies(): void {
    this.http
      .get<any>(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${this.currentPage}`,
        {
          headers: {
            'X-API-KEY': 'f04b2633-b93e-4da9-8f90-cc5e5b536571',
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe({
        next: (data) => {
          this.movies = data.items;
          console.log(data);
          if (this.movies.length > 0) {
            this.maxPage = data.totalPages;
            this.updatePoster();
            this.startImageRotation();
          }
        },
      });
  }

  updatePoster(): void {
    this.animationState = 'hidden';
    setTimeout(() => {
      this.rPoster = this.movies[this.randomIndex].coverUrl;
      this.animationState = 'visible';
      this.randomIndex = this.randomIndex === this.movies.length - 1 ? 0 : this.randomIndex + 1;
    }, 1000);
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.updatePoster();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goNextPage(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage += 1;
      clearInterval(this.intervalId);
      this.getTopMovies();
    }
  }

  goPrevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      clearInterval(this.intervalId);
      this.getTopMovies();
    }
  }

  selectPage(page: number): void {
    if (page >= 1 && page <= this.maxPage) {
      this.currentPage = page;
      clearInterval(this.intervalId);
      this.getTopMovies();
    }
  }

  startSelectingPage() {
    this.isSelectingPage = true;
    this.selectedPage = this.currentPage;
  }

  confirmPageSelection() {
    if (
      this.selectedPage !== this.currentPage &&
      this.selectedPage >= 1 &&
      this.selectedPage <= this.maxPage
    ) {
      this.selectPage(this.selectedPage);
      const inputElement = document.querySelector('.page-input');
      if (inputElement) {
        inputElement.classList.add('fade-out');
        setTimeout(() => {
          this.isSelectingPage = false;
        }, 200);
      } else {
        this.isSelectingPage = false;
      }
      return;
    }
    clearInterval(this.intervalId);
    this.selectPage(this.selectedPage);
    this.isSelectingPage = false;
  }
}
