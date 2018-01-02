import React from 'react';
import { Table } from 'semantic-ui-react';

export default props => (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Дата</Table.HeaderCell>
                <Table.HeaderCell>События</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {props.data.slice(0).reverse().map((x, i) => {
                if (x.ratio >= 0.05) {
                    return <Table.Row key={i} className={x.ratio >= 0.06 ? 'sick' : 'woozy'}>
                        <Table.Cell>{x.time}</Table.Cell>
                        <Table.Cell>Обнаружено {x.abnormal} аномальных пакетов ({+(x.ratio * 100).toFixed(2)}% от общей нагрузки)</Table.Cell>
                    </Table.Row>
                }
            })}
        </Table.Body>
    </Table>
)