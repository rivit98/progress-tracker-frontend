const optFactory = (kv, text) => {
    return (
        <option value={kv} key={kv}>
            {text}
        </option>
    );
};

const optStart = optFactory('started', 'Start solving');
const optStop = optFactory('aborted', 'Stop solving');
const optSolve = optFactory('solved', 'Mark as solved');
const optIgnore = optFactory('ignored', 'Ignore');
const optUnignore = optFactory('clear', 'Unignore');


export const possibleActionsMap = {
    undefined: [optStart, optSolve, optStop, optIgnore],
    STATUS_CLEAR: [optStart, optSolve, optStop, optIgnore],
    STATUS_STARTED: [optSolve, optStop, optIgnore],
    STATUS_ABORTED: [optStart, optSolve, optIgnore],
    STATUS_SOLVED: [optStart, optStop, optIgnore],
    STATUS_IGNORED: [optUnignore, optStart, optSolve, optStop]
};
