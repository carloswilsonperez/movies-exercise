import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {MatDialog} from '@angular/material/dialog';
import { DetailDialog } from './detail-dialog.component';
import { Movie } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  movies: Movie[] = [];
  cachedMovies: Movie[] = [];

  myControl = new FormControl();
  filteredMovies: Observable<Movie[]>;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  openDialog(movie: Movie) {
    let dialogRef = this.dialog.open(DetailDialog, {
      data: {
        movie: movie
      },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(res => {
      // received data from detail-dialog.component
      if (res.data.comments.length > 0 && res.data.formTouched) {
        let movieCached = this.cachedMovies.find(movie => movie.Film === res.data.Film);

        if (movieCached) {
          if (!movieCached.comments) {
            movieCached.comments = [];
          }

          movieCached.comments = res.data.comments;
          this.addComment(movie, res.data.comments);
        }
      }
    });
  }

  ngOnInit() {
    this.getAllMovies();
    this.filteredMovies = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredMovies.subscribe(params => {
      this.movies = params;
   });
  }

  private _filter(value: String): Movie[] {
    if (!value) {
      return this.cachedMovies;
    }

    const filterValue = value.toLowerCase();
    return this.movies.filter(movie => movie.Film?.toLowerCase().includes(filterValue));
  }

  // Update movie with comments
  addComment(movie: Movie, comments: Comment[]) {
    this.http.post(`${this.API}/addComment`, {movie, comments})
      .subscribe(() => {});
  }

  // Get all users from the API
  getAllMovies() {
    this.http.get<Movie[]>(`${this.API}/movies`)
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.cachedMovies = movies;
      })
  }
}
