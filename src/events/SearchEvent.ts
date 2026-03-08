import {searchMoviesHandler} from "../handlers/searchMovieHandler";
import {clearMovieSearchesHandler} from "../handlers/clearMovieSearchesHandler";

export function bindSearchEvent(): void {
    const searchMovieElement = document.getElementById("searchMovie");
    if (!(searchMovieElement instanceof HTMLButtonElement)) {
        throw new Error("Nema div searchMovie");
    }
    const clearedMovies = document.getElementById("clearedMoviesSearch");
    if (!(clearedMovies instanceof HTMLButtonElement)) {
        throw new Error("Nema div#clearedMoviesSearch");
    }

    searchMovieElement.addEventListener("click",searchMoviesHandler)
    clearedMovies.addEventListener("click",clearMovieSearchesHandler)
}