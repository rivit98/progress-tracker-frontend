import { ArrowUpIcon, EditIcon } from "@chakra-ui/icons"
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

export const UpdateMap = ({ item, updateFunc }) => {
	const { id: itemId, name, link, heroes_version } = item;
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors }
	} = useForm({ mode: 'all' });

	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState(undefined);

	const resetCallback = () => {
		setLoading(false);
	}

	const successCallback = (data) => {
		updateFunc({
			type: 'update',
			payload: data
		});
		onClose();
	};

	const errorCallback = (e) => {
		const err = e.response?.data;
		try {
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
			setErrorText(formTexts.genericError)
		}
	};

	const onSubmit = (data) => {
		if (loading) {
			return;
		}
		setLoading(true);
		setErrorText(undefined);
		heroesMapsService.updateMap(itemId, data).then(successCallback).catch(errorCallback).finally(resetCallback);
	};

	const open = () => {
		reset();
		onOpen();
		setErrorText(undefined);
	}

	return (
		<>
			<Button mx={1} onClick={open} colorScheme="teal" size={'sm'} leftIcon={<EditIcon />}>Update</Button>

			<Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update map</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)} method={'POST'}>
							<Stack spacing={2} color={'black'}>
								<FormControl isInvalid={errors.name}>
									<Input
										bg={'white'}
										placeholder={'Map name'}
										defaultValue={name}
										{...register('name', {
											required: formTexts.requiredField
										})}
									/>
									<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={errors.heroes_version}>
									<NumberInput
										bg={'white'}
										type={'number'}
										min={1}
										max={7}
										step={1}
										defaultValue={heroes_version}
										placeholder={'Heroes version'}
										{...register('heroes_version', {
											required: formTexts.requiredField
										})}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<FormErrorMessage>{errors.heroes_version && errors.heroes_version.message}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={errors.link}>
									<Input
										bg={'white'}
										type={'url'}
										defaultValue={link}
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
							{errorText !== undefined && (
								<Alert status={'error'} mt={3}>
									<AlertIcon />
									{errorText}
								</Alert>
							)}
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
