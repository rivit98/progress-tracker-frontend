import { Divider, Flex, Link } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { hasPermissions, HEROES_MAPS_SPECIAL_PERMS, isLoggedIn, userGroups } from '../../context/userReducer';
import { UpdateActionPanel } from '../generic/updateActionPanel';
import { heroesMapsService } from '../../services/heroesMaps';
import { ActionsTable } from '../generic/actionsTable';
import { DeleteMap } from './deleteMap';
import { UpdateMap } from './updateMap';

export const ActionsList = ({ item, updateFunc }) => {
    const { id, link, lastAction, actions } = item;
    const logged = useSelector(isLoggedIn);
    const groups = useSelector(userGroups);
    const hasSpecialPerms = hasPermissions(groups, [HEROES_MAPS_SPECIAL_PERMS]);

    const updateFuncWrapper = (itemId, action) => {
        updateFunc({
            type: 'newaction',
            payload: { itemId, action },
        });
    };

    const commonSection = (
        <Flex mb={2} whiteSpace="nowrap">
            <Link href={link} isExternal color="teal.500">
                Download
            </Link>
        </Flex>
    );

    if (!logged) {
        return commonSection;
    }

    return (
        <>
            {commonSection}
            <Divider colorScheme="gray" my={1} />
            <ActionsTable actions={actions} />
            <UpdateActionPanel
                itemId={id}
                updateFunc={updateFuncWrapper}
                lastAction={lastAction}
                updateService={heroesMapsService.updateStatus}
            />
            {hasSpecialPerms && (
                <Flex justifyContent="flex-end" my={2}>
                    <DeleteMap item={item} updateFunc={updateFunc} />
                    <UpdateMap item={item} updateFunc={updateFunc} />
                </Flex>
            )}
        </>
    );
};
