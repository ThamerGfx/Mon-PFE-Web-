import React, {Component} from 'react';
import { AppBar, CardContent, Icon, Toolbar, Typography, Fab, Chip, Card} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import {FuseAnimateGroup} from '@fuse';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { 
    getAllInformationsSuccess, 
    getAllInformations, 
    removeInformation, 
    EditInformationItem,
    openEditInformation,
    openNewInformation
} from '../../../store/actions/infosActions/infos.action'

class AboutTab extends Component {

    state = {
        color: 'default',
        onDelete: 'default',
        avatar: 'none',
        icon: 'none',
        variant: 'default',
        size: 'medium',
    };

    handleClickInfos = (information) => {
        console.log(information)
        this.props.EditInformationItem(information)
    }

    render()
    {    
        const informations= this.props.informations || []
        const auth = this.props.auth
        return (
            <div className="md:flex max-w-2xl">

                <div className="flex flex-col flex-1 md:pr-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                            <Card className="w-full mb-16" style={{backgroundColor: "#e0e0e0"}}>
                                <AppBar position="static" elevation={2} style={{backgroundColor: "#e0e0e0"}}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="primary" className="flex-1">
                                            <b><h1>Informations</h1></b>
                                        </Typography>
                                        <Fab color="primary">      
                                            <Icon 
                                                aria-label="add"
                                                component={Link} to={'/forminfos/ajouter'}
                                            >
                                                add
                                            </Icon>
                                        </Fab>
                                    </Toolbar>
                                </AppBar>
                                {
                                    informations.map(item => {
                                        if(auth.email === item.email) {
                                                    return (      
                                        <Card className="w-full mb-16">                          
                                    <AppBar position="static" elevation={0} style={{backgroundColor: "#124164"}}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            Informations Personnelles
                                        </Typography>
                                        
                                        <Fab>   
                                                <Icon 
                                                    aria-label="create"
                                                    onClick = { () => {
                                                        this.handleClickInfos(item)
                                                    } }
                                                    component={Link} to={'/forminfos/' + item.id + '/' + item.nom}
                                                >
                                                    create
                                                </Icon>
                                        </Fab>
                                    </Toolbar>
                                </AppBar>
                                        <CardContent style={{height: '220px'}}>

                                            <div className="mb-24">
                                                <Typography className="font-bold mb-4 text-15">Nom</Typography>
                                                <Typography>{item.nom}</Typography>
                                            </div>

                                            <div className="mb-24">
                                                <Typography className="font-bold mb-4 text-15">Prénom</Typography>
                                                <Typography>{item.prénom}</Typography>
                                            </div>
                                            
                                            <div className="mb-24">
                                                <Typography className="font-bold mb-4 text-15">Description</Typography>
                                                <Typography>{item.desc}</Typography>
                                            </div>

                                        </CardContent>

                                    <AppBar position="static" elevation={0}  style={{backgroundColor: "#124164"}}>
                                        <Toolbar className="pl-16 pr-8">
                                            <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                Contact
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                            <CardContent style={{height: '220px'}}>

                                                <div className="mb-24">
                                                    <Typography className="font-bold mb-4 text-15">Adresse</Typography>
                                                    <div className="flex items-center">
                                                        <Typography>{item.adresse}</Typography>
                                                        <Icon className="text-16 ml-4" color="action">location_on</Icon>
                                                    </div>
                                                </div>

                                                <div className="mb-24">
                                                    <Typography className="font-bold mb-4 text-15">Tel.</Typography>
                                                    <div className="flex items-center">
                                                        <Typography>{item.tel}</Typography>
                                                        <Icon className="text-16 ml-4" color="action">phone</Icon>
                                                    </div>
                                                </div>

                                                <div className="mb-24">
                                                    <Typography className="font-bold mb-4 text-15">Email</Typography>
                                                    <div className="flex items-center">
                                                        <Typography>{item.email}</Typography>
                                                        <Icon className="text-16 ml-4" color="action">email</Icon>
                                                    </div>
                                                    <Chip deleteIcon={<DoneIcon />} >aaa</Chip>
                                                </div>

                                            </CardContent>
                                        </Card>       
                                        );
                                        }
                                    })
                                }
                 
                            </Card>
                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allInformations: state.infoReducer.allInformations,
        informations: state.firestore.ordered.informations,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,
        { 
            getAllInformationsSuccess, 
            getAllInformations, 
            removeInformation, 
            EditInformationItem,
            openEditInformation,
            openNewInformation
        }
    ),firestoreConnect([
      { collection: 'informations'},
    ]))(AboutTab);