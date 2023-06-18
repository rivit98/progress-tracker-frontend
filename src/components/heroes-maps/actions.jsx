import { Divider, Flex } from '@chakra-ui/react';
import { UpdateActionPanel } from '../generic/updateActionPanel';
import { heroesMapsService } from '../../services/heroesMaps';
import { ActionsTable } from '../generic/actionsTable';
import { DeleteMap } from './deleteMap';
import { UpdateMap } from './updateMap';

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
                updateService={heroesMapsService.updateStatus}
            />
            <Flex justifyContent="flex-end" my={2}>
                <DeleteMap item={item} updateFunc={updateFunc} />
                <UpdateMap item={item} updateFunc={updateFunc} />
            </Flex>
        </>
    );
};
