import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
    getAllAnimationsSuccess, 
    getAllAnimations,
    EditAnimationItem
} from '../../store/actions/animationActions/animation.action'
import { 
    AppBar, 
    Card, 
    Icon,
    Toolbar, 
    Fab, 
} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import {Link} from 'react-router-dom';


export class MapAnimations extends Component {

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
      
    const animations= this.props.animations || []

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
                                                component={Link} to="/animations"
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
                            animations.map(item => {
                                return (
                                    <Marker 
                                        position={{lat:item.latitude, lng: item.longitude}}
                                        icon ="https://i.ibb.co/61t9Wpv/3d-avatar-icono-05-vector-15-12586-copia-300x201.png"
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
        allAnimations: state.myReducer.allAnimations,
        animations: state.firestore.ordered.animations,
        auth: state.firebase.auth
    }
}
 
export default compose(
    connect(mapStateToProps,{getAllAnimations, getAllAnimationsSuccess, EditAnimationItem}),
    firestoreConnect([
      { collection: 'animations'},
    ]),
    GoogleApiWrapper({
  apiKey: ("AIzaSyDZt_9RcYvqfLVpUptCOK3ju_iFlnSv8IE")
    })) (MapAnimations)