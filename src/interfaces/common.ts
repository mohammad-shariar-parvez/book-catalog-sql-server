import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IUser = {
  userId: string,
  role: string,
  iat: number,
  exp: number
}