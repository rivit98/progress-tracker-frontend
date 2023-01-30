export const selectFieldStyles = {
    option: (provided, state) => {
        return {
            ...provided,
            color: 'black',
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black',
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: 'black',
    }),
    singleValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black',
    }),
};

export const byName = (t1, t2) => {
    return t1.name.localeCompare(t2.name);
};

export const byDate = (t1, t2) => {
    return t2.date.getTime() - t1.date.getTime();
};

export const byNumber = (t1, t2) => {
    return t1 - t2;
};

export const reverse = (res) => {
    return -res;
};
