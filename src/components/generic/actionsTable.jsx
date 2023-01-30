import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { statusBadge } from './statuses';

export const ActionsTable = ({ actions }) => {
    return (
        <TableContainer mb={1}>
            <Table size="sm" variant="unstyled">
                <Tbody>
                    {actions.slice(0, 10).map((a) => {
                        return (
                            <Tr key={`${a.date}-${a.status}`}>
                                <Td w="1%" py={1} px={1}>
                                    {statusBadge[a.status]}
                                </Td>
                                <Td ml={3} py={1} px={1}>
                                    {formatDate(a.date, 'dd.mm.yyyy HH:MM:ss')}
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
