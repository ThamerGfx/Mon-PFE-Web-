import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
    getAllMagasinsSuccess, 
    getAllMagasins,
    EditMagasinItem
} from '../../store/actions/magasinActions/magasin.action'
import { 
    AppBar, 
    Card, 
    Icon,
    Toolbar, 
    Fab
} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import {Link} from 'react-router-dom';


export class MapMagasins extends Component {

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
      
    const magasins= this.props.magasins || []

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
                                                component={Link} to="/magasins"
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
                            magasins.map(item => {
                                return (
                                    <Marker 
                                        position={{lat:item.latitude, lng: item.longitude}}
                                        icon ="https://i.ibb.co/t42Gp96/shopping-cart.png"
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
        allMagasins: state.magasinReducer.allMagasins,
        magasins: state.firestore.ordered.magasins,
        auth: state.firebase.auth,
    }
}
 
export default compose(
    connect(mapStateToProps,{getAllMagasins, getAllMagasinsSuccess, EditMagasinItem}),
    firestoreConnect([
      { collection: 'magasins'},
    ]),
    GoogleApiWrapper({
  apiKey: ("AIzaSyDZt_9RcYvqfLVpUptCOK3ju_iFlnSv8IE")
    })) (MapMagasins)