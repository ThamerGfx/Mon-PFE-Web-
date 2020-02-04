import React, {Component} from 'react';
import { 
    Button, 
    TextField, 
    Icon, 
    Typography
} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { connect } from 'react-redux';
import {
    addProduit, 
    getAllProduits, 
    updateProduit
} from '../../store/actions/produitActions/produit.action'
import {signOut} from '../../store/actions/authActions/signOut.actions'
 
class FormulaireProduit extends Component {

    state = {
        id: '',
        nom_prod: '',
        marque_prod: '',
        axe_prod: ''
    }; 

    componentDidMount()
    {
        this.updateProduitState();
        console.log('je trouve', this.props.produitItem)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {

        const params = this.props.match.params;
        const {produitId} = params;

        if ( produitId === 'edit')
        { const {produitItem} = this.props
        this.setState({
            id: produitId,
            nom_prod: produitItem.nom_prod,
            marque_prod: produitItem.marque_prod,
            axe_prod: produitItem.axe_prod
        })
        } 
    }

    updateProduitState = () => {
        const params = this.props.match.params;
        const {produitId} = params;

        if ( produitId === 'produit' )
        {  
            this.setState({
                id: '',
                nom_prod: '',
                marque_prod: '',
                axe_prod: ''
            })
        } 
        else 
        {   const {produitItem} = this.props
            this.setState({
                id: produitId,
                nom_prod: produitItem.nom_prod,
                marque_prod: produitItem.marque_prod,
                axe_prod: produitItem.axe_prod
            })
        }
    }

    handleSaveProduit = () => {
       this.props.addProduit(this.state)
       this.setState({
            id: '',
            nom_prod: '',
            marque_prod: '',
            axe_prod: ''
       })
    }

    handleUpdateProduit = () =>{
        this.props.updateProduit(this.state)
        this.setState({
            id: '',
            nom_prod: '',
            marque_prod: '',
            axe_prod: ''
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/produits">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Produits
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.nom_prod ? this.state.nom_prod : 'Nouveau Produit'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Produit Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>

                            <div>
                            
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.produitId === 'produit' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSaveProduit }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleUpdateProduit }
                                        component={Link} to={'/produits'}
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
                            this.props.match.params.produitId === 'produit' ? (
                                <h4> Nouveau Produit </h4>
                                    ) : (
                                    <h4> Produit details </h4>
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
                                        value={this.state.nom_prod}
                                        id="nom_prod"
                                        label="Nom"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="nom_prod"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="marque_prod"
                                        name="marque_prod"
                                        onChange={this.handleChange}
                                        label="Marque"
                                        type="text"
                                        value={this.state.marque_prod}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="axe_prod"
                                        name="axe_prod"
                                        onChange={this.handleChange}
                                        label="Axe"
                                        type="text"
                                        value={this.state.axe_prod}
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
        allProduits: state.produitReducer.allProduits,
        produits: state.firestore.ordered.produits,
        produitItem: state.réseauReducer.produitItem,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, {addProduit, getAllProduits, updateProduit, signOut})(FormulaireProduit);