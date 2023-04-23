import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { Header } from "./Header"
import blogData from './BlogData';

export const BlogList = (props) => {

    // The amount of blogs to display
    const renderAmount = props.amount;
    // Display view all button
    const displayViewAll = props.viewall;

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
                    {blogData.slice(0, renderAmount).map((blog) => (
                        <Table.Row>
                            <Table.Cell><a className='blogListTitle' href={`/viewpost/${blog.id}`}>{blog.title}</a></Table.Cell>
                            <Table.Cell>{blog.date}</Table.Cell>
                            <Table.Cell>{blog.id}</Table.Cell>
                            <Table.Cell><a href='/'><Icon name='edit'></Icon></a></Table.Cell>
                            <Table.Cell><a href='/'><Icon name='ban'></Icon></a></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table>
            {displayViewAll && (
                <span style={{ justifyContent: 'center', display: 'flex' }}>
                    <Button href='/allposts'>View All</Button>
                </span>
            )}

        </div>
    )
}