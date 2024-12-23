import { Badge } from '@chakra-ui/react';

const STATUS_CLEAR = 0;
const STATUS_STARTED = 1;
const STATUS_ABORTED = 2;
const STATUS_DONE = 3;
const STATUS_IGNORED = 4;

export { STATUS_CLEAR, STATUS_STARTED, STATUS_ABORTED, STATUS_DONE, STATUS_IGNORED };

export const statusDesc = {
    [STATUS_CLEAR]: 'Clear',
    [STATUS_STARTED]: 'Started',
    [STATUS_ABORTED]: 'Aborted',
    [STATUS_DONE]: 'Done',
    [STATUS_IGNORED]: 'Ignored',
};

export const statusDescToStatusIDMap = Object.fromEntries(
    Object.entries(statusDesc).map(([k, v]) => [v.toLowerCase(), k])
);

const badgeStyles = {
    w: '64px',
    textAlign: 'center',
};

export const statusBadge = {
    [STATUS_CLEAR]: (
        <Badge colorScheme="blue" {...badgeStyles}>
            {statusDesc[STATUS_CLEAR]}
        </Badge>
    ),
    [STATUS_STARTED]: (
        <Badge colorScheme="yellow" {...badgeStyles}>
            {statusDesc[STATUS_STARTED]}
        </Badge>
    ),
    [STATUS_ABORTED]: (
        <Badge colorScheme="red" {...badgeStyles}>
            {statusDesc[STATUS_ABORTED]}
        </Badge>
    ),
    [STATUS_DONE]: (
        <Badge colorScheme="green" {...badgeStyles}>
            {statusDesc[STATUS_DONE]}
        </Badge>
    ),
    [STATUS_IGNORED]: (
        <Badge colorScheme="gray" {...badgeStyles}>
            {statusDesc[STATUS_IGNORED]}
        </Badge>
    ),
};

export const statusesOptions = Object.keys(statusDesc).map((k) => {
    return { value: parseInt(k, 10), label: statusDesc[k].toLowerCase() };
});
