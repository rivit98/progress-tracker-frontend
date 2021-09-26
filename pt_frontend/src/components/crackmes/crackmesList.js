import { crackmesService } from '../../services/crackmes';
import { useAxiosEffect } from '../../utils/useAxiosEffect';
import { ComponentStateHandler } from '../generic/componentStateHandler';
import { Link, LinkBox, LinkOverlay, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const Crackme = ({ crackme }) => {
    //TODO: icon/row color depending on current state
    //TODO: clickable row -> modal
    //TODO: if not logged -> not clickable
    const {actions, comments_num, date, hexid, language, name, writeups_num} = crackme
    const link = `https://crackmes.one/crackme/${hexid}`
    return (
        <Tr>
            <Td border={0}><Link href={link} isExternal>{name}</Link></Td>
            <Td border={0}>{date}</Td>
            <Td border={0}>{language}</Td>
            <Td border={0}>{comments_num}</Td>
            <Td border={0}>{writeups_num}</Td>
        </Tr>
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
            <Table variant="simple" >
                <Thead>
                    <Tr>
                        <Th w={'50%'}>Name</Th>
                        <Th w={'30%'}>Date</Th>
                        <Th w={'5%'}>Language</Th>
                        <Th w={'5%'}>Comments</Th>
                        <Th w={'5%'} isNumeric={true}>Writeups</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTasks()}
                </Tbody>
            </Table>
        </ComponentStateHandler>
    )
}