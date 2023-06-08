import { statusesOptions, STATUS_DONE } from '../generic/statuses';
import { getSortOption } from './filterOpts';

export const ITEMS_PER_PAGE = 30;
export const defaultFilterStatuses = statusesOptions.filter((opt) => opt.value !== STATUS_DONE);
export const DEFAULT_SORT_OPTION = getSortOption('date-desc');
