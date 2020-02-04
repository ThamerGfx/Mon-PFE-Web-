import React, {Component} from 'react';
import {AppBar, Card, CardContent, Icon, Toolbar, Typography, Fab} from '@material-ui/core';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { 
    getAllFormationsSuccess, 
    getAllFormations, 
    removeFormation, 
    EditFormationItem,
    openEditFormation,
    openNewFormation
} from '../../../store/actions/formationActions/formation.action'


class ListeFormations extends Component {


    componentDidMount()
    {
        this.props.getAllFormations();
    }

    handleClick = (formation) => {
        console.log(formation)
        this.props.EditFormationItem(formation)
    }

    render()
    {
        const formations= this.props.formations || []
        const auth = this.props.auth
        return (
            <div className="md:flex max-w-2xl">
            
                <div>
                    <Card>
                        <FuseAnimate animation="transition.expandIn" delay={600}>
                            <Fab color="red" aria-label="add">
                                <Icon
                                    component={Link} role="button" to="/formformation/formation"
                                >
                                    add
                                </Icon>
                            </Fab>
                        </FuseAnimate>
                    </Card>
                </div>
                <div className="flex flex-col flex-1 md:pr-32">

                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                    {
                        formations.map(item => {
                            if(auth.uid === item.authorId) {
                                        return (
                                            <Card className="w-full mb-16">
                                                <AppBar position="static" elevation={0} style={{backgroundColor: "#124164"}}>
                                                    <Toolbar className="pl-16 pr-8">
                                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                            {item.titre}
                                                        </Typography>
                                                            <Icon 
                                                                aria-label="create"
                                                                color="secondary"
                                                                onClick = { () => {
                                                                    this.handleClick(item)
                                                                    } }
                                                                    component={Link} to={'/formformation/' + item.id + '/' + item.titre}
                                                            >
                                                                create
                                                            </Icon>
                                                            <Icon 
                                                                aria-label="delete"
                                                                onClick = { () => { 
                                                                    this.props.removeFormation(item.id)
                                                                } } 
                                                            >
                                                                delete
                                                            </Icon>
                                                    </Toolbar>
                                                </AppBar>
                                                <CardContent>

                                                    <div className="mb-24">
                                                        <Typography className="font-bold mb-4 text-15">Date</Typography>
                                                        <Typography>{item.date}</Typography>
                                                    </div>

                                                    <div className="mb-24">
                                                        <Typography className="font-bold mb-4 text-15">Client</Typography>
                                                        <Typography>{item.client}</Typography>
                                                    </div>
                                                    
                                                    <div className="mb-24">
                                                        <Typography className="font-bold mb-4 text-15">Durée</Typography>
                                                        <Typography>{item.durée}</Typography>
                                                    </div>

                                                    </CardContent>
                                                </Card>
                                        );
                            }
                        })
                    }
                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allFormations: state.formationReducer.allFormations,
        formations: state.firestore.ordered.formations,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,
        { 
            getAllFormations, 
            getAllFormationsSuccess, 
            removeFormation, 
            EditFormationItem, 
            openEditFormation, 
            openNewFormation
        }
    ),firestoreConnect([
      { collection: 'formations'},
    ])
)(ListeFormations);