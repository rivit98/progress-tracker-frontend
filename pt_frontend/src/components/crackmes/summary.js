import { Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { crackmes } from '../../context/crackmesReducer';
import formatDate from '../../utils/dateformatter';
import { FiChevronsUp, FiMinus, FiPlus } from 'react-icons/all';

const SummaryLabel = ({ icon, content }) => {
    return (
        <Flex mx={1} flexDirection={'row'} alignItems={'center'} experimental_spaceX={3}>
            {icon}
            {content}
        </Flex>
    );
};

export const UpdateSummary = () => {
    const {
        lastUpdated: { created, date, deleted, updated }
    } = useSelector(crackmes);
    const cacheDate = new Date(date);

    return (
        <Flex mt={8}>
            <Text mr={1}>Last updated: {formatDate(cacheDate)}</Text>
            <SummaryLabel icon={<FiPlus color={'green'} />} content={created} />
            <SummaryLabel icon={<FiChevronsUp color={'yellow'} />} content={updated} />
            <SummaryLabel icon={<FiMinus color={'red'} />} content={deleted} />
        </Flex>
    );
};
