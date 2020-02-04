import React, {Component, useState} from 'react';
import { 
    Button, 
    TextField, 
    Icon, 
    Typography
} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import _ from '@lodash';
import { connect } from 'react-redux';
import { compose} from 'redux';

import {
    addMagasin, 
    getAllMagasins, 
    updateMagasin
} from '../../store/actions/magasinActions/magasin.action'
import {
    getAllRéseaux, 
    getAllRéseauxSuccess
} from '../../store/actions/réseauActions/réseau.action'
import { 
    getAllMarquesSuccess, 
    getAllMarques
} from '../../store/actions/marqueActions/marque.action'
import {signOut} from '../../store/actions/authActions/signOut.actions'
 
class FormulaireMagasin extends Component {

    state = {
        id: '',
        nom_mag:'',
        adresse_mag: '',
        longitude: '',
        latitude: '',
        réseau_mag: '',
        marque_mag: '',
        userMenu: null,
    }; 

    componentDidMount()
    {
        this.updateMagasinState();
        this.props.getAllMagasins()
        this.props.getAllMarquesSuccess()
        console.log('je trouve', this.props.magasinItem)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {

        const params = this.props.match.params;
        const {magasinId} = params;

        if ( magasinId === 'edit')
        { const {magasinItem} = this.props
        this.setState({
            id: magasinId,
            nom_mag: magasinItem.nom_mag,
            adresse_mag: magasinItem.adresse_mag,
            longitude: magasinItem.longitude,
            latitude: magasinItem.latitude,
            réseau_mag: magasinItem.réseau_mag,
            marque_mag: magasinItem.marque_mag
        })
        } 
    }

    updateMagasinState = () => {
        const params = this.props.match.params;
        const {magasinId} = params;

        if ( magasinId === 'magasin' )
        {  
            this.setState({
                id: '',
                nom_mag: '',
                adresse_mag: '',
                réseau_mag: '',
                marque_mag: '',
                longitude: '',
                latitude: '',
            })
        } 
        else 
        {   const {magasinItem} = this.props
            this.setState({
                id: magasinId,
                nom_mag: magasinItem.nom_mag,
                adresse_mag: magasinItem.adresse_mag,
                longitude: magasinItem.longitude,
                latitude: magasinItem.latitude,
                réseau_mag: magasinItem.réseau_mag,
                marque_mag: magasinItem.marque_mag
            }) 
        }
    }

    handleSaveMagasin = () => {
       this.props.addMagasin(this.state)
       this.setState({
            id: '',
            nom_mag: '',
            adresse_mag: '',
            réseau_mag: '',
            marque_mag: '',
            longitude: '',
            latitude: '',
       })
    }

    handleUpdateMagasin = () =>{
        this.props.updateMagasin(this.state)
        this.setState({
            id: '',
            nom_mag: '',
            adresse_mag: '',
            réseau_mag: '',
            marque_mag: '',
            longitude: '',
            latitude: '',
       })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    addMarqueToListe = () => {
        this.setState({marquesliste : [...this.state.marquesliste, ""]})
    }
    handleChangeListe = (e, index) => {
        this.state.marquesliste[index] = e.target.value

        //set the changed state ...
        this.setState({marquesliste: this.state.marquesliste})
    }

    handleSignOut = () => {
        this.props.signOut()
    }

    handleChipChangeMarques = (value, name) => {
        this.setState({marque_mag: _.set({...this.state.marque_mag}, name, value.map(item => item.value))});
    };    
    handleChipChangeRéseaux = (value, name) => {
        this.setState({réseau_mag: _.set({...this.state.réseau_mag}, name, value.map(item => item.value))});
    };

    render()
    {   
        const réseaux= this.props.réseaux || []
        const optionItemsRéseaux = 
            réseaux.map((réseau) => {
                console.log(réseau.nom_res);
                return réseau.nom_res
            })
        .map((item) => ({
                 value: item,
                 label: item
            }))

        let marques = this.props.marques || []
        const optionItemsMarques = 
            marques.map((marque) => {
                console.log(marque.nom_marque);
                return marque.nom_marque
            })
            .map((item) => ({
                 value: item,
                 label: item
            }))

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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/magasins">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Magasins
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.nom_mag ? this.state.nom_mag : 'Nouveau Magasin'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Magasin Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>
                            <div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.magasinId === 'magasin' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSaveMagasin }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleUpdateMagasin }
                                        component={Link} to={'/magasins'}
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
                            this.props.match.params.magasinId === 'magasin' ? (
                                <h4> Nouveau Magasin </h4>
                                    ) : (
                                    <h4> Magasin details </h4>
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
                                        value={this.state.nom_mag}
                                        id="nom_mag"
                                        label="Nom"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="nom_mag"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="adresse_mag"
                                        name="adresse_mag"
                                        onChange={this.handleChange}
                                        label="Adresse"
                                        type="text"
                                        value={this.state.adresse_mag}
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
                                <FuseChipSelect
                                    className="mt-8 mb-24"
                                    onChange={(value) => this.handleChipChangeRéseaux(value, 'réseaux')}
                                    placeholder="Choisissez les réseaux"
                                    textFieldProps={{
                                        label          : 'Réseaux',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant        : 'outlined'
                                    }}
                                    options = {optionItemsRéseaux}
                                    isMulti
                                />
                                <FuseChipSelect
                                    className="mt-8 mb-24"
                                    onChange={(value) => this.handleChipChangeMarques(value, 'marques')}
                                    placeholder="Choisissez les marques"
                                    textFieldProps={{
                                        label          : 'Marques',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant        : 'outlined'
                                    }}
                                    options = {optionItemsMarques}
                                    isMulti
                                />
                                <div> 
                                </div>    
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
        allMagasins: state.magasinReducer.allMagasins,
        magains: state.firestore.ordered.magains,
        magasinItem: state.magasinReducer.magasinItem,
        allRéseaux: state.réseauReducer.allRéseaux,
        réseaux: state.firestore.ordered.réseaux,
        allMarques: state.marqueReducer.allMarques,
        marques: state.firestore.ordered.marques,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps,{
        getAllRéseaux, getAllRéseauxSuccess,
        getAllMarques, getAllMarquesSuccess, 
        addMagasin, getAllMagasins, updateMagasin, signOut}),
    firestoreConnect([
      { collection: 'réseaux'},
      { collection: 'marques'}
    ])
)(FormulaireMagasin)