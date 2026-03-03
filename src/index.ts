import { callOMDApi } from "./services/omdbApiService";
import { generateYears } from "./helpers/yearGeneratorHelper";
import { listAll } from "./helpers/movieElementHelper";
import { ApiResponseErrorInterface } from "./interfaces/ApiResponseErrorInterface";
import { ApiResponseSuccesInterface } from "./interfaces/ApiResponseSuccesInterface";
import { getAllMoviesSearch, remeberMovieSearch } from "./repository/movieStorage";
import { SingleMovieSearch } from "./interfaces/movieStorage/SingleMovieSearch";

const movieList = document.getElementById("movieList");
if (!(movieList instanceof HTMLDivElement)) {
    throw new Error("Nema div#movieList");
}

const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;
const searchMovieElement= document.getElementById("searchMovie");

const existingMoviesDiv = document.getElementById("existingMoviesSearch");
if (!(existingMoviesDiv instanceof HTMLDivElement)) {
    throw new Error("Nema div#existingMoviesSearch");
}

const currentYear = new Date().getFullYear();

generateYears(1960, currentYear, yearSelect, currentYear);

const existingMovies: SingleMovieSearch[] = getAllMoviesSearch();

existingMovies.forEach((movie: SingleMovieSearch) => {
    const movieLabelTitle = document.createElement("p") as HTMLParagraphElement;
    movieLabelTitle.textContent = `${movie.name}, ${movie.year}`;
    existingMoviesDiv.append(movieLabelTitle);
});

if (!searchMovieElement) throw new Error("Nema elementa #searchMovie");

searchMovieElement.addEventListener("click", async () => {
    movieList.innerHTML = "";

    const movieNameElement = document.getElementById("movieName") as HTMLInputElement;

    if (movieNameElement.value.trim() === "") {
        alert("You need to enter the movie name");
        return;
    }

    let response = await callOMDApi([
        { key: "y", value: yearSelect.value },
        { key: "s", value: movieNameElement.value },
    ]);

    if (response.data.Response === "False") {
        const errorData = response.data as ApiResponseErrorInterface;
        const errorMessage = document.createElement("h2") as HTMLHeadingElement;
        errorMessage.innerHTML = `${errorData.Error}<br/>Here are some recommendations:`;

        movieList.append(errorMessage);
        response = await callOMDApi([{ key: "s", value: movieNameElement.value }]);
    } else {
        remeberMovieSearch({ name: movieNameElement.value, year: yearSelect.value });
    }

    const succesData = response.data as ApiResponseSuccesInterface;
    listAll(succesData.Search, movieList);
});