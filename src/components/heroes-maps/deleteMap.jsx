import {
    Alert,
    AlertIcon,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { heroesMapsService } from '../../services/heroesMaps';
import { formTexts } from '../generic/formTexts';

export const DeleteMap = ({ item, updateFunc }) => {
    const { id: itemId, name } = item;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const resetCallback = () => {
        setLoading(false);
    };

    const successCallback = () => {
        updateFunc({
            type: 'delete',
            payload: itemId,
        });
        onClose();
    };

    const errorCallback = (err) => {
        console.error(err);
        setError(formTexts.genericError);
    };

    const onSubmit = () => {
        if (loading) {
            return;
        }
        setError(undefined);
        setLoading(true);
        heroesMapsService.deleteMap(itemId).then(successCallback).catch(errorCallback).finally(resetCallback);
    };

    return (
        <>
            <Button colorScheme="red" size="sm" onClick={onOpen} leftIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete map?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {name}
                        <ModalFooter>
                            <Button
                                colorScheme="red"
                                isLoading={loading}
                                onClick={onSubmit}
                                leftIcon={<DeleteIcon />}
                                mr={2}
                            >
                                Delete
                            </Button>
                            <Button colorScheme="teal" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>

                        {error !== undefined && (
                            <Alert status="error" mb={2}>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
