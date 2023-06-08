import { Divider, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { GAMES_SPECIAL_PERMS, hasPermissions, userGroups } from '../../context/userReducer';
import { UpdateActionPanel } from '../generic/updateActionPanel';
import { ActionsTable } from '../generic/actionsTable';
import { gamesService } from '../../services/games';
import { DeleteGame } from './deleteGame';
import { UpdateGame } from './updateGame';

export const ActionsList = ({ item, updateFunc }) => {
    const { id, lastAction, actions } = item;
    const groups = useSelector(userGroups);
    const hasSpecialPerms = hasPermissions(groups, [GAMES_SPECIAL_PERMS]);

    const updateFuncWrapper = (itemId, action) => {
        updateFunc({
            type: 'newaction',
            payload: { itemId, action },
        });
    };

    return (
        <>
            <Divider colorScheme="gray" my={1} />
            <ActionsTable actions={actions} />
            <UpdateActionPanel
                itemId={id}
                updateFunc={updateFuncWrapper}
                lastAction={lastAction}
                updateService={gamesService.updateStatus}
            />
            {hasSpecialPerms && (
                <Flex justifyContent="flex-end" my={2}>
                    <DeleteGame item={item} updateFunc={updateFunc} />
                    <UpdateGame item={item} updateFunc={updateFunc} />
                </Flex>
            )}
        </>
    );
};
