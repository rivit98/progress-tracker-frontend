import { statusDesc } from './consts';

export const statusesOptions = Object.keys(statusDesc).map((k) => {
    return { value: parseInt(k, 10), label: statusDesc[k].toLowerCase() };
});

export const selectFieldStyles = {
    option: (provided, state) => {
        return {
            ...provided,
            color: 'black'
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black'
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: 'black'
    }),
    singleValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black'
    })
};

const byName = (t1, t2) => {
    return t1.name.localeCompare(t2.name);
};

const byDate = (t1, t2) => {
    return t2.date.getTime() - t1.date.getTime();
};

const reverse = (res) => {
    return -res;
};

export const sortOptions = [
    {
        value: 'name-asc',
        label: 'name ↑',
        sortFn: (t1, t2) => byName(t1, t2) || byDate(t1, t2)
    },
    {
        value: 'name-desc',
        label: 'name ↓',
        sortFn: (t1, t2) => reverse(byName(t1, t2)) || byDate(t1, t2)
    },
    {
        value: 'date-asc',
        label: 'date ↑',
        sortFn: (t1, t2) => reverse(byDate(t1, t2)) || byName(t1, t2)
    },
    {
        value: 'date-desc',
        label: 'date ↓',
        sortFn: (t1, t2) => byDate(t1, t2) || byName(t1, t2)
    },
    {
        value: 'comments-asc',
        label: 'comments num ↑',
        sortFn: (t1, t2) => t1.comments_num - t2.comments_num || byName(t1, t2) || byDate(t1, t2)
    },
    {
        value: 'comments-desc',
        label: 'comments num ↓',
        sortFn: (t1, t2) => t2.comments_num - t1.comments_num || byName(t1, t2) || byDate(t1, t2)
    },
    {
        value: 'writeups-asc',
        label: 'writeups num ↑',
        sortFn: (t1, t2) => t1.writeups_num - t2.writeups_num || byName(t1, t2) || byDate(t1, t2)
    },
    {
        value: 'writeups-desc',
        label: 'writeups num ↓',
        sortFn: (t1, t2) => t2.writeups_num - t1.writeups_num || byName(t1, t2) || byDate(t1, t2)
    }
];

export const DEFAULT_SORT_OPTION = sortOptions[0];
