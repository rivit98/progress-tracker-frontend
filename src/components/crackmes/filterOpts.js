import { byDate, byName, byNumber, reverse } from '../generic/filters';

export const sortOptions = [
    {
        value: 'name-asc',
        label: 'name ↑',
        sortFn: (t1, t2) => byName(t1, t2) || byDate(t1, t2),
    },
    {
        value: 'name-desc',
        label: 'name ↓',
        sortFn: (t1, t2) => reverse(byName(t1, t2)) || byDate(t1, t2),
    },
    {
        value: 'date-asc',
        label: 'date ↑',
        sortFn: (t1, t2) => reverse(byDate(t1, t2)) || byName(t1, t2),
    },
    {
        value: 'date-desc',
        label: 'date ↓',
        sortFn: (t1, t2) => byDate(t1, t2) || byName(t1, t2),
    },
    {
        value: 'comments-asc',
        label: 'comments num ↑',
        sortFn: (t1, t2) => byNumber(t1.comments_num, t2.comments_num) || byName(t1, t2) || byDate(t1, t2),
    },
    {
        value: 'comments-desc',
        label: 'comments num ↓',
        sortFn: (t1, t2) => reverse(byNumber(t1.comments_num, t2.comments_num)) || byName(t1, t2) || byDate(t1, t2),
    },
    {
        value: 'writeups-asc',
        label: 'writeups num ↑',
        sortFn: (t1, t2) => byNumber(t1.writeups_num, t2.writeups_num) || byName(t1, t2) || byDate(t1, t2),
    },
    {
        value: 'writeups-desc',
        label: 'writeups num ↓',
        sortFn: (t1, t2) => reverse(byNumber(t1.writeups_num, t2.writeups_num)) || byName(t1, t2) || byDate(t1, t2),
    },
];

export const getSortOption = (sortOpt) => {
    return sortOptions.find((opt) => opt.value === sortOpt);
};
