import React, {Component} from 'react';
import { 
    Button, 
    TextField, 
    Icon, 
    Typography,
    Tab, 
    Tabs
} from '@material-ui/core';
import {FuseAnimate, FusePageCarded,FuseChipSelect} from '@fuse';
import { Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import _ from '@lodash';
import { connect } from 'react-redux';
import { compose} from 'redux';
import {
    addAnimation, 
    getAllAnimations, 
    updateAnimation
} from '../../store/actions/animationActions/animation.action'
import {getAllProduits, getAllProduitsSuccess} from '../../store/actions/produitActions/produit.action'
import {logoutUser} from '../../auth/store/actions/user.actions'
 
class FormulaireAnimation extends Component {

    state = {
        id: '',
        name: '',
        description: '',
        typeanim: '',
        lieu: '',
        produits: '',
        nom_prod: '',
        longitude: '',
        latitude: '',
        value: 0
    }; 

    componentDidMount()
    {
        this.updateAnimationState();
        console.log('je trouve', this.props.animationItem)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {

        const params = this.props.match.params;
        const {animationId} = params;

        if ( animationId === 'edit')
        { const {animationItem} = this.props
        this.setState({
            id: animationId,
            name: animationItem.name,
            description: animationItem.description,
            typeanim: animationItem.typeanim,
            lieu: animationItem.lieu,
            produits: animationItem.produits,
            longitude: animationItem.longitude,
            latitude: animationItem.latitude
        })
        } 
    }

    updateAnimationState = () => {
        const params = this.props.match.params;
        const {animationId} = params;

        if ( animationId === 'animation' )
        {  
            this.setState({
            id:'',
            name: '',
            description: '',
            typeanim: '',
            lieu: '',
            produits: '',
            longitude: '',
            latitude: ''
            })
        } 
        else 
        {   const {animationItem} = this.props
            this.setState({
                id: animationId,
                name: animationItem.name,
                description: animationItem.description,
                typeanim: animationItem.typeanim,
                lieu: animationItem.lieu,
                produits: animationItem.produits,
                longitude: animationItem.longitude,
                latitude: animationItem.latitude
            }) 
        }
    }

    handleSaveAnimation = () => {
       this.props.addAnimation(this.state)
       this.setState({
            name: '',
            description: '',
            typeanim: '',
            lieu: '',
            produits: '',
            longitude: '',
            latitude: ''
       })
    }

    handleUpdateAnimation = () =>{
        this.props.updateAnimation(this.state)
        this.setState({
            name: '',
            description: '',
            typeanim: '',
            lieu: '',
            produits: '',
            longitude: '',
            latitude: ''
       })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }
    handleSignOut = () => {
        this.props.logoutUser()
    }

    handleChipChangeProduits = (value, name) => {
        this.setState({nom_prod: _.set({...this.state.nom_prod}, name, value.map(item => item.value))});
    };  

    render()
    {   
        const { auth } = this.props;
        const { value } = this.state

        let produits = this.props.produits || []

        const optionItemsProduits = 
            produits.map((produit) => {
                console.log(produit.nom_prod);
                return produit.nom_prod
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/animations">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Animations
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.name ? this.state.name : 'New Animation'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Animation Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>
                            <div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.animationId === 'animation' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSaveAnimation }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleUpdateAnimation }
                                        component={Link} to={'/animations'}
                                    >
                                    Update
                                    </Button>
                                )                               
                            }
                            </FuseAnimate>
                            </div>
                        </div>
                }
                contentToolbar = {
                    <div className="px-24"> 
                        <FuseAnimate animation="transition.perspectiveUpIn" delay={500}>
                            {
                                this.props.match.params.animationId === 'animation' ? (
                                    <h4 component={Link} to={'/animations'}> Nouvelle Animation </h4>
                                        ) : (
                                        <h4 component={Link} to={'/animations'}> Animation details </h4>
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
                                        value={this.state.name}
                                        id="name"
                                        label="Name"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="name"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="description"
                                        name="description"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={this.state.description}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="lieu"
                                        name="lieu"
                                        onChange={this.handleChange}
                                        label="Lieu"
                                        type="text"
                                        value={this.state.lieu}
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
                                <FuseAnimate animation="transition.bounceUpIn" delay={600}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="typeanim"
                                        name="typeanim"
                                        onChange={this.handleChange}
                                        label="Type"
                                        type="text"
                                        value={this.state.typeanim}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>

                                            <FuseChipSelect
                                                className="mt-8 mb-24"
                                                onChange={(value) => this.handleChipChangeProduits(value, 'produits')}
                                                placeholder="Choisissez les produits"
                                                textFieldProps={{
                                                    label          : 'produits',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant        : 'outlined'
                                                }}
                                                options = {optionItemsProduits}
                                                isMulti
                                            />
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
        allAnimations: state.myReducer.allAnimations,
        animations: state.firestore.ordered.animations,
        animationItem: state.myReducer.animationItem,
        allProduits: state.produitReducer.allProduits,
        produits: state.firestore.ordered.produits,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps, 
        {
            getAllProduits, getAllProduitsSuccess,
            addAnimation, 
            getAllAnimations, 
            updateAnimation, 
            logoutUser
        }),firestoreConnect([
        { collection: 'produits'},
    ])
    )(FormulaireAnimation);