import { crackmesService } from '../../services/crackmes';
import { useAxiosEffect } from '../../utils/useAxiosEffect';
import { ComponentStateHandler } from '../generic/componentStateHandler';
import {
    LinkBox,
    LinkOverlay,
    List,
    ListIcon,
    ListItem,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';

const Crackme = ({ crackme }) => {
    //TODO: icon/row color depending on current state
    //TODO: clickable row -> modal
    //TODO: if not logged -> not clickable
    const {actions, comments_num, date, hexid, language, name, writeups_num} = crackme
    const link = `https://crackmes.one/crackme/${hexid}`
    return (
        <LinkBox as={Tr}>
            <LinkOverlay href={link} isExternal={true}>{name}</LinkOverlay>
            <Td>{date}</Td>
            <Td>{language}</Td>
            <Td>{comments_num}</Td>
            <Td>{writeups_num}</Td>
        </LinkBox>
    )
}

export const CrackmesList = () => {
    //TODO: caching?
    const state = useAxiosEffect(crackmesService.getCrackmes, [], [])
    const tasks = state.data

    const renderTasks = () => {
        return tasks.map(t => {
            return <Crackme crackme={t} key={t.id}/>
        })
    }

    return (
        <ComponentStateHandler state={state}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Date</Th>
                        <Th>Language</Th>
                        <Th>Comments</Th>
                        <Th>Writeups</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTasks()}
                </Tbody>
            </Table>
        </ComponentStateHandler>
    )
}