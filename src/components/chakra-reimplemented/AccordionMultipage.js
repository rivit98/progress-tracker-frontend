import {
    AccordionDescendantsProvider,
    AccordionProvider,
    StylesProvider,
    useAccordion,
    useMultiStyleConfig
} from '@chakra-ui/react';
import { useMemo } from 'react';

// Reimplemented Chakra UI Accordion to support pagination
// Original implementation only looks for list index and I want to preserve expanded item(s) after page change

//https://github.com/chakra-ui/chakra-ui/blob/75edcf41e7ff4acc2569f2169949063c164d8f6e/packages/accordion/README.md

function addItem(array, item) {
    return [...array, item];
}

function removeItem(array, item) {
    return array.filter((eachItem) => eachItem !== item);
}

function isArray(value) {
    return Array.isArray(value);
}

const useAccordionWrapper = (props) => {
    const { allowMultiple, allowToggle } = props;

    const originalHooks = useAccordion(props);
    const { descendants, index, setIndex } = originalHooks;

    const getAccordionItemPropsOverride = (idx) => {
        let isOpen = false;
        if (idx !== null) {
            const node_id = descendants.item(idx).node.id;
            isOpen = isArray(index) ? index.includes(node_id) : index === node_id;
        }

        const onChange = (isOpen) => {
            if (idx === null) return;
            const node_id = descendants.item(idx).node.id;

            if (allowMultiple && isArray(index)) {
                const nextState = isOpen ? addItem(index, node_id) : removeItem(index, node_id);
                setIndex(nextState);
            } else if (isOpen) {
                setIndex(node_id);
            } else if (allowToggle) {
                setIndex(-1);
            }
        };
        return { isOpen, onChange };
    };

    return { ...originalHooks, getAccordionItemProps: getAccordionItemPropsOverride, index, setIndex };
};

const cx = (...classNames) => classNames.filter(Boolean).join(' ');

const AccordionMultipage = ({ children, reduceMotion, ...props }) => {
    const styles = useMultiStyleConfig('Accordion', props);
    const { htmlProps, descendants, ...context } = useAccordionWrapper(props);

    const ctx = useMemo(() => ({ ...context, reduceMotion: !!reduceMotion }), [context, reduceMotion]);

    return (
        <AccordionDescendantsProvider value={descendants}>
            <AccordionProvider value={ctx}>
                <StylesProvider value={styles}>
                    <div {...htmlProps} className={cx('chakra-accordion', props.className)}>
                        {children}
                    </div>
                </StylesProvider>
            </AccordionProvider>
        </AccordionDescendantsProvider>
    );
};

export default AccordionMultipage;
