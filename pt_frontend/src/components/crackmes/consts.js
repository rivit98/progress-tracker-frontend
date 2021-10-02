import { FaCheckCircle, FaPlay, FaTimesCircle, MdVisibilityOff } from 'react-icons/all';

export const statusDesc = {
    0: 'Clear',
    1: 'Started',
    2: 'Aborted',
    3: 'Solved',
    4: 'Ignored'
};

export const statusIcon = {
    0: {},
    1: { icon: FaPlay, color: 'yellow.500' },
    2: { icon: FaTimesCircle, color: 'red.600' },
    3: { icon: FaCheckCircle, color: 'green.500' },
    4: { icon: MdVisibilityOff, color: 'blue.600' }
};
