import React, {Component} from 'react';
import { 
    Button, 
    TextField, 
    Icon, 
    Typography
} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import { Link, Redirect } from 'react-router-dom';
import _ from '@lodash';
import { connect } from 'react-redux';
import {
    addRéseau, 
    getAllRéseaux, 
    updateRéseau
} from '../../store/actions/réseauActions/réseau.action'
import {signOut} from '../../store/actions/authActions/signOut.actions'
 
class FormulaireRéseau extends Component {

    state = {
        id: '',
        nom_res: '',
        adresse_res: '',
        longitude: '',
        latitude: '',
        SIREN: '',
        contact_tel: '',
        contact_email: ''
    }; 

    componentDidMount()
    {
        this.updateRéseauState();
        console.log('je trouve', this.props.réseauItem)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {

        const params = this.props.match.params;
        const {reseauId} = params;

        if ( reseauId === 'edit')
        { const {réseauItem} = this.props
        this.setState({
            id: reseauId,
            nom_res: réseauItem.nom_res,
            adresse_res: réseauItem.adresse_res,
            longitude: réseauItem.longitude,
            latitude: réseauItem.latitude,
            SIREN: réseauItem.SIREN,
            contact_tel: réseauItem.contact_tel,
            contact_email: réseauItem.contact_email
        })
        } 
    }

    updateRéseauState = () => {
        const params = this.props.match.params;
        const {reseauId} = params;

        if ( reseauId === 'réseau' )
        {  
            this.setState({
                id: '',
                nom_res: '',
                adresse_res: '',
                SIREN: '',
                contact_tel: '',
                contact_email: '',
                longitude: '',
                latitude: '',
            })
        } 
        else 
        {   const {réseauItem} = this.props
            this.setState({
                id: reseauId,
                nom_res: réseauItem.nom_res,
                adresse_res: réseauItem.adresse_res,
                longitude: réseauItem.longitude,
                latitude: réseauItem.latitude,
                SIREN: réseauItem.SIREN,
                contact_tel: réseauItem.contact_tel,
                contact_email: réseauItem.contact_email
            }) 
        }
    }

    handleSaveRéseau = () => {
       this.props.addRéseau(this.state)
       this.setState({
            id: '',
            nom_res: '',
            adresse_res: '',
            SIREN: '',
            contact_tel: '',
            contact_email: '',
            longitude: '',
            latitude: '',
       })
    }

    handleUpdateRéseau = () =>{
        this.props.updateRéseau(this.state)
        this.setState({
            id: '',
            nom_res: '',
            adresse_res: '',
            SIREN: '',
            contact_tel: '',
            contact_email: '',
            longitude: '',
            latitude: '',
       })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }
    handleSignOut = () => {
        this.props.signOut()
    }

    render()
    {   
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to = '/Login' /> 
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/réseaux">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Réseaux
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.nom_res ? this.state.nom_res : 'Nouveau Réseau'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Réseau Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>

                            <div>
                            
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.reseauId === 'réseau' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSaveRéseau }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleUpdateRéseau }
                                        component={Link} to={'/réseaux'}
                                    >
                                    Update
                                    </Button>
                                )                               
                            }
                            </FuseAnimate>
                            </div>
                        </div>
                }
                contentToolbar={
                    <div className="px-24"> 
                        <FuseAnimate animation="transition.perspectiveUpIn" delay={500}>
                        {
                            this.props.match.params.reseauId === 'réseau' ? (
                                <h4> Nouveau Réseau </h4>
                                    ) : (
                                    <h4> Réseau details </h4>
                                    )                               
                        }
                        </FuseAnimate>
                    </div>
                }
                content={
                        <div className="p-16 sm:p-24 max-w-2xl">
                            <form>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1200}>
                                    <TextField  
                                        value={this.state.nom_res}
                                        id="nom_res"
                                        label="Nom"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="nom_res"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="adresse_res"
                                        name="adresse_res"
                                        onChange={this.handleChange}
                                        label="Adresse"
                                        type="text"
                                        value={this.state.adresse_res}
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="longitude"
                                        name="longitude"
                                        onChange={this.handleChange}
                                        label="Longitude"
                                        type="text"
                                        value={this.state.longitude}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="latitude"
                                        name="latitude"
                                        onChange={this.handleChange}
                                        label="Latitude"
                                        type="text"
                                        value={this.state.latitude}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="SIREN"
                                        name="SIREN"
                                        onChange={this.handleChange}
                                        label="SIREN"
                                        type="text"
                                        value={this.state.SIREN}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={600}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="contact_tel"
                                        name="contact_tel"
                                        onChange={this.handleChange}
                                        label="Téléphone"
                                        type="text"
                                        value={this.state.contact_tel}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={400}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="contact_email"
                                        name="contact_email"
                                        onChange={this.handleChange}
                                        label="Email"
                                        type="text"
                                        value={this.state.contact_email}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                            
                            </form>
                        </div>
                }
                innerScroll
            />
        )
    };
}

const mapStateToProps = (state) => {
    console.log(state)
    return {        
        allRéseaux: state.réseauReducer.allRéseaux,
        réseaux: state.firestore.ordered.réseaux,
        réseauItem: state.réseauReducer.réseauItem,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, {addRéseau, getAllRéseaux, updateRéseau, signOut})(FormulaireRéseau);