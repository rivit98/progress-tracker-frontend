import { crackmesService } from '../../services/crackmes';
import { useAxiosEffect } from '../../utils/useAxiosEffect';
import { ComponentStateHandler } from '../generic/componentStateHandler';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Link
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';

const Crackme = ({ crackme }) => {
    //TODO: icon/row color depending on current state
    //TODO: clickable row -> modal
    //TODO: if not logged -> not clickable
    const { actions, comments_num, date, hexid, language, name, writeups_num } = crackme;
    const link = `https://crackmes.one/crackme/${hexid}`;
    return (
        <AccordionItem border={0}>
            <AccordionButton>
                <Flex
                    textAlign="left"
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    w={'full'}
                    experimental_spaceX={'2'}
                >
                    <Box flex={6} overflow={'hidden'}>
                        <Link href={link} isExternal>
                            {name}
                        </Link>
                    </Box>
                    <Box flex={3} textAlign="center" overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box flex={3} flexWrap={'wrap'} textAlign="center" overflow={'hidden'}>
                        {language}
                    </Box>
                    <Box flex={1} textAlign="center">
                        {comments_num}
                    </Box>
                    <Box flex={1} textAlign="center">
                        {writeups_num}
                    </Box>
                    <Box flex={1} textAlign="right" justifyContent={'end'} ml={'auto'}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4}>Actions here</AccordionPanel>
        </AccordionItem>
    );
};

export const CrackmesList = () => {
    //TODO: caching?
    const state = useAxiosEffect(crackmesService.getCrackmes, [], []);
    const tasks = state.data;

    const renderTasks = () => {
        return tasks
            .sort((t1, t2) => t2.date.getTime() - t1.date.getTime() || t1.name.localeCompare(t2.name))
            .slice(0, 100)
            .map((t) => <Crackme crackme={t} key={t.id} />);
    };

    return (
        <ComponentStateHandler state={state}>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                mb={2}
                px={4}
                fontWeight={'bold'}
                experimental_spaceX={'2'}
            >
                <Box flex={6}>Task name</Box>
                <Box flex={3}>Date</Box>
                <Box flex={3}>Language</Box>
                <Box flex={1}>Comments</Box>
                <Box flex={1}>Writeups</Box>
                <Box flex={1} />
            </Flex>
            <Flex w={'full'} justifyContent={'center'}>
                <Accordion allowToggle w={'full'}>
                    {renderTasks()}
                </Accordion>
            </Flex>
        </ComponentStateHandler>
    );
};
