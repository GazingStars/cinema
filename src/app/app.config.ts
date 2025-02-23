import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MainPageComponentComponent } from './main-page-component/main-page-component.component';
import { DetailFilmComponent } from './detail-film/detail-film.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: MainPageComponentComponent },
  { path: 'film/:id', component: DetailFilmComponent },
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
  ],
};
