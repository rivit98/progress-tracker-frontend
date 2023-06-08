import { statusesOptions, STATUS_SOLVED } from '../generic/statuses';

export const ITEMS_PER_PAGE = 30;
export const defaultFilterStatuses = statusesOptions.filter((opt) => opt.value !== STATUS_SOLVED);
