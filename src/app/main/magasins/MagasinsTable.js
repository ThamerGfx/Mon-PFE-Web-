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
import Dropdown from 'react-dropdown'
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import MagasinsTableHead from './MagasinsTableHead';
import { 
    getAllMagasinsSuccess, 
    getAllMagasins, 
    removeMagasin, 
    EditMagasinItem,
    OpenRemoveMagasin
} from '../../store/actions/magasinActions/magasin.action'


class MagasinsTable extends Component {

    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        marque_mag: '',
        réseau_mag: '',
        searchText     : ''
    };

    componentDidMount()
    {
        this.props.getAllMagasins();
    }

    handleClick = (magasin) => {
        console.log(magasin)
        this.props.EditMagasinItem(magasin)
    }
    
    chatsMoreMenuClose = () => {
        this.setState({chatsMoreMenuEl: null});
    };

    chatsMoreMenuClick = (event) => {
        this.setState({chatsMoreMenuEl: event.currentTarget});
    };

    handleChipChangeMarques = (value, name) => {
        this.setState({marque_mag: _.set({...this.state.marque_mag}, name, value.map(item => item.value))});
    };    

    render()
    {
        const { chatsMoreMenuEl } = this.state;
        const magasins= this.props.magasins || []

        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table>
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <MagasinsTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400}>
                            <TableBody>
                                {
                                    magasins.map(item => {
                                        return (
                                            
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.nom_mag}
                                                    </TableCell>

                                                    <TableCell className="truncate" component="th" scope="row" align="left">
                                                        {item.adresse_mag}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                    <Dropdown
                                                            placeholder='Cliquez ici pour voir les réseaux'
                                                            fluid
                                                            search
                                                            selection
                                                            multiple
                                                            options=
                                                                {
                                                                    magasins.map((i) => {
                                                                        return (
                                                                            <option key={item.id}>
                                                                                {item.réseau_mag.réseaux[i]}
                                                                            </option>
                                                                            
                                                                        )
                                                                    })
                                                                }
                                                        />
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        <Dropdown
                                                            placeholder='Cliquez ici pour voir les marques'
                                                            fluid
                                                            search
                                                            selection
                                                            multiple
                                                            options=
                                                                {
                                                                    magasins.map((x) => {
                                                                        return (
                                                                            <div key={item.id}>
                                                                                {item.marque_mag.marques[x]}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                        />
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
                                                                            this.props.removeMagasin(item.id)
                                                                        } } 
                                                                    />          
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.removeMagasin(item.id)
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
                                                                        component={Link} to={'/formmagasin/' + item.id + '/' + item.nom_mag}
                                                                    /> 
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formmagasin/' + item.id + '/' + item.nom_mag}
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
        allMagasins: state.magasinReducer.allMagasins,
        magasins: state.firestore.ordered.magasins,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,{getAllMagasins, getAllMagasinsSuccess, removeMagasin, EditMagasinItem, OpenRemoveMagasin}),
    firestoreConnect([
      { collection: 'magasins'},
    ]))(MagasinsTable);
