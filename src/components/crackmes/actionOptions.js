const optStart = (
    <option value={'started'} key={'started'}>
        Start solving
    </option>
);
const optStop = (
    <option value={'aborted'} key={'aborted'}>
        Stop solving
    </option>
);
const optSolve = (
    <option value={'solved'} key={'solved'}>
        Mark as solved
    </option>
);
const optIgnore = (
    <option value={'ignored'} key={'ignored'}>
        Ignore
    </option>
);
const optUnignore = (
    <option value={'clear'} key={'clear'}>
        Unignore
    </option>
);

export const possibleActionsMap = {
    undefined: [optStart, optSolve, optStop, optIgnore],
    STATUS_CLEAR: [optStart, optSolve, optStop, optIgnore],
    STATUS_STARTED: [optSolve, optStop, optIgnore],
    STATUS_ABORTED: [optStart, optSolve, optIgnore],
    STATUS_SOLVED: [optStart, optStop, optIgnore],
    STATUS_IGNORED: [optUnignore, optStart, optSolve, optStop]
};
