import { STATUS_CLEAR, STATUS_ABORTED, STATUS_IGNORED, STATUS_SOLVED, STATUS_STARTED } from './statuses';

const optFactory = (kv, text) => {
    return (
        <option value={kv} key={kv} style={{ backgroundColor: 'var(--chakra-colors-gray-700)' }}>
            {text}
        </option>
    );
};

const optStart = optFactory('started', 'Start');
const optStop = optFactory('aborted', 'Stop');
const optSolve = optFactory('solved', 'Done');
const optIgnore = optFactory('ignored', 'Ignore');
const optUnignore = optFactory('clear', 'Unignore');

export const possibleActionsMap = {
    undefined: [optStart, optSolve, optStop, optIgnore],
    [STATUS_CLEAR]: [optStart, optSolve, optIgnore],
    [STATUS_STARTED]: [optSolve, optStop, optIgnore],
    [STATUS_ABORTED]: [optStart, optSolve, optIgnore],
    [STATUS_SOLVED]: [optStart],
    [STATUS_IGNORED]: [optUnignore, optStart, optSolve, optStop],
};
