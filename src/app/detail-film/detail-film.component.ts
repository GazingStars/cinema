import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-film',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-film.component.html',
  styleUrl: './detail-film.component.scss',
})
export class DetailFilmComponent implements OnInit {
  filmData: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getMovie(id);
    }
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getMovie(id: string): void {
    this.http
      .get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        headers: {
          'X-API-KEY': 'f04b2633-b93e-4da9-8f90-cc5e5b536571',
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (data) => {
          console.log('AAAAAA');
          console.log(data);
          
          this.filmData = data;
        },
      });
  }
}
