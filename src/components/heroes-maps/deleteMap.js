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
import { heroesMapsService } from '../../services/heroesMaps'
import { useState } from 'react';
import { formTexts } from '../generic/formTexts';
import { DeleteIcon } from '@chakra-ui/icons';

export const DeleteMap = ({ item, updateFunc }) => {
    const { id: itemId, name } = item;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const resetCallback = () => {
        setLoading(false);
    }

    const errorCallback = (e) => {
        setError(formTexts.genericError);
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }
        setLoading(true);
        heroesMapsService.deleteMap(itemId).then(onClose).catch(errorCallback).finally(resetCallback);
        updateFunc({
            type: 'delete',
            payload: itemId
        });
    };

    return (
        <>
            <Button colorScheme={'red'} size={'sm'} onClick={onOpen} leftIcon={<DeleteIcon />}>Delete</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Delete map?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {name}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" isLoading={loading} onClick={onSubmit} leftIcon={<DeleteIcon />} mr={2}>
                            Delete
                        </Button>
                        <Button colorScheme='teal' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>

                    {error !== undefined && (
                        <Alert status={'error'} mt={3}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
