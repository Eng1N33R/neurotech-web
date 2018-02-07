import React from 'react';
import { Table } from 'semantic-ui-react';

class StatisticsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const events = [];
        this.props.data.slice(0).reverse().forEach((x, i) => {
            if (x.ratio >= this.props.settings.woozy && events.length < this.props.settings.limit) {
                events.push(<Table.Row key={i} className={x.ratio >= this.props.settings.sick ? 'sick' : 'woozy'}>
                    <Table.Cell>{x.time}</Table.Cell>
                    <Table.Cell>Обнаружено {x.abnormal} аномальных пакетов ({+(x.ratio * 100).toFixed(2)}% от общей нагрузки)</Table.Cell>
                </Table.Row>)
            }
        });

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Дата</Table.HeaderCell>
                        <Table.HeaderCell>События</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {events}
                </Table.Body>
            </Table>
        )
    }
}

export default StatisticsTable;