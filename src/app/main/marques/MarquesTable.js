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
import {Link} from 'react-router-dom';
import MarquesTableHead from './MarquesTableHead';
import { 
    getAllMarquesSuccess, 
    getAllMarques, 
    removeMarque, 
    EditMarqueItem,
    OpenRemoveMarque
} from '../../store/actions/marqueActions/marque.action'


class MarquesTable extends Component {

    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        searchText     : ''
    };

    componentDidMount()
    {
        this.props.getAllMarques();
    }

    handleClick = (marque) => {
        console.log(marque)
        this.props.EditMarqueItem(marque)
    }
    
    chatsMoreMenuClose = () => {
        this.setState({chatsMoreMenuEl: null});
    };

    chatsMoreMenuClick = (event) => {
        this.setState({chatsMoreMenuEl: event.currentTarget});
    };

    render()
    {
        const { chatsMoreMenuEl } = this.state;
        const marques= this.props.marques || []

        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table>
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <MarquesTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400}>
                            <TableBody>
                                {
                                    marques.map(item => {
                                        return (
                                            
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.nom_marque}
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
                                                                            this.props.removeMarque(item.id)
                                                                        } } 
                                                                    />          
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.removeMarque(item.id)
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
                                                                        component={Link} to={'/formmarque/' + item.id + '/' + item.nom_marque}
                                                                        />    
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formmarque/' + item.id + '/' + item.nom_marque}
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
                                    })
                                }

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
        allMarques: state.marqueReducer.allMarques,
        marques: state.firestore.ordered.marques,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,{getAllMarques, getAllMarquesSuccess, removeMarque, EditMarqueItem, OpenRemoveMarque}),
    firestoreConnect([
      { collection: 'marques'},
    ]))(MarquesTable);
