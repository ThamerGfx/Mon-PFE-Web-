import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
    getAllClientsSuccess, 
    getAllClients,
    EditClientItem
} from '../../store/actions/clientActions/client.action'
import { 
    AppBar, 
    Card, 
    Icon,
    Toolbar, 
    Fab
} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import {Link} from 'react-router-dom';


export class MapClients extends Component {

    state ={
        isOpen: false
    }

    handleToggleOpen = () => {
        this.setState({
            isOpen: true
        })
    }
    handleToggleClose = () => {
        this.setState({
            isOpen: false
        })
    }
  render() {
      
    const clients= this.props.clients || []

    return (
        <div>
                        
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={2} style={{backgroundColor: "#124164"}}>
                                    <Toolbar className="pl-16 pr-8">
                                    <Fab color="primary">      
                                            <Icon 
                                                aria-label="arrow_back"
                                                component={Link} to="/clients"
                                            >
                                                arrow_back
                                            </Icon>
                                        </Fab>
                                    </Toolbar>
                                </AppBar>
                            </Card>
                    </FuseAnimateGroup>
                    <Map 
                        google={this.props.google} 
                        zoom={8}
                        initialCenter={{
                            lat: 48.864497,
                            lng: 2.347071
                        }}
                    >
                        {
                            clients.map(item => {
                                return (
                                    <Marker 
                                        position={{lat:item.latitude, lng: item.longitude}}
                                        icon ="https://i.ibb.co/gMsNH3x/forbidden.png"
                                    >
                                        {
                                            this.state.isOpen &&
                                                <InfoWindow
                                                        onCloseClick={() => this.handleToggleClose()}
                                                >
                                                    <span>Something</span>
                                                </InfoWindow>
                                        }
                                    </Marker>
                                )
                            })
                        }
                    </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        allClients: state.clientReducer.allClients,
        clients: state.firestore.ordered.clients,
        auth: state.firebase.auth
    }
}
 
export default compose(
    connect(mapStateToProps,{getAllClients, getAllClientsSuccess, EditClientItem}),
    firestoreConnect([
      { collection: 'clients'},
    ]),
    GoogleApiWrapper({
  apiKey: ("AIzaSyDZt_9RcYvqfLVpUptCOK3ju_iFlnSv8IE")
    })) (MapClients)