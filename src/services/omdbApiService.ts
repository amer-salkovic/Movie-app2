import {ApiParametetersInterface} from "../interfaces/ApiParametetersInterface";
import {ApiResponseInterface} from "../interfaces/ApiResponseInterface";
import axios from "axios";

const API_KEY="4a770ddd"
const API_URL="https://www.omdbapi.com/"



 function buildUrl(params: ApiParametetersInterface[]): string{
    let searchParams = "";

    params.forEach(param => {
        searchParams += `${param.key}=${param.value}&`;
    });

    return API_URL+"?"+searchParams+"apikey="+API_KEY;



}


export async function callOMDApi(parms: ApiParametetersInterface[]):Promise<ApiResponseInterface> {
    const url = buildUrl(parms);
    return await axios.get(url)
}