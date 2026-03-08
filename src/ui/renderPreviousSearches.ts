import {SingleMovieSearch} from "../interfaces/movieStorage/SingleMovieSearch";
import {getAllMoviesSearch} from "../repository/movieStorage";
import {callOMDApi} from "../services/omdbApiService";
import {ApiResponseSuccesInterface} from "../interfaces/ApiResponseSuccesInterface";

import {listMovieResults} from "./listMovieResults";

export function renderPreviousSearches(): void {
    const existingMoviesDiv = document.getElementById("existingMoviesSearch");
    if (!(existingMoviesDiv instanceof HTMLDivElement)) {
        throw new Error("Nema div#existingMoviesSearch");
    }
    const movieList = document.getElementById("movieList");
    if (!(movieList instanceof HTMLDivElement)) {
        throw new Error("Nema div#movieList");
    }


    existingMoviesDiv.innerHTML = ''
    const existingMovies: SingleMovieSearch[] = getAllMoviesSearch();
    existingMovies.forEach((movie: SingleMovieSearch) => {


        const movieLabelTitle = document.createElement("p") as HTMLParagraphElement;
        movieLabelTitle.textContent = `${movie.name}, ${movie.year}`;
        movieLabelTitle.setAttribute("data-movie-name", movie.name);
        movieLabelTitle.setAttribute("data-movie-year", movie.year);
        existingMoviesDiv.append(movieLabelTitle);

        movieLabelTitle.addEventListener('click', async () => {
            movieList.innerHTML = "";
            let response = await callOMDApi([
                {key: "y", value: movie.year},
                {key: "s", value: movie.name},
            ]);

            const succesData = response.data as ApiResponseSuccesInterface;
            listMovieResults(succesData.Search, movieList);


        })
    });
}