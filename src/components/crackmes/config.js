import { statusesOptions, STATUS_SOLVED } from '../generic/statuses';
import { getSortOption } from './filterOpts';


export const ITEMS_PER_PAGE = 40;
export const defaultFilterStatuses = statusesOptions.filter((opt) => opt.value !== STATUS_SOLVED);
export const DEFAULT_SORT_OPTION = getSortOption('date-desc');

