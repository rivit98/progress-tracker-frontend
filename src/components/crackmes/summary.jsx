import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FiChevronsUp, FiMinus, FiPlus } from 'react-icons/fi';
import formatDate from '../../utils/dateformatter';

const SummaryLabel = ({ icon, content, tooltipText }) => {
    return (
        <Tooltip label={tooltipText}>
            <Flex mx={1} flexDirection="row" alignItems="center" experimental_spaceX={3}>
                {icon}
                {content}
            </Flex>
        </Tooltip>
    );
};

export const UpdateSummary = ({ lastUpdated }) => {
    const { created, date, deleted, updated } = lastUpdated;
    const cacheDate = new Date(date);

    return (
        <Flex mt={8}>
            <Text mr={1}>Last updated: {formatDate(cacheDate)}</Text>
            <SummaryLabel icon={<FiPlus color="green" />} content={created} tooltipText="New tasks since last update" />
            <SummaryLabel
                icon={<FiChevronsUp color="yellow" />}
                content={updated}
                tooltipText="Updated tasks since last update"
            />
            <SummaryLabel
                icon={<FiMinus color="red" />}
                content={deleted}
                tooltipText="Removed tasks since last update"
            />
        </Flex>
    );
};
