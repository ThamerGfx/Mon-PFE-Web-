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
    addMarque, 
    getAllMarques, 
    updateMarque
} from '../../store/actions/marqueActions/marque.action'
import {signOut} from '../../store/actions/authActions/signOut.actions'
 
class FormulaireMarque extends Component {

    state = {
        id: '',
        nom_marque:''
    }; 

    componentDidMount()
    {
        this.updateMarqueState();
        console.log('je trouve', this.props.marqueItem)
    }

    componentDidUpdate()
    {

        const params = this.props.match.params;
        const {marqueId} = params;

        if ( marqueId === 'edit')
        { const {marqueItem} = this.props
        this.setState({
            id: marqueId,
            nom_marque: marqueItem.nom_marque
        })
        } 
    }

    updateMarqueState = () => {
        const params = this.props.match.params;
        const {marqueId} = params;

        if ( marqueId === 'marque' )
        {  
            this.setState({
                id: '',
                nom_marque:''
            })
        } 
        else 
        {   const {marqueItem} = this.props
            this.setState({
                id: marqueId,
                nom_marque: marqueItem.nom_marque,
            }) 
        }
    }

    handleSaveMarque = () => {
       this.props.addMarque(this.state)
       this.setState({
        id: '',
        nom_marque:''
       })
    }

    handleUpdateMarque = () =>{
        this.props.updateMarque(this.state)
        this.setState({
            id: '',
            nom_marque:''
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/marques">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Marques
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.nom_marque ? this.state.nom_marque : 'Nouvelle Marque'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Marque Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>
                            <div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.marqueId === 'marque' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSaveMarque }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleUpdateMarque }
                                        component={Link} to={'/marques'}
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
                            this.props.match.params.marqueId === 'marque' ? (
                                <h4> Nouvelle Marque </h4>
                                    ) : (
                                    <h4> Marque details </h4>
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
                                        value={this.state.nom_marque}
                                        id="nom_marque"
                                        label="Nom"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="nom_marque"
                                        fullWidth
                                        required
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
        allMarques: state.marqueReducer.allMarques,
        magains: state.firestore.ordered.magains,
        marqueItem: state.marqueReducer.marqueItem,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, {addMarque, getAllMarques, updateMarque, signOut})(FormulaireMarque);