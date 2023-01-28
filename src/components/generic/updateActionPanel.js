import {
    Button,
    FormControl,
    FormErrorMessage,
    HStack,
    Select,

} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { statusDescToStatusIDMap } from '../generic/statuses';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { possibleActionsMap } from '../generic/actionOptions';

export const UpdateActionPanel = ({ itemId, updateFunc, lastAction, updateService }) => {
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
        updateFunc(itemId, { ...action, date: new Date(action.date) });
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
        updateService(itemId, { status: statusID }).then(successCallback).catch(errorCallback);
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
