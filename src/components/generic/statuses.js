import { Badge } from '@chakra-ui/react';

const STATUS_CLEAR = 0;
const STATUS_STARTED = 1;
const STATUS_ABORTED = 2;
const STATUS_SOLVED = 3;
const STATUS_IGNORED = 4;

export { STATUS_CLEAR, STATUS_STARTED, STATUS_ABORTED, STATUS_SOLVED, STATUS_IGNORED };

export const statusDesc = {
    [STATUS_CLEAR]: 'Clear',
    [STATUS_STARTED]: 'Started',
    [STATUS_ABORTED]: 'Aborted',
    [STATUS_SOLVED]: 'Solved',
    [STATUS_IGNORED]: 'Ignored'
};

export const statusDescToStatusIDMap = Object.fromEntries(
    Object.entries(statusDesc).map(([k, v]) => [v.toLowerCase(), k])
);

export const statusBadge = {
    [STATUS_CLEAR]: <Badge colorScheme='blue'>{statusDesc[STATUS_CLEAR]}</Badge>,
    [STATUS_STARTED]: <Badge colorScheme='yellow'>{statusDesc[STATUS_STARTED]}</Badge>,
    [STATUS_ABORTED]: <Badge colorScheme='red'>{statusDesc[STATUS_ABORTED]}</Badge>,
    [STATUS_SOLVED]: <Badge colorScheme='green'>{statusDesc[STATUS_SOLVED]}</Badge>,
    [STATUS_IGNORED]: <Badge colorScheme='gray'>{statusDesc[STATUS_IGNORED]}</Badge>
};

export const statusesOptions = Object.keys(statusDesc).map((k) => {
    return { value: parseInt(k, 10), label: statusDesc[k].toLowerCase() };
});
