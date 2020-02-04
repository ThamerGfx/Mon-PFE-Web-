import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
    getAllRéseauxSuccess, 
    getAllRéseaux,
    EditRéseauItem
} from '../../store/actions/réseauActions/réseau.action'
import { 
    AppBar, 
    Card, 
    Icon,
    Toolbar, 
    Fab,
} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import {Link} from 'react-router-dom';


export class MapRéseaux extends Component {

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
      
    const réseaux= this.props.réseaux || []

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
                                                component={Link} to="/réseaux"
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
                            réseaux.map(item => {
                                return (
                                    <Marker 
                                        position={{lat:item.latitude, lng: item.longitude}}
                                        icon ="https://i.ibb.co/FBzgXnx/wifi-icon-logo-Px-Z4-Aw0-600.png"
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
    console.log(state)
    return {        
        allRéseaux: state.réseauReducer.allRéseaux,
        réseaux: state.firestore.ordered.réseaux,
        auth: state.firebase.auth,
    }
}
 
export default compose(
    connect(mapStateToProps,{getAllRéseaux, getAllRéseauxSuccess, EditRéseauItem}),
    firestoreConnect([
      { collection: 'réseaux'},
    ]),
    GoogleApiWrapper({
  apiKey: ("AIzaSyDZt_9RcYvqfLVpUptCOK3ju_iFlnSv8IE")
    })) (MapRéseaux)