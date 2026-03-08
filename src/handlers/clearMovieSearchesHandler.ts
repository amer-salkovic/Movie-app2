import {clearAllMoviesSearch} from "../repository/movieStorage";

export function clearMovieSearchesHandler(): void {
    const existingMoviesDiv = document.getElementById("existingMoviesSearch");

    if (!(existingMoviesDiv instanceof HTMLDivElement)) {
        throw new Error("Nema div#existingMoviesSearch");
    }
    clearAllMoviesSearch()
    existingMoviesDiv.innerHTML = "";
}