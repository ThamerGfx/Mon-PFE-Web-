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
    ListItemText, 
} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import AnimationsTableHead from './RéseauxTableHead';
import { 
    getAllRéseauxSuccess, 
    getAllRéseaux, 
    removeRéseau, 
    EditRéseauItem,
    OpenRemoveReseau
} from '../../store/actions/réseauActions/réseau.action'


class RéseauxTable extends Component {

    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
    };


    componentDidMount()
    {
        this.props.getAllRéseaux();
    }

    handleClick = (réseau) => {
        console.log(réseau)
        this.props.EditRéseauItem(réseau)
    }

    chatsMoreMenuClose = () => {
        this.setState({chatsMoreMenuEl: null});
    };

    chatsMoreMenuClick = (event) => {
        this.setState({chatsMoreMenuEl: event.currentTarget});
    };

    render()
    {
        const réseaux= this.props.réseaux || []
        const { chatsMoreMenuEl } = this.state;

        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table>
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <AnimationsTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400}>
                            <TableBody>
                                {réseaux.map(item => {
                                        return (
                                            
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.nom_res}
                                                    </TableCell>

                                                    <TableCell className="truncate" component="th" scope="row" align="left">
                                                        {item.adresse_res}
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

                                                    <TableCell><div>
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
                                                                            this.props.removeRéseau(item.id)
                                                                        } } 
                                                                    />         
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.removeRéseau(item.id)
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
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formreseau/' + item.id + '/' + item.nom_res}
                                                                    />   
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formreseau/' + item.id + '/' + item.nom_res}
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
        allRéseaux: state.réseauReducer.allRéseaux,
        réseaux: state.firestore.ordered.réseaux,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,{getAllRéseaux, getAllRéseauxSuccess, removeRéseau, EditRéseauItem, OpenRemoveReseau}),
    firestoreConnect([
      { collection: 'réseaux'},
    ]))(RéseauxTable);
