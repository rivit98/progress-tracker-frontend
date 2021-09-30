import { crackmesService } from '../../services/crackmes';
import { useAxiosEffect } from '../../utils/useAxiosEffect';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
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
import { crackmes, setCrackmes, setTasksLastUpdated } from '../../context/crackmesReducer';
import { isLoggedIn } from '../../context/userReducer';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

const CrackmeActionsNotLogged = () => {
    return (
        <div>
            <Link as={ReactRouterLink} to={'/login'} mr={1} color={'teal.500'}>
                Log in
            </Link>
            to track progress
        </div>
    );
};

const ActionsList = ({ actions }) => {
    return (
        <div>
            {actions.map((a) => {
                return JSON.stringify(a);
            })}
        </div>
    );
};

const Crackme = ({ crackme }) => {
    const logged = useSelector(isLoggedIn);

    //TODO: icon/row color depending on current state
    //TODO: clickable row
    const { actions, comments_num, date, hexid, name, writeups_num } = crackme;
    const link = `https://crackmes.one/crackme/${hexid}`;

    const sortedActions = actions || [];
    return (
        <AccordionItem border={0} maxW={'3xl'} w={'full'} mx={'auto'} textAlign={'center'} isDisabled={false}>
            <AccordionButton
                px={0}
                _hover={{
                    background: 'blackAlpha.600',
                    color: 'teal.500'
                }}
                rounded="md"
            >
                <Flex flexDirection={'row'} justifyContent={'space-between'} experimental_spaceX={'2'} w={'full'}>
                    <Box ml={1} flex={10} overflow={'hidden'} textAlign="left">
                        {name}
                        <Link href={link} isExternal>
                            <ExternalLinkIcon textDecoration={'none'} my={'auto'} ml={2} />
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
                    <Box flex={1} textAlign="right" justifyContent={'end'} ml={'auto'} mr={2}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} w={'full'}>
                {logged ? <ActionsList actions={sortedActions} /> : <CrackmeActionsNotLogged />}
            </AccordionPanel>
        </AccordionItem>
    );
};

export const CrackmesListRenderer = ({ tasks }) => {
    const {
        lastUpdated: { created, date, deleted, total_scrapped, updated }
    } = useSelector(crackmes);
    const cacheDate = new Date(date);

    return (
        <>
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
                    {[...tasks]
                        .sort((t1, t2) => t2.date.getTime() - t1.date.getTime() || t1.name.localeCompare(t2.name))
                        .slice(0, 100)
                        .map((t) => (
                            <Crackme crackme={t} key={t.id} />
                        ))}
                </Accordion>
            </Flex>
        </>
    );
};

export const CrackmesList = () => {
    const logged = useSelector(isLoggedIn);

    const {
        lastUpdated: { date },
        cachedTasks
    } = useSelector(crackmes);
    const dispatch = useDispatch();

    const actionsLoader = (options) => {
        if (!logged) {
            console.log('actions empty');
            return new Promise((resolve) => resolve([]));
        }

        console.log('actions');
        return crackmesService.getActions(options);
    };

    const cacheResolver = (options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const lastUpdated = await crackmesService.lastUpdated(options);
                if (date !== undefined && new Date(date).getTime() >= lastUpdated.date.getTime()) {
                    console.log('cached');
                    dispatch(setTasksLastUpdated(lastUpdated));
                    resolve(cachedTasks.map((t) => ({ ...t, date: new Date(t.date) })));
                } else {
                    console.log('from api');
                    const updatedTasks = await crackmesService.getCrackmes(options);
                    dispatch(
                        setCrackmes({
                            lastUpdated: lastUpdated,
                            cachedTasks: updatedTasks
                        })
                    );
                    resolve(updatedTasks);
                }
            } catch (e) {
                reject(e);
            }
        });
    };

    const taskListLoader = getAggregatedState(cacheResolver, actionsLoader);

    const state = useAxiosEffect(taskListLoader, [], [[], {}]);
    const stateData = state.data;
    const actions = stateData[1];

    const tasksWithActions = stateData[0].map((t) => {
        const a = actions[t.id] || [];
        return { ...t, actions: a };
    });

    return (
        <ComponentStateHandler state={state}>
            <CrackmesListRenderer tasks={tasksWithActions} />
        </ComponentStateHandler>
    );
};
