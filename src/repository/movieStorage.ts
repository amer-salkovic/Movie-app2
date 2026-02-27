import {SingleMovieInterface} from "../interfaces/SingleMovieInterface";
import {ApiResponseSuccesInterface} from "../interfaces/ApiResponseSuccesInterface";

export function remeberMovieSearch(movie:SingleMovieSearch):void {
    const existingMovie = getAllMoviesSearch()
    existingMovie.push(movie);
    localStorage.setItem("remeberedMovies", JSON.stringify(existingMovie));

}

export function getAllMoviesSearch(): SingleMovieSearch[] {
     const data  = localStorage.getItem("remeberedMovies");
     return data ? JSON.parse(data): []
}