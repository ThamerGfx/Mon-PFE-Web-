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
import ProduitsTableHead from './ProduitsTableHead';
import { 
    getAllProduitsSuccess, 
    getAllProduits, 
    removeProduit, 
    EditProduitItem,
    OpenRemoveProduit
} from '../../store/actions/produitActions/produit.action'


class ProduitsTable extends Component {
    
    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        searchText     : ''
    };

    componentDidMount()
    {
        this.props.getAllProduits();
    }

    handleClick = (produit) => {
        console.log(produit)
        this.props.EditProduitItem(produit)
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
        const produits= this.props.produits || []

        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table>
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <ProduitsTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400}>
                            <TableBody>
                                {produits.map(item => {
                                        return (
                                            
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.nom_prod}
                                                    </TableCell>

                                                    <TableCell className="truncate" component="th" scope="row" align="left">
                                                        {item.marque_prod}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.axe_prod}
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
                                                                            this.props.removeProduit(item.id)
                                                                        } }
                                                                    />          
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.removeProduit(item.id)
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
                                                                        component={Link} to={'/formproduit/' + item.id + '/' + item.nom_prod}
                                                                    />       
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/formproduit/' + item.id + '/' + item.nom_prod}
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
        allProduits: state.produitReducer.allProduits,
        produits: state.firestore.ordered.produits,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,{getAllProduits, getAllProduitsSuccess, removeProduit, EditProduitItem, OpenRemoveProduit}),
    firestoreConnect([
      { collection: 'produits'},
    ]))(ProduitsTable);
