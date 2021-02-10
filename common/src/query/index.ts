import { BadRequestError } from '../errors';

export type SortDirection = 'asc' | 'desc';

export interface ListQueryParams<SortType = any> {
  limit: number;
  skip: number;
  search: string;
  sort: SortType;
  direction: SortDirection;
}

export interface ListOptions<SortType = any> {
  page?: number;
  per_page?: number;
  search?: string;
  sort?: SortType;
  direction?: SortDirection;
}

export const maxPerPage = 1000;

////////////////////////// LIST PARSING FUNCTIONS //////////////////////////

export const getListQueryParams = <SortType = any>(
  listOptions: ListOptions<SortType>,
  defaultSort: SortType,
  defaultDirection: SortDirection
): ListQueryParams => {
  if (!defaultSort || !defaultDirection) {
    throw new Error('A default sort and direction must be provided.');
  }

  if (!listOptions) {
    return {
      limit: maxPerPage,
      skip: 0,
      search: '',
      sort: defaultSort,
      direction: defaultDirection
    };
  }

  if (listOptions.direction && listOptions.direction !== 'asc' && listOptions.direction !== 'desc') {
    throw new BadRequestError('The sort direction must be either asc or desc.');
  }

  const limit = !listOptions.per_page || listOptions.per_page > maxPerPage || listOptions.per_page <= 0 ? maxPerPage : +listOptions.per_page;
  const skip = listOptions.page && listOptions.page > 0 ? (listOptions.page - 1) * limit : 0;

  return {
    limit,
    skip,
    search: listOptions.search || '',
    sort: listOptions.sort || defaultSort,
    direction: listOptions.direction ? listOptions.direction : listOptions.sort ? 'asc' : defaultDirection
  };
};
