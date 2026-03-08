import {SingleMovieInterface} from "../interfaces/SingleMovieInterface";
import {showMovieDetalis} from "./showMovieDetalis";

export function listMovieResults(movies: SingleMovieInterface[], htmlMovieList: HTMLElement) {
    movies.forEach((movie) => {
        const movieTitle = document.createElement("h2") as HTMLHeadingElement;
        movieTitle.textContent = movie.Title;

        const movieYear = document.createElement("p") as HTMLParagraphElement;
        movieYear.textContent = movie.Year;

        const moviePoster = document.createElement("img") as HTMLImageElement;
        moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "";

        const movieHolder = document.createElement("div") as HTMLDivElement;
        movieHolder.append(movieTitle, moviePoster, movieYear);

        const handleView = document.createElement("button") as HTMLButtonElement;
        handleView.textContent = 'Detalis'
        handleView.setAttribute("data-imdb-id", <string> movie.imdbID);

        movieHolder.append(handleView);

        handleView.addEventListener('click', async () => {
            showMovieDetalis(movie.imdbID);
        })

        htmlMovieList.append(movieHolder);
    });
}