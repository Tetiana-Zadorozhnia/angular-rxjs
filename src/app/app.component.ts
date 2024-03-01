import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CatsService, Cat } from './cats.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
	
export class AppComponent implements OnInit {
  title = 'angular-rxjs';
  cats: Cat[] = [];

  constructor(private catsService: CatsService) {}

  ngOnInit() {
    this.catsService.getCatsDetails().subscribe((data: Cat[]) => {
      this.cats = data;
    });
  }
}
