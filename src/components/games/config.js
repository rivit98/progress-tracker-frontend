import { statusesOptions, STATUS_DONE } from '../generic/statuses';

export const ITEMS_PER_PAGE = 30;
export const defaultFilterStatuses = statusesOptions.filter((opt) => opt.value !== STATUS_DONE);
