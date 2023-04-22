import React from 'react'
import { Button, Search, Icon } from 'semantic-ui-react'

export const Header = () => {
  return (
    <div className='headerBar'>
        <span><Button href='/newpost' color='blue'><Icon name='add'></Icon>New Post</Button></span>
        <Search placeholder='Search...'></Search>
    </div>
  )
}
