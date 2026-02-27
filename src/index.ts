import {callOMDApi} from "./services/omdbApiService";
import {generateYears} from "./helpers/yearGeneratorHelper";
import {listAll} from "./helpers/movieElementHelper";
import {ApiResponseErrorInterface} from "./interfaces/ApiResponseErrorInterface";
import {ApiResponseSuccesInterface} from "./interfaces/ApiResponseSuccesInterface";
import {SingleMovieInterface} from "./interfaces/SingleMovieInterface";
import {remeberMovieSearch} from "./repository/movieStorage";




const movieList = document.getElementById("movieList");
if (!(movieList instanceof HTMLDivElement)) {
    throw new Error("Nema div#movieList");
}
const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;
const searchMovieElement = document.getElementById("searchMovie");
const currentYear = new Date().getFullYear();


generateYears(1960, currentYear, yearSelect, currentYear);


if (!searchMovieElement) throw new Error("Nema elementa #searchMovie");




searchMovieElement.addEventListener('click', async () => {
     movieList.innerHTML = ""


    const movieNameElement = document.getElementById("movieName") as HTMLInputElement;

    if(movieNameElement.value.trim() === ""){
        alert("You need to enter the movie name");
        return;
    }


    let response = await callOMDApi([

        {key: 'y', value: yearSelect.value},
        {key: 's', value: movieNameElement.value},
    ]);



    if(response.data.Response === 'False'){
        const errorData = response.data as ApiResponseErrorInterface;
        const erroMessage = document.createElement('h2') as HTMLHeadingElement
        erroMessage.innerHTML = `${errorData.Error}<br/>Here are some recommendations:`;

        movieList.append(erroMessage)
        response = await callOMDApi([
            {key: 's', value: movieNameElement.value},

        ])
    } else {
        remeberMovieSearch({name: movieNameElement.value, Year: yearSelect.value});
    }


    const succesData = response.data as ApiResponseSuccesInterface;



    listAll(succesData.Search, movieList)


})




