import dateformat from 'dateformat';

const formatDate = (date) => {
    return dateformat(date, 'dd.mm.yyyy');
};

const shortDateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
const isoDateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

const isIsoDateString = (value) => {
    return value && typeof value === 'string' && (shortDateFormat.test(value) || isoDateFormat.test(value));
};

export const handleDates = (body) => {
    if (body === null || body === undefined || typeof body !== 'object') return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) body[key] = new Date(value);
        else if (typeof value === 'object') handleDates(value);
    }
};

export default formatDate;
