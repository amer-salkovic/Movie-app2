import {callOMDApi} from "../services/omdbApiService";
import {ApiResponseErrorInterface} from "../interfaces/ApiResponseErrorInterface";
import {remeberMovieSearch} from "../repository/movieStorage";
import {renderPreviousSearches} from "../ui/renderPreviousSearches";
import {ApiResponseSuccesInterface} from "../interfaces/ApiResponseSuccesInterface";
import {listMovieResults} from "../ui/listMovieResults";

export async function searchMoviesHandler(){
     const movieList = document.getElementById("movieList");
     if (!(movieList instanceof HTMLDivElement)) {
         throw new Error("Nema div#movieList");
     }

     const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;
     if (!(yearSelect instanceof HTMLSelectElement)) {
         throw new Error("Nema div#movieYears");

     }






    movieList.innerHTML = "";

     const movieNameElement = document.getElementById("movieName") as HTMLInputElement;

     if (movieNameElement.value.trim() === "") {
         alert("You need to enter the movie name");
         return;
     }

     let response = await callOMDApi([
         {key: "y", value: yearSelect.value},
         {key: "s", value: movieNameElement.value},
     ]);

     if (response.data.Response === "False") {
         const errorData = response.data as ApiResponseErrorInterface;
         const errorMessage = document.createElement("h2") as HTMLHeadingElement;
         errorMessage.innerHTML = `${errorData.Error}<br/>Here are some recommendations:`;

         movieList.append(errorMessage);
         response = await callOMDApi([{key: "s", value: movieNameElement.value}]);
     } else {
         remeberMovieSearch({name: movieNameElement.value, year: yearSelect.value});
         renderPreviousSearches()

     }

     const succesData = response.data as ApiResponseSuccesInterface;
     listMovieResults(succesData.Search, movieList);
 }