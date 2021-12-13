import { FaCheckCircle, FaPlay, FaTimesCircle, MdVisibility, MdVisibilityOff } from 'react-icons/all';

export const statusDesc = {
    0: 'Clear',
    1: 'Started',
    2: 'Aborted',
    3: 'Solved',
    4: 'Ignored'
};

export const statusDescToStatusIDMap = Object.fromEntries(
    Object.entries(statusDesc).map(([k, v]) => [v.toLowerCase(), k])
);

export const statusIcon = {
    0: { icon: MdVisibility, color: 'blue.600', size: 'xl' },
    1: { icon: FaPlay, color: 'yellow.500', size: 'md' },
    2: { icon: FaTimesCircle, color: 'red.600', size: 'lg' },
    3: { icon: FaCheckCircle, color: 'green.500', size: 'lg' },
    4: { icon: MdVisibilityOff, color: 'gray.400', size: 'xl' }
};
