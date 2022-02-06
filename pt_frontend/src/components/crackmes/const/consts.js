import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaCheckCircle, FaPlay, FaTimesCircle } from 'react-icons/fa';

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

export const statusIcon = {
    [STATUS_CLEAR]: { icon: MdVisibility, color: 'blue.600', size: 'xl' },
    [STATUS_STARTED]: { icon: FaPlay, color: 'yellow.500', size: 'md' },
    [STATUS_ABORTED]: { icon: FaTimesCircle, color: 'red.600', size: 'lg' },
    [STATUS_SOLVED]: { icon: FaCheckCircle, color: 'green.500', size: 'lg' },
    [STATUS_IGNORED]: { icon: MdVisibilityOff, color: 'gray.400', size: 'xl' }
};
