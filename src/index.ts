import {callOMDApi} from "./services/omdbApiService";
import {generateYears} from "./helpers/yearGeneratorHelper";




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
    ]);



    if(response.data.Response === 'False'){
        const erroMessage = document.createElement('h2') as HTMLHeadingElement
        erroMessage.textContent = response.data.Error+ '<br/> Here are some recommendations:'

        movieList.append(erroMessage)
        response = await callOMDApi([
            {key: 's', value: movieNameElement.value},

        ])
    }



listAll(response.data.Search,movieList)


})


function listAll(movies: [], htmlMovieList: HTMLElement) {
    movies.forEach((movie => {
        const movieTitle = document.createElement("h2") as HTMLHeadingElement;
        movieTitle.textContent = movie.Title;


        const moviePoster = document.createElement("img") as HTMLImageElement;
        moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "";

        const movieHolder = document.createElement("div") as HTMLDivElement;
        movieHolder.append(movieTitle, moviePoster);
        htmlMovieList.append(movieHolder);
    })


}




