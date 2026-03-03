import {SearchMovieInterface} from "../interfaces/SingleMovieInterface";


export function listAll(movies: SearchMovieInterface[], htmlMovieList: HTMLElement) {
    movies.forEach((movie) => {
        const movieTitle = document.createElement("h2") as HTMLHeadingElement;
        movieTitle.textContent = movie.Title;

        const movieYear = document.createElement("p") as HTMLParagraphElement;
        movieYear.textContent = movie.Year;

        const moviePoster = document.createElement("img") as HTMLImageElement;
        moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "";

        const movieHolder = document.createElement("div") as HTMLDivElement;
        movieHolder.append(movieTitle, moviePoster, movieYear);

        htmlMovieList.append(movieHolder);
    });
}