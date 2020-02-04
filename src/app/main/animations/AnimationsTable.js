import React, {Component} from 'react';
import {
    Icon, 
    Table, 
    TableBody, 
    TableCell, 
    TableRow, 
    IconButton,
    MenuItem,
    Menu ,
    ListItemText
} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import Dropdown from 'react-dropdown'
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';
import {Link,Redirect} from 'react-router-dom';
import AnimationsTableHead from './AnimationsTableHead';
import { 
    getAllAnimationsSuccess, 
    getAllAnimations, 
    removeAnimation, 
    EditAnimationItem,
    OpenRemoveAnimation
} from '../../store/actions/animationActions/animation.action'


class AnimationsTable extends Component {

    
    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        searchText     : '',
        nom_prod: ''
    };

    componentDidMount()
    {
        this.props.getAllAnimations();
    }

    handleClick = (animation) => {
        console.log(animation)
        this.props.EditAnimationItem(animation)
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
        const animations= this.props.animations || []
        const {auth} = this.props

        if (!auth) return <Redirect to='/login' />
        return (
            <div className="w-full flex flex-col" delay={1000}>
                <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                    <Table>
                        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
                            <AnimationsTableHead/>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.whirlIn" delay={400}>
                            <TableBody>
                                {
                                    animations.map(item => {
                                        return (
                                            
                                                <TableRow className="h-64" hover>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.name}
                                                    </TableCell>

                                                    <TableCell className="truncate" component="th" scope="row" align="left">
                                                        {item.description}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.lieu}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                        {item.typeanim}
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" align="left">
                                                    <Dropdown
                                                            placeholder='Cliquez ici pour voir les produits'
                                                            fluid
                                                            search
                                                            selection
                                                            multiple
                                                            options=
                                                                {
                                                                    animations.map((item, x) => {
                                                                        return (
                                                                            <option key={item.id}>
                                                                                {item.nom_prod.produits[x]}
                                                                            </option>
                                                                            
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
                                                                        onClick = { () => { 
                                                                            this.props.removeAnimation(item.id)
                                                                            } 
                                                                        } 
                                                                        primary="Supprimer"/>              
                                                                    <Icon   
                                                                        onClick = { () => { 
                                                                            this.props.removeAnimation(item.id)
                                                                            } 
                                                                        } 
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
                                                                        component={Link} to={'/form/' + item.id + '/' + item.name}
                                                                        />       
                                                                    <Icon 
                                                                        onClick = { () => { this.handleClick(item) } } 
                                                                        className="text-blue text-20"
                                                                        component={Link} to={'/form/' + item.id + '/' + item.name}
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
        allAnimations: state.myReducer.allAnimations,
        animations: state.firestore.ordered.animations,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,{getAllAnimations, getAllAnimationsSuccess, removeAnimation, EditAnimationItem, OpenRemoveAnimation}),
    firestoreConnect([
      { collection: 'animations'},
    ]))(AnimationsTable);