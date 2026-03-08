import {SingleMovieSearch} from "../interfaces/movieStorage/SingleMovieSearch";

export function remeberMovieSearch(movie: SingleMovieSearch): void {
    const existingMovie = getAllMoviesSearch()
    const alreadExists: boolean = existingMovie.some(m =>
        m.name.toLowerCase() === movie.name.toLowerCase() && m.year === movie.year
    )

    if (alreadExists) {
        return;
    }

    existingMovie.push(movie);
    localStorage.setItem("remeberedMovies", JSON.stringify(existingMovie));

}

export function getAllMoviesSearch(): SingleMovieSearch[] {
    const data = localStorage.getItem("remeberedMovies");
    return data ? JSON.parse(data) : []


}

export function clearAllMoviesSearch(): void {
    localStorage.removeItem("remeberedMovies");
}