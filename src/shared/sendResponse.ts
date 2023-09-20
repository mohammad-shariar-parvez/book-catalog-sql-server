import { Response } from 'express';

type IApiReponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  meta?: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data?: T | null;
};
type ILoginApiReponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  meta?: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  token?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};
export const sendloginResponse = <T>(res: Response, data: ILoginApiReponse<T>): void => {
  const responseData: ILoginApiReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    token: data.token || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
