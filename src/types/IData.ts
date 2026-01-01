import IError from "@/types/IError";

export default interface IData<T> {
    data?: T;
    error?: IError;
}