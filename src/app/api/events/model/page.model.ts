export interface PageDto<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
