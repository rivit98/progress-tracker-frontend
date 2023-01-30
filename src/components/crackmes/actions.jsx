import { Divider, Flex, HStack, IconButton, Link, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { DownloadIcon } from '@chakra-ui/icons';
import { crackmesService } from '../../services/crackmes';
import { isLoggedIn } from '../../context/userReducer';
import { UpdateActionPanel } from '../generic/updateActionPanel';
import { ActionsTable } from '../generic/actionsTable';

export const ActionsList = ({ crackme, updateFunc }) => {
    const { id, actions, comments_num, hexid, writeups_num, lastAction } = crackme;
    const challengeLink = `https://crackmes.one/crackme/${hexid}`;
    const downloadLink = `https://crackmes.one/static/crackme/${hexid}.zip`;
    const logged = useSelector(isLoggedIn);

    const commonSection = (
        <Flex mb={2} whiteSpace="nowrap">
            <HStack flex={1} justifyContent="center">
                <Link href={challengeLink} isExternal color="teal.500">
                    Description
                </Link>
                <IconButton as={Link} href={downloadLink} icon={<DownloadIcon />} variant="link" color="teal.500" />
            </HStack>
            <HStack flex={1} justifyContent="center">
                <Text>Writeups: </Text>
                <Text fontWeight="bold">{writeups_num}</Text>
            </HStack>
            <HStack flex={1} justifyContent="center">
                <Text>Comments: </Text>
                <Text fontWeight="bold">{comments_num}</Text>
            </HStack>
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
                updateFunc={updateFunc}
                lastAction={lastAction}
                updateService={crackmesService.updateStatus}
            />
        </>
    );
};
