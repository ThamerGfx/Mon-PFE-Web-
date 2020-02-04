import React, {Component} from 'react';
import {
    Icon, 
    Table, 
    TableBody, 
    TableCell, 
    TableRow, 
    Menu,
    IconButton,
    MenuItem ,
    ListItemText
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose} from 'redux';
import {FuseAnimate} from '@fuse';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import AnimateursTableHead from './AnimateursTableHead';
import { 
    getAllAnimateursSuccess, 
    getAllAnimateurs, 
    EditAnimateurItem,
    OpenRemoveAnimateur,
    removeAnimateur
} from '../../store/actions/animateurActions/animateur.action'


class AnimateursTable extends Component {
        
    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        searchText     : ''
    };

    componentDidMount()
    {
        this.props.getAllAnimateurs();
    }

    handleClick = (animateur) => {
        console.log(animateur)
        this.props.EditAnimateurItem(animateur)
    }

    chatsMoreMenuClose = (event) => {
        this.setState({chatsMoreMenuEl: null});
    };

    chatsMoreMenuClick = (event) => {
        this.setState({chatsMoreMenuEl: event.currentTarget});
    };

    render()
    {
        const { chatsMoreMenuEl } = this.state;
        const animateurs= this.props.animateurs || []

        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table fullWidth className="min-w-xl" aria-labelledby="tableTitle">
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <AnimateursTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400} className="flex-grow overflow-x-auto">
                            <TableBody>
                                { animateurs.map( (item) => {
                                    
                                        return (
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.prénom}
                                                    </TableCell>

                                                    <TableCell className="truncate" component="th" scope="row" align="left">
                                                        {item.nom}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.email}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.téléphone}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.qualification}
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
                                                                            this.props.OpenRemoveAnimateur(item.id)
                                                                            this.handleClick(item)
                                                                        } } 
                                                                    />           
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.OpenRemoveAnimateur(item.id)
                                                                            this.handleClick(item)
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
                                                                        component={Link} to={'/formulaire/' + item.id + '/' + item.prénom}
                                                                        />        
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formulaire/' + item.id + '/' + item.prénom}
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
        allAnimateurs: state.animateurReducer.allAnimateurs,
        animateurs: state.firestore.ordered.animateurs,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps,{removeAnimateur, getAllAnimateurs, getAllAnimateursSuccess, OpenRemoveAnimateur, EditAnimateurItem}),
    firestoreConnect([
      { collection: 'animateurs'},
    ]))(AnimateursTable);
