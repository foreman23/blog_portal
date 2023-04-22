import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { Header } from "./Header"

export const BlogList = () => {
    return (
        // PLACEHOLDER TABLE
        <div>
            <Header></Header>
            <Table sortable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Netus et malesuada fames ac turpis egestas sed tempus.</Table.Cell>
                        <Table.Cell>April 4, 2023</Table.Cell>
                        <Table.Cell>9</Table.Cell>
                        <Table.Cell><a href='/'><Icon name='edit'></Icon></a></Table.Cell>
                        <Table.Cell><a href='/'><Icon name='ban'></Icon></a></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Netus et malesuada fames ac turpis egestas sed tempus.</Table.Cell>
                        <Table.Cell>March 27, 2023</Table.Cell>
                        <Table.Cell>8</Table.Cell>
                        <Table.Cell><a href='/'><Icon name='edit'></Icon></a></Table.Cell>
                        <Table.Cell><a href='/'><Icon name='ban'></Icon></a></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Netus et malesuada fames ac turpis egestas sed tempus.</Table.Cell>
                        <Table.Cell>March 16, 2023</Table.Cell>
                        <Table.Cell>7</Table.Cell>
                        <Table.Cell><a href='/'><Icon name='edit'></Icon></a></Table.Cell>
                        <Table.Cell><a href='/'><Icon name='ban'></Icon></a></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Netus et malesuada fames ac turpis egestas sed tempus.</Table.Cell>
                        <Table.Cell>March 9, 2023</Table.Cell>
                        <Table.Cell>6</Table.Cell>
                        <Table.Cell><a href='/'><Icon name='edit'></Icon></a></Table.Cell>
                        <Table.Cell><a href='/'><Icon name='ban'></Icon></a></Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
            <span style={{ justifyContent: 'center', display: 'flex' }}><Button>View All</Button></span>
        </div>
    )
}