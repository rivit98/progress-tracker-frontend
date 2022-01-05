import { useForm } from 'react-hook-form';
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
import { formTexts } from './formTexts';
import { authService } from '../../services/auth';
import { Link as ReactRouterLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser, updateUser } from '../../context/userReducer';
const Login = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({ mode: 'all' });

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const loggedCallback = (user) => {
        setLoading(false);
        dispatch(updateUser(user));
        history.push('/');
    };

    const errorCallback = (e) => {
        setLoading(false);
        dispatch(removeUser());

        const err = e.response?.data;
        if (err) {
            setError('password', {
                type: 'manual',
                message: 'Invalid login or password!'
            });
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
        authService.login(data).then(loggedCallback).catch(errorCallback);
    };

    return (
        <Box maxW={'md'} w={'full'} justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)} method={'POST'}>
                <Center mb={4}>
                    <VStack>
                        <Heading>Login</Heading>
                        <HStack>
                            <Text>Don't have an account?</Text>
                            <Link as={ReactRouterLink} to={'/register'} color={'teal.500'}>
                                Create it
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
                                required: formTexts.requiredField
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
                                required: formTexts.requiredField
                            })}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                </Stack>

                <Button mt={4} w={'full'} colorScheme="blue" isLoading={loading} type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default Login;
