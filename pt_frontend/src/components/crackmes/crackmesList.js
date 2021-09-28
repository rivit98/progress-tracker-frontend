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
import { useDispatch, useSelector } from 'react-redux';
import { currentUserData } from '../../context/userReducer';
import { crackmes, setTasksLastUpdated, storeTasks } from '../../context/crackmesReducer';

const Crackme = ({ crackme }) => {
    //TODO: icon/row color depending on current state
    //TODO: clickable row -> modal
    //TODO: if not logged -> not clickable
    const { actions, comments_num, date, hexid, name, writeups_num } = crackme;
    const link = `https://crackmes.one/crackme/${hexid}`;
    return (
        <AccordionItem border={0} maxW={'3xl'} w={'full'} mx={'auto'} textAlign={'center'}>
            <AccordionButton px={0}>
                <Flex flexDirection={'row'} justifyContent={'space-between'} experimental_spaceX={'2'} w={'full'}>
                    <Box flex={10} overflow={'hidden'} textAlign="left">
                        <Link href={link} isExternal>
                            {name}
                        </Link>
                    </Box>
                    <Box flex={3} overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box flex={3} overflow={'hidden'}>
                        {comments_num}
                    </Box>
                    <Box flex={3} overflow={'hidden'}>
                        {writeups_num}
                    </Box>
                    <Box flex={1} textAlign="right" justifyContent={'end'} ml={'auto'}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} w={'full'}>
                actions
            </AccordionPanel>
        </AccordionItem>
    );
};

export const CrackmesList = () => {
    const {
        lastUpdated: { created, date, deleted, total_scrapped, updated },
        tasks
    } = useSelector(crackmes);
    const dispatch = useDispatch();

    const cacheDate = new Date(date);

    const cacheResolver = (options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const lastUpdated = await crackmesService.lastUpdated(options);
                dispatch(setTasksLastUpdated(lastUpdated));
                if (date !== undefined && cacheDate.getTime() >= lastUpdated.date.getTime()) {
                    console.log('cached');
                    resolve(tasks.map((t) => ({ ...t, date: new Date(t.date) })));
                } else {
                    const updatedTasks = await crackmesService.getCrackmes(options);
                    console.log('from api');
                    dispatch(storeTasks(updatedTasks));
                    resolve(updatedTasks);
                }
            } catch (e) {
                reject(e);
            }
        });
    };

    const state = useAxiosEffect(cacheResolver, [], []);

    return (
        <ComponentStateHandler state={state}>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                maxW={'3xl'}
                mx={'auto'}
                mb={2}
                fontWeight={'bold'}
                experimental_spaceX={'2'}
            >
                <Box flex={10} overflow={'hidden'}>
                    Task name
                </Box>
                <Box flex={3} overflow={'hidden'}>
                    Date
                </Box>
                <Box flex={3} overflow={'hidden'}>
                    Comments
                </Box>
                <Box flex={3} overflow={'hidden'}>
                    Writeups
                </Box>
                <Box flex={1} overflow={'hidden'} />
            </Flex>
            <Flex w={'full'} justifyContent={'center'}>
                <Accordion allowToggle w={'full'}>
                    {[...state.data]
                        .sort((t1, t2) => t2.date.getTime() - t1.date.getTime() || t1.name.localeCompare(t2.name))
                        .slice(0, 10)
                        .map((t) => (
                            <Crackme crackme={t} key={t.id} />
                        ))}
                </Accordion>
            </Flex>
        </ComponentStateHandler>
    );
};
