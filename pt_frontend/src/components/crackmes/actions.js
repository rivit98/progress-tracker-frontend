import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Link,
    List,
    ListIcon,
    ListItem,
    Select,
    Text
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import formatDate from '../../utils/dateformatter';
import { MdArrowDropDown } from 'react-icons/all';
import { statusDesc, statusIcon } from './consts';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { crackmesService } from '../../services/crackmes';

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

const UpdateActionPanel = ({ id, updateAction }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const [loading, setLoading] = useState(false);

    const successCallback = (action) => {
        setLoading(false);
        updateAction(action);
    };

    const errorCallback = (e) => {
        setLoading(false);

        const err = e.response?.data;
        if (err) {
            setError('status', {
                type: 'manual',
                message: 'Something went wrong, try again later'
            });
        } else {
        }
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }

        setLoading(true);
        const status = data['status'];
        const statusDescToStatusIDMap = Object.fromEntries(
            Object.entries(statusDesc).map(([k, v]) => [v.toLowerCase(), k])
        );
        const statusID = statusDescToStatusIDMap[status];
        crackmesService.updateStatus(id, { status: statusID }).then(successCallback).catch(errorCallback);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method={'POST'}>
            <HStack>
                <FormControl isInvalid={errors.status} w={'140px'}>
                    <Select
                        icon={<MdArrowDropDown />}
                        size={'sm'}
                        border={0}
                        bg="gray.700"
                        color="whiteAlpha.500"
                        {...register('status')}
                    >
                        <option value={'started'}>Start solving</option>
                        <option value={'aborted'}>Stop solving</option>
                        <option value={'solved'}>Mark as solved</option>
                        <option value={'ignored'}>Mark as ignored</option>
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

export const ActionsList = ({ crackme, updateLastAction }) => {
    const { id, actions, comments_num, hexid, writeups_num } = crackme;
    const link = `https://crackmes.one/crackme/${hexid}`;

    const updateActions = (a) => {
        actions.unshift(a);
        updateLastAction(a);
    };

    return (
        <Box textAlign={'left'}>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'center'}
                w={'full'}
                mx={'auto'}
                mb={2}
                experimental_spaceX={'2'}
            >
                <Box flex={1} overflow={'hidden'} flexDirection={'row'} alignItems={'center'} experimental_spaceX={1}>
                    <Link href={link} isExternal color={'teal.500'}>
                        Challenge link
                    </Link>
                    <ExternalLinkIcon />
                </Box>
                <Box flex={1} overflow={'hidden'}>
                    Writeups:{' '}
                    <Text d="inline" fontWeight={'bold'}>
                        {writeups_num}
                    </Text>
                </Box>
                <Box flex={1} overflow={'hidden'}>
                    Comments:{' '}
                    <Text d="inline" fontWeight={'bold'}>
                        {comments_num}
                    </Text>
                </Box>
            </Flex>
            <List spacing={3} my={4}>
                {actions.map((a, index) => {
                    const status = a.status;
                    const { icon, color } = statusIcon[status];
                    return (
                        <ListItem key={index}>
                            <ListIcon as={icon} color={color} fontSize={'lg'} />
                            {formatDate(a.date, 'dd.mm.yyyy HH:MM:ss')} -- {statusDesc[status]}
                        </ListItem>
                    );
                })}
            </List>
            <UpdateActionPanel id={id} updateAction={updateActions} />
        </Box>
    );
};
