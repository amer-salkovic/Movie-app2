import { ApiResponseErrorInterface } from "./ApiResponseErrorInterface";

export interface ApiResponseInterface<T> {
    config: {};
    data: T | ApiResponseErrorInterface;
    headers: {};
    requests: {};
    status: string;
    statusText: string;
}