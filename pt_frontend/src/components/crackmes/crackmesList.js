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
            <AccordionButton px={0}>
                <Flex
                    textAlign="left"
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    w={'full'}
                    experimental_spaceX={'2'}
                >
                    <Box flex={8} overflow={'hidden'}>
                        <Link href={link} isExternal>
                            {name}
                        </Link>
                    </Box>
                    <Box flex={2} textAlign="center" overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box flex={2} textAlign="center" overflow={'hidden'}>
                        {comments_num}
                    </Box>
                    <Box flex={2} textAlign="center" overflow={'hidden'}>
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

    return (
        <ComponentStateHandler state={state}>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                mb={2}
                fontWeight={'bold'}
                experimental_spaceX={'2'}
            >
                <Box flex={8} overflow={'hidden'}>
                    Task name
                </Box>
                <Box flex={2} overflow={'hidden'}>
                    Date
                </Box>
                <Box flex={2} overflow={'hidden'}>
                    Comments
                </Box>
                <Box flex={2} overflow={'hidden'}>
                    Writeups
                </Box>
                <Box flex={1} overflow={'hidden'} />
            </Flex>
            <Flex w={'full'} justifyContent={'center'}>
                <Accordion allowToggle w={'full'}>
                    {tasks
                        .sort((t1, t2) => t2.date.getTime() - t1.date.getTime() || t1.name.localeCompare(t2.name))
                        .slice(0, 100)
                        .map((t) => (
                            <Crackme crackme={t} key={t.id} />
                        ))}
                </Accordion>
            </Flex>
        </ComponentStateHandler>
    );
};
