import { Divider, Flex } from '@chakra-ui/react';
import { UpdateActionPanel } from '../generic/updateActionPanel';
import { ActionsTable } from '../generic/actionsTable';
import { gamesService } from '../../services/games';
import { DeleteGame } from './deleteGame';
import { UpdateGame } from './updateGame';

export const ActionsList = ({ item, updateFunc }) => {
    const { id, lastAction, actions } = item;

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
            <Flex justifyContent="flex-end" my={2}>
                <DeleteGame item={item} updateFunc={updateFunc} />
                <UpdateGame item={item} updateFunc={updateFunc} />
            </Flex>
        </>
    );
};
