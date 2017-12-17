import React from 'react';
import Crumb from 'components/Breadcrumb';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

import moment from 'moment';
moment.locale('ru-RU');

export default () => (
    <div className="stats">
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Дата</Table.HeaderCell>
                    <Table.HeaderCell>События</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {[...Array(10)].map((x, i) => {
                    let packets = Math.floor(Math.random() * (400 - 20) + 20);
                    return <Table.Row key={i} className={packets > 150 ? 'sick' : 'woozy'}>
                        <Table.Cell>{moment().subtract(Math.floor(Math.random() * (13 - 3) + 3) * i, 'hours').format('LLL')}</Table.Cell>
                        <Table.Cell>Обнаружено {packets} вредоносных пакетов за {Math.floor(Math.random() * (4 - 1) + 1)} минут</Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    </div>
);