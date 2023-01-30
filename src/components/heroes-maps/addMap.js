import { AddIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	FormControl,
	FormErrorMessage,
	Input,
	Stack,
} from '@chakra-ui/react';
import { formTexts } from "../generic/formTexts";
import { heroesMapsService } from "../../services/heroesMaps";

export const AddMap = ({ updateFunc }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors }
	} = useForm({ mode: 'all' });

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState({ message: undefined, type: undefined });

	const resetCallback = () => {
		setLoading(false);
	}

	const successCallback = (data) => {
		setResult({ message: 'Map added', type: 'success' });
		updateFunc({
			type: 'add',
			payload: { ...data, actions: [], lastAction: undefined }
		});
		reset();
	};

	const errorCallback = (e) => {
		try {
			const err = e.response?.data;
			Object.entries({
				name: err?.name?.slice(0, 1)[0],
				link: err?.link?.slice(0, 1)[0]
			})
				.filter(([key, value]) => value !== undefined)
				.forEach(([key, value]) => {
					setError(key, {
						type: 'manual',
						message: value
					})
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
		heroesMapsService.createMap(data).then(successCallback).catch(errorCallback).finally(resetCallback);
	};

	const open = () => {
		reset();
		onOpen();
		setResult({ message: undefined, type: undefined });
	}

	return (
		<>
			<Button onClick={open} colorScheme="teal" size={'sm'} leftIcon={<AddIcon />}>Add map</Button>

			<Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add new map</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)} method={'POST'}>
							<Stack spacing={2} color={'black'}>
								<FormControl isInvalid={errors.name}>
									<Input
										bg={'white'}
										placeholder={'Map name'}
										{...register('name', {
											required: formTexts.requiredField
										})}
									/>
									<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={errors.heroes_version}>
									<Input
										bg={'white'}
										type={'number'}
										defaultValue={3}
										placeholder={'Heroes version'}
										{...register('heroes_version', {
											required: formTexts.requiredField,
										})}
									>
									</Input>
									<FormErrorMessage>{errors.heroes_version && errors.heroes_version.message}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={errors.link}>
									<Input
										bg={'white'}
										type={'url'}
										placeholder={'Link'}
										{...register('link', {
											required: formTexts.requiredField
										})}
									/>
									<FormErrorMessage>{errors.link && errors.link.message}</FormErrorMessage>
								</FormControl>
							</Stack>

							<Button mt={4} w={'full'} colorScheme="teal" isLoading={loading} type="submit">
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
	)
}
