import http from "../http-common";

const getAll = <T>(api: string) => {
  return http.get<T[]>(`/${api}`);
};

const get = <T>(api: string, id: string) => {
  return http.get<T>(`/${api}/${id}`);
};

const create = <T>(api: string, data: T) => {
  return http.post<T>(`/${api}`, data);
};

const update = <T>(api: string, id: string, data: Partial<T>) => {
  return http.patch<T>(`/${api}/${id}`, data);
};

const remove = <T>(api: string, id: string) => {
  return http.delete<T>(`/${api}/${id}`);
};

const HttpService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default HttpService;