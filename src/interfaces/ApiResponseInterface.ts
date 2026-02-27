import {ApiResponseSuccesInterface} from "./ApiResponseSuccesInterface";
import {ApiResponseErrorInterface} from "./ApiResponseErrorInterface";


export interface ApiResponseInterface {
    config:{},
    data:ApiResponseSuccesInterface | ApiResponseErrorInterface,
    headers:{},
    requests:{},
    status:string,
    statusText:string

}
