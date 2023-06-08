import { EditIcon } from '@chakra-ui/icons';
import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formTexts } from '../generic/formTexts';
import { gamesService } from '../../services/games';

export const UpdateGame = ({ item, updateFunc }) => {
    const { id: itemId, name } = item;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState(undefined);

    const resetCallback = () => {
        setLoading(false);
    };

    const successCallback = (data) => {
        updateFunc({
            type: 'update',
            payload: data,
        });
        onClose();
    };

    const errorCallback = (e) => {
        console.error(e);
        const err = e.response?.data;
        try {
            Object.entries({
                name: err?.name?.slice(0, 1)[0],
            })
                .filter(([, value]) => value !== undefined)
                .forEach(([key, value]) => {
                    setError(key, {
                        type: 'manual',
                        message: value,
                    });
                });
        } catch {
            setErrorText(formTexts.genericError);
        }
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }
        setLoading(true);
        setErrorText(undefined);
        gamesService.updateGame(itemId, data).then(successCallback).catch(errorCallback).finally(resetCallback);
    };

    const open = () => {
        reset();
        onOpen();
        setErrorText(undefined);
    };

    return (
        <>
            <Button mx={1} onClick={open} colorScheme="teal" size="sm" leftIcon={<EditIcon />}>
                Update
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update game</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} method="POST">
                            <Stack spacing={2} color="black">
                                <FormControl isInvalid={errors.name}>
                                    <Input
                                        bg="white"
                                        placeholder="Game name"
                                        defaultValue={name}
                                        {...register('name', {
                                            required: formTexts.requiredField,
                                        })}
                                    />
                                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                                </FormControl>
                            </Stack>

                            <Button mt={4} w="full" colorScheme="teal" isLoading={loading} type="submit">
                                Submit
                            </Button>
                            {errorText !== undefined && (
                                <Alert status="error" mt={3}>
                                    <AlertIcon />
                                    {errorText}
                                </Alert>
                            )}
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
