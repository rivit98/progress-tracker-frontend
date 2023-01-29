import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser, updateUser } from '../../context/userReducer';
import { authService } from '../../services/auth';
import { formTexts } from '../generic/formTexts';

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm({ mode: 'all' });

    const password = useRef({});
    password.current = watch('password');

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registeredCallback = (user) => {
        setLoading(false);
        dispatch(updateUser(user));
        navigate('/');
    };

    const errorCallback = (e) => {
        setLoading(false);
        dispatch(removeUser());

        const err = e.response?.data;
        if (err) {
            Object.entries({
                username: err?.username?.slice(0, 1)
            }).forEach(([key, value]) =>
                setError(key, {
                    type: 'manual',
                    message: value
                })
            );
        } else {
            toast({
                title: 'Error',
                description: formTexts.genericError,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    const onSubmit = (data) => {
        if (loading) {
            return;
        }
        setLoading(true);
        authService.register(data).then(registeredCallback).catch(errorCallback);
    };

    return (
        <Box maxW={'md'} w={'full'} justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)} method={'POST'}>
                <Center mb={4}>
                    <VStack>
                        <Heading>Register</Heading>
                        <HStack>
                            <Text>Already have an account?</Text>
                            <Link as={ReactRouterLink} to={'/login'} mr={1} color={'teal.500'}>
                                Log in!
                            </Link>
                        </HStack>
                    </VStack>
                </Center>
                <Stack spacing={2} color={'black'}>
                    <FormControl isInvalid={errors.username}>
                        <Input
                            bg={'white'}
                            placeholder={'Nick'}
                            {...register('username', {
                                required: formTexts.requiredField,
                                minLength: {
                                    value: 3,
                                    message: formTexts.textTooShort
                                }
                            })}
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <Input
                            bg={'white'}
                            type={'password'}
                            placeholder={'Password'}
                            {...register('password', {
                                required: formTexts.requiredField,
                                minLength: {
                                    value: 8,
                                    message: formTexts.textTooShort
                                }
                            })}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password2}>
                        <Input
                            bg={'white'}
                            type={'password'}
                            placeholder={'Repeat password'}
                            {...register('password2', {
                                required: formTexts.requiredField,
                                minLength: {
                                    value: 8,
                                    message: formTexts.textTooShort
                                },
                                validate: (value) => value === password.current || formTexts.passwordsDontMatch
                            })}
                        />
                        <FormErrorMessage>{errors.password2 && errors.password2.message}</FormErrorMessage>
                    </FormControl>
                </Stack>

                <Button mt={4} w={'full'} colorScheme="teal" isLoading={loading} type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default Register;
