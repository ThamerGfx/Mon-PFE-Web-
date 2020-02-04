import React, {Component} from 'react';
import {
    Icon, 
    Table, 
    TableBody, 
    TableCell, 
    TableRow, 
    IconButton,
    MenuItem,
    Menu,
    ListItemText 
} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';
import {Link,Redirect} from 'react-router-dom';
import ClientsTableHead from './ClientsTableHead';
import { 
    getAllClientsSuccess, 
    getAllClients, 
    removeClient, 
    EditClientItem,
    OpenRemoveClient
} from '../../store/actions/clientActions/client.action'


class ClientsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        page       : 0,
        rowsPerPage: 10,
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        searchText     : ''
    };

    componentDidMount()
    {
        this.props.getAllClients();
    }

    handleClick = (client) => {
        console.log(client)
        this.props.EditClientItem(client)
    }
    handleCheck = (id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };
    
    chatsMoreMenuClose = (event) => {
        this.setState({chatsMoreMenuEl: null});
    };

    chatsMoreMenuClick = (event) => {
        this.setState({chatsMoreMenuEl: event.currentTarget});
    };

    render()
    {
        const { chatsMoreMenuEl } = this.state;
        const clients= this.props.clients || []

        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table fullWidth className="min-w-xl" aria-labelledby="tableTitle">
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <ClientsTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400} className="flex-grow overflow-x-auto">
                            <TableBody>
                                {clients.map(item => {
                                    
                                        return (
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.nom_soc}
                                                    </TableCell>

                                                    <TableCell className="truncate" component="th" scope="row" align="left">
                                                        {item.adresse_soc}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.SIREN}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.contact_tel}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.contact_email}
                                                    </TableCell>

                                                    <TableCell>
                                                        <div>
                                                            <IconButton
                                                                aria-owns={chatsMoreMenuEl ? 'chats-more-menu' : null}
                                                                aria-haspopup="true"
                                                                onClick={this.chatsMoreMenuClick}
                                                            >
                                                                <Icon>more_vert</Icon>
                                                            </IconButton>
                                                            <Menu
                                                                id="chats-more-menu"
                                                                anchorEl={chatsMoreMenuEl}
                                                                open={Boolean(chatsMoreMenuEl)}
                                                                onClose={this.chatsMoreMenuClose}
                                                            >
                                                                <MenuItem onClick={this.chatsMoreMenuClose}>   
                                                                    <ListItemText 
                                                                        className="pl-0" 
                                                                        primary="Supprimer"
                                                                        onClick = { () => { 
                                                                            this.props.removeClient(item.id)
                                                                        } } 
                                                                    />            
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.removeClient(item.id)
                                                                        } } 
                                                                        className="text-red text-20"
                                                                        align="right"
                                                                    >
                                                                        remove_circle
                                                                    </Icon>
                                                                </MenuItem>
                                                                <MenuItem onClick={this.chatsMoreMenuClose}>   
                                                                    <ListItemText 
                                                                        className="pl-0" 
                                                                        primary="Modifier"
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        component={Link} to={'/formclient/' + item.id + '/' + item.nom_soc}
                                                                    />        
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formclient/' + item.id + '/' + item.nom_soc}
                                                                        align="right"
                                                                    >
                                                                        edit_circle
                                                                    </Icon>
                                                                </MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </TableCell>
                                                </TableRow> 
                                        );
                                    })}
                            </TableBody>
                        </FuseAnimate>
                    </Table>
                </FuseAnimate>                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {        
        allClients: state.clientReducer.allClients,
        clients: state.firestore.ordered.clients,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps,{getAllClients, getAllClientsSuccess, removeClient, EditClientItem, OpenRemoveClient}),
    firestoreConnect([
      { collection: 'clients'},
    ]))(ClientsTable);
