import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    IconButton,
    Link,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import formatDate from '../../utils/dateformatter';
import { MdArrowDropDown } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import { statusDescToStatusIDMap, statusBadge } from './const/statuses';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { crackmesService } from '../../services/crackmes';
import { possibleActionsMap } from './actionOptions';

export const CrackmeActionsNotLogged = () => {
    return (
        <div>
            <Link as={ReactRouterLink} to={'/login'} mr={1} color={'teal.500'}>
                Log in
            </Link>
            to track progress
        </div>
    );
};

const UpdateActionPanel = ({ id, updateTask, lastAction }) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm();
    const [loading, setLoading] = useState(false);

    const successCallback = (action) => {
        setLoading(false);
        updateTask(id, { ...action, date: new Date(action.date) });
        reset();
    };

    const errorCallback = (e) => {
        setLoading(false);

        const err = e.response?.data;
        if (err) {
            setError('status', {
                type: 'manual',
                message: 'Something went wrong, try again later'
            });
        }
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }

        setLoading(true);
        const status = data['status'];
        const statusID = statusDescToStatusIDMap[status];
        crackmesService.updateStatus(id, { status: statusID }).then(successCallback).catch(errorCallback);
    };

    const lastActionStatus = lastAction && lastAction.status;

    return (
        <form onSubmit={handleSubmit(onSubmit)} method={'POST'}>
            <HStack>
                <FormControl isInvalid={errors.status} w={'150px'}>
                    <Select
                        icon={<MdArrowDropDown />}
                        size={'sm'}
                        border={0}
                        bg="gray.700"
                        color="whiteAlpha.500"
                        {...register('status')}
                    >
                        {possibleActionsMap[lastActionStatus]}
                    </Select>
                    <FormErrorMessage>{errors.status && errors.status.message}</FormErrorMessage>
                </FormControl>
                <Button
                    colorScheme="teal"
                    fontSize={'md'}
                    fontWeight={'normal'}
                    size={'sm'}
                    isLoading={loading}
                    type="submit"
                >
                    Update status
                </Button>
            </HStack>
        </form>
    );
};

export const ActionsList = ({ crackme, updateTask }) => {
    const { id, actions, comments_num, hexid, writeups_num, lastAction } = crackme;
    const challengeLink = `https://crackmes.one/crackme/${hexid}`;
    const downloadLink = `https://crackmes.one/static/crackme/${hexid}.zip`;

    return (
        <>
            <Flex
                flexDirection={'row'}
                w={'full'}
                mx={'auto'}
                mb={2}
                whiteSpace={'nowrap'}
            >
                <HStack flex={1} justifyContent={'center'}>
                    <Link href={challengeLink} isExternal color={'teal.500'}>
                        Description
                    </Link>
                    <IconButton as={Link} href={downloadLink} icon={<FaDownload />} variant={'link'} color={'teal.500'} />
                </HStack>
                <HStack flex={1} justifyContent={'center'}>
                    <Text>Writeups:{' '}</Text>
                    <Text fontWeight={'bold'}>
                        {writeups_num}
                    </Text>
                </HStack>
                <HStack flex={1} justifyContent={'center'}>
                    <Text>Comments:{' '}</Text>
                    <Text fontWeight={'bold'}>
                        {comments_num}
                    </Text>
                </HStack>
            </Flex>
            <Divider colorScheme={'gray'} my={1} />
            <TableContainer mb={1}>
                <Table size='sm' variant={'unstyled'}>
                    <Tbody>
                        {actions.map((a, index) => {
                            return (
                                <Tr key={index}>
                                    <Td w={'1%'} pr={1}>
                                        {statusBadge[a.status]}
                                    </Td>
                                    <Td pl={1}>
                                        {formatDate(a.date, 'dd.mm.yyyy HH:MM:ss')}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <UpdateActionPanel id={id} updateTask={updateTask} lastAction={lastAction} />
        </>
    );
};
