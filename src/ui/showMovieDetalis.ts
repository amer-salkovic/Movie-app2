import { callOMDApi } from "../services/omdbApiService";
import { ApiResponseErrorInterface } from "../interfaces/ApiResponseErrorInterface";
import { SingleMovieDetailsInterface } from "../interfaces/SingleMovieDetailsInterface";

export async function showMovieDetalis(imdbId: string): Promise<void> {
    const response = await callOMDApi([
        { key: "i", value: imdbId },
    ]);

    const singleMoviePopup = document.getElementById("movieModal");
    const popupContent = document.getElementById("modalBody");

    if (!(singleMoviePopup instanceof HTMLDivElement)) {
        throw new Error("Nema div#movieModal");
    }

    if (!(popupContent instanceof HTMLDivElement)) {
        throw new Error("Nema div#modalBody");
    }

    if (response.data.Response === "False") {
        const errorData = response.data as ApiResponseErrorInterface;
        popupContent.innerHTML = `<p>${errorData.Error}</p>`;
        singleMoviePopup.classList.remove("hidden");
        return;
    }

    const movieData = response.data as SingleMovieDetailsInterface;

    popupContent.innerHTML = "";

    const moviePoster = document.createElement("img");
    moviePoster.src = movieData.Poster !== "N/A" ? movieData.Poster : "";
    moviePoster.alt = movieData.Title;

    const movieInfo = document.createElement("div");
    movieInfo.className = "modalInfo";

    const movieTitle = document.createElement("h1");
    movieTitle.textContent = movieData.Title;

    const movieMeta = document.createElement("div");
    movieMeta.className = "modalMeta";

    const year = document.createElement("span");
    year.textContent = movieData.Year;

    const rated = document.createElement("span");
    rated.textContent = movieData.Rated;

    const runtime = document.createElement("span");
    runtime.textContent = movieData.Runtime;

    const genre = document.createElement("span");
    genre.textContent = movieData.Genre;

    const imdbRating = document.createElement("span");
    imdbRating.textContent = `IMDb: ${movieData.imdbRating}`;

    const metascore = document.createElement("span");
    metascore.textContent = `Metascore: ${movieData.Metascore}`;

    movieMeta.append(year, rated, runtime, genre, imdbRating, metascore);

    const plot = document.createElement("p");
    plot.className = "modalPlot";
    plot.textContent = movieData.Plot;

    const director = document.createElement("p");
    director.textContent = `Director: ${movieData.Director}`;

    const writer = document.createElement("p");
    writer.textContent = `Writer: ${movieData.Writer}`;

    const actors = document.createElement("p");
    actors.textContent = `Actors: ${movieData.Actors}`;

    const language = document.createElement("p");
    language.textContent = `Language: ${movieData.Language}`;

    const country = document.createElement("p");
    country.textContent = `Country: ${movieData.Country}`;

    const awards = document.createElement("p");
    awards.textContent = `Awards: ${movieData.Awards}`;

    const boxOffice = document.createElement("p");
    boxOffice.textContent = `Box Office: ${movieData.BoxOffice}`;

    movieInfo.append(
        movieTitle,
        movieMeta,
        plot,
        director,
        writer,
        actors,
        language,
        country,
        awards,
        boxOffice
    );

    popupContent.append(moviePoster, movieInfo);
    singleMoviePopup.classList.remove("hidden");
}