import { Button, FormControl, FormErrorMessage, HStack, Select } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { statusDescToStatusIDMap } from './statuses';
import { possibleActionsMap } from './actionOptions';
import { formTexts } from './formTexts';

export const UpdateActionPanel = ({ itemId, updateFunc, lastAction, updateService }) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const successCallback = (action) => {
        setLoading(false);
        updateFunc(itemId, { ...action, date: new Date(action.date) });
        reset();
    };

    const errorCallback = (err) => {
        console.error(err);
        setLoading(false);

        setError('status', {
            type: 'manual',
            message: formTexts.genericError,
        });
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }

        setLoading(true);
        const { status } = data;
        const statusID = statusDescToStatusIDMap[status];
        updateService(itemId, { status: statusID }).then(successCallback).catch(errorCallback);
    };

    const lastActionStatus = lastAction && lastAction.status;

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <HStack>
                <FormControl isInvalid={errors.status} w="150px">
                    <Select
                        icon={<MdArrowDropDown />}
                        size="sm"
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
                    fontSize="md"
                    fontWeight="normal"
                    size="sm"
                    isLoading={loading}
                    type="submit"
                >
                    Update status
                </Button>
            </HStack>
        </form>
    );
};
