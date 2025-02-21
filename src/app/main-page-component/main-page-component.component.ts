import { Component, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-main-page-component',
  imports: [CommonModule],
  templateUrl: './main-page-component.component.html',
  styleUrl: './main-page-component.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [
        animate('1s ease-in-out')
      ]),
      transition('visible => hidden', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})

export class MainPageComponentComponent implements OnInit, OnDestroy {
  movies: any[] = []; 
  randomNumber = 0;
  rPoster: any = '';
  private intervalId: any; 
  animationState = 'visible';
  
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getTopMovies();
  }

  getTopMovies(): void {
    this.http
      .get<any>(
        'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1',
        {
          headers: {
            'X-API-KEY': '63d28fb1-f0f3-490e-ad75-8cfe6a51aabc',
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe({
        next: (data) => {
          this.movies = data.items;
          console.log(this.movies);
          if (this.movies.length > 0) {
            this.updatePoster(); 
            this.startImageRotation(); 
          }
        },
      });
  }

  updatePoster(): void {
    this.animationState = 'hidden';
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.movies.length);
      this.rPoster = this.movies[randomIndex].coverUrl;
      this.animationState = 'visible'; 
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

}
