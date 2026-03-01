export type Pagination<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  next: number | null;
  prev: number | null;
};
