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
import { MdCheckCircle } from 'react-icons/all';

const Crackme = ({ crackme }) => {
    //TODO: icon depending on current state
    //TODO: clickable row -> modal
    const {actions, comments_num, date, hexid, id, language, name, solutions, writeup_num} = crackme
    const link = `https://crackmes.one/crackme/${hexid}`
    return (
        <LinkBox as={Tr}>
            <LinkOverlay href={link} isExternal={true}>{name}</LinkOverlay>
            <Td>{date}</Td>
            <Td>{language}</Td>
            <Td>{comments_num}</Td>
            <Td>{writeup_num}</Td>
            <Td>{solutions}</Td>
        </LinkBox>
    )
}

export const CrackmesList = () => {
    //TODO: caching?
    const state = useAxiosEffect(crackmesService.getCrackmes, [], [])
    const tasks = state.data

    const renderTasks = () => {
        return tasks.map(t => {
            return <Crackme crackme={t}/>
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
                        <Th>Solutions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTasks()}
                </Tbody>
            </Table>
        </ComponentStateHandler>
    )
}