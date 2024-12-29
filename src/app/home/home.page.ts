import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  selectedMovie: { name: string; iframe_url: SafeResourceUrl } | null = null;
  showModal: boolean = false;

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.movies;
      console.log(this.movies);
    });
  }

  openModal(movie: any) {
    this.selectedMovie = {
      name: movie.name,
      iframe_url: this.sanitizeUrl(movie.iframe_url),
    };
    this.showModal = true;
  }

  closeModal() {
    this.selectedMovie = null;
    this.showModal = false;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
