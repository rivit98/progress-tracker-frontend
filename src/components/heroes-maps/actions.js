import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Link,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { MdArrowDropDown } from 'react-icons/md';
import { statusDescToStatusIDMap, statusBadge } from '../generic/statuses';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { possibleActionsMap } from '../generic/actionOptions';
import { heroesMapsService } from '../../services/heroesMaps';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';

const UpdateActionPanel = ({ id, updateFunc, lastAction }) => {
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
        updateFunc(id, { ...action, date: new Date(action.date) });
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
        heroesMapsService.updateStatus(id, { status: statusID }).then(successCallback).catch(errorCallback);
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

export const ActionsList = ({ item, updateFunc }) => {
    const { id, link, lastAction, actions } = item;
    const logged = useSelector(isLoggedIn);

    const commonSection = (
        <Flex
            flexDirection={'row'}
            w={'full'}
            mx={'auto'}
            mb={2}
            whiteSpace={'nowrap'}
            justifyContent={'center'}
        >
            <Link href={link} isExternal color={'teal.500'}>
                Download
            </Link>
        </Flex>
    )

    if (!logged) {  
        return commonSection
    }

    return (
        <>
            {commonSection}
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
            <UpdateActionPanel id={id} updateFunc={updateFunc} lastAction={lastAction} />
        </>
    );
};
