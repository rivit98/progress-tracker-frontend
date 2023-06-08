import { AddIcon } from '@chakra-ui/icons';
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

export const AddGame = ({ updateFunc }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({ mode: 'all' });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({ message: undefined, type: undefined });

    const resetCallback = () => {
        setLoading(false);
    };

    const successCallback = (data) => {
        setResult({ message: 'Game added', type: 'success' });
        updateFunc({
            type: 'add',
            payload: { ...data, actions: [], lastAction: undefined },
        });
        reset();
    };

    const errorCallback = (e) => {
        console.error(e);
        try {
            const err = e.response?.data;
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
            setResult({ message: formTexts.genericError, type: 'error' });
        }
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }
        setResult({ message: undefined, type: undefined });
        setLoading(true);
        gamesService.createGame(data).then(successCallback).catch(errorCallback).finally(resetCallback);
    };

    const open = () => {
        reset();
        onOpen();
        setResult({ message: undefined, type: undefined });
    };

    return (
        <>
            <Button onClick={open} colorScheme="teal" size="sm" leftIcon={<AddIcon />}>
                Add game
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new game</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} method="POST">
                            <Stack spacing={2} color="black">
                                <FormControl isInvalid={errors.name}>
                                    <Input
                                        bg="white"
                                        placeholder="Game name"
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
                            {result.message !== undefined && (
                                <Alert status={result.type} mt={3}>
                                    <AlertIcon />
                                    {result.message}
                                </Alert>
                            )}
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
