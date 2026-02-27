import {SingleMovieInterface} from "./SingleMovieInterface";

export interface ApiResponseSuccesInterface{
    Response: string;
    Search: SingleMovieInterface[];
    totalResult:string
}