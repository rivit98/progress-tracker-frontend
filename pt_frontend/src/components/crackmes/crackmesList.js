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
    Button,
    Flex,
    Link,
    List,
    ListIcon,
    ListItem,
    Select
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { useDispatch, useSelector } from 'react-redux';
import { crackmes, setCrackmes, setTasksLastUpdated } from '../../context/crackmesReducer';
import { isLoggedIn } from '../../context/userReducer';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { MdArrowDropDown, MdCheckCircle, MdSettings } from 'react-icons/all';

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

const statusMap = {
    0: 'Clear',
    1: 'Started',
    2: 'Aborted',
    3: 'Solved',
    4: 'Ignored'
};

const ActionsList = ({ crackme }) => {
    const { actions, comments_num, hexid, writeups_num } = crackme;
    const link = `https://crackmes.one/crackme/${hexid}`;

    return (
        <Box>
            <Flex
                textAlign="left"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                mx={'auto'}
                mb={2}
                experimental_spaceX={'2'}
            >
                <Box flex={8} overflow={'hidden'}>
                    <Link href={link} isExternal color={'teal.500'}>
                        Challenge link <ExternalLinkIcon textDecoration={'none'} my={'auto'} ml={1} />
                    </Link>
                </Box>
                <Box flex={3} overflow={'hidden'}>
                    Writeups: {writeups_num}
                </Box>
                <Box flex={4} overflow={'hidden'}>
                    Comments: {comments_num}
                </Box>
            </Flex>
            <List spacing={3} my={4}>
                {actions.map((a) => {
                    return (
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            {formatDate(a.date, 'dd.mm.yyyy HH:MM:ss')} status: {statusMap[a.status]}
                        </ListItem>
                    );
                })}
            </List>
            <Flex flexDirection={'row'} experimental_spaceX={2}>
                <Select icon={<MdArrowDropDown />} w={'25%'} size={'sm'} bg="teal" color="gray">
                    <option value={'started'}>Start solving</option>
                    <option value={'started'}>Abort solving</option>
                    <option value={'started'}>Mark as solved</option>
                    <option value={'started'}>Mark as ignored</option>
                </Select>
                <Button colorScheme="teal" fontSize={'md'} fontWeight={'normal'} size={'sm'}>
                    Update status
                </Button>
            </Flex>
        </Box>
    );
};

const Crackme = ({ crackme }) => {
    const logged = useSelector(isLoggedIn);

    //TODO: icon/row color depending on current state??
    const { date, name, language } = crackme;

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
                    <Box ml={1} flex={8} overflow={'hidden'} textAlign="left">
                        {name}
                    </Box>
                    <Box flex={3} overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box flex={4} overflow={'hidden'}>
                        {language}
                    </Box>
                    <Box flex={1} textAlign="right" justifyContent={'end'} ml={'auto'} mr={2}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} w={'full'}>
                {logged ? <ActionsList crackme={crackme} /> : <CrackmeActionsNotLogged />}
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
                fontSize={'lg'}
            >
                <Box flex={8} overflow={'hidden'}>
                    Task name
                </Box>
                <Box flex={3} overflow={'hidden'}>
                    Date
                </Box>
                <Box flex={4} overflow={'hidden'}>
                    Language
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
            <Flex>pagination</Flex>
            <Flex mt={5}>
                Last updated: {formatDate(cacheDate)} | {created} new | {deleted} removed | {updated} updated |{' '}
                {total_scrapped} in total
            </Flex>
        </>
    );
};

export const CrackmesList = () => {
    const logged = useSelector(isLoggedIn);
    const dispatch = useDispatch();

    const {
        lastUpdated: { date },
        cachedTasks
    } = useSelector(crackmes);

    const actionsLoader = (options) => {
        if (!logged) {
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
        return { ...t, actions: a.sort((a1, a2) => a2.date.getTime() - a1.date.getTime()) };
    });

    return (
        <ComponentStateHandler state={state}>
            <CrackmesListRenderer tasks={tasksWithActions} />
        </ComponentStateHandler>
    );
};
