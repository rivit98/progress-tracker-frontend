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

export const sortOptions = [
    {
        value: 'name-asc',
        label: 'by name (asc)',
        sortFn: (t1, t2) => t1.name.localeCompare(t2.name) || t2.date.getTime() - t1.date.getTime()
    },
    {
        value: 'name-desc',
        label: 'by name (desc)',
        sortFn: (t1, t2) => -(t1.name.localeCompare(t2.name) || t2.date.getTime() - t1.date.getTime())
    },
    {
        value: 'date-asc',
        label: 'by date (asc)',
        sortFn: (t1, t2) => -(t2.date.getTime() - t1.date.getTime() || t1.name.localeCompare(t2.name))
    },
    {
        value: 'date-desc',
        label: 'by date (desc)',
        sortFn: (t1, t2) => t2.date.getTime() - t1.date.getTime() || t1.name.localeCompare(t2.name)
    },
    {
        value: 'comments-asc',
        label: 'by comments num (asc)',
        sortFn: (t1, t2) =>
            t1.comments_num - t2.comments_num || t1.name.localeCompare(t2.name) || t2.date.getTime() - t1.date.getTime()
    },
    {
        value: 'comments-desc',
        label: 'by comments num (desc)',
        sortFn: (t1, t2) =>
            t2.comments_num - t1.comments_num || t1.name.localeCompare(t2.name) || t2.date.getTime() - t1.date.getTime()
    },
    {
        value: 'writeups-asc',
        label: 'by writeups num (asc)',
        sortFn: (t1, t2) =>
            t1.writeups_num - t2.writeups_num || t1.name.localeCompare(t2.name) || t2.date.getTime() - t1.date.getTime()
    },
    {
        value: 'writeups-desc',
        label: 'by writeups num (desc)',
        sortFn: (t1, t2) =>
            t2.writeups_num - t1.writeups_num || t1.name.localeCompare(t2.name) || t2.date.getTime() - t1.date.getTime()
    }
];

export const DEFAULT_SORT_OPTION = sortOptions[0];
