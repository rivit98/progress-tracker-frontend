import {
    Divider,
    Flex,
    Link} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import { UpdateActionPanel } from '../generic/updateActionPanel';
import { heroesMapsService } from '../../services/heroesMaps'
import { ActionsTable } from '../generic/actionsTable';

export const ActionsList = ({ item, updateFunc }) => {
    const { id, link, lastAction, actions } = item;
    const logged = useSelector(isLoggedIn);

    const commonSection = (
        <Flex
            flexDirection={'row'}
            w={'full'}
            mx={'auto'}
            mb={2}
            whiteSpace={'nowrap'}
            justifyContent={'center'}
        >
            <Link href={link} isExternal color={'teal.500'}>
                Download
            </Link>
        </Flex>
    )

    if (!logged) {
        return commonSection
    }

    return (
        <>
            {commonSection}
            <Divider colorScheme={'gray'} my={1} />
            <ActionsTable actions={actions} />
            <UpdateActionPanel itemId={id} updateFunc={updateFunc} lastAction={lastAction} updateService={heroesMapsService.updateStatus} />
        </>
    );
};
