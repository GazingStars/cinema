import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponentComponent } from './main-page-component/main-page-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPageComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cinema';
}
