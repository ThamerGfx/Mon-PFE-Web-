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
    addAnimateur,
    getAllAnimateurs,
    updateAnimateur
} from '../../store/actions/animateurActions/animateur.action';
import {signOut} from '../../store/actions/authActions/signOut.actions'
 
class FormulaireAnimateur extends Component {

    state = {
        id: '',
        prénom: '',
        nom: '',
        email: '',
        téléphone: '',
        qualification: '',
        animation: ''
    }; 

    componentDidMount()
    {
        this.updateAnimateurState();
        console.log('je trouve', this.props.animateurItem)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {

        const params = this.props.match.params;
        const {animateurId} = params;

        if ( animateurId === 'edit')
        { const {animateurItem} = this.props
        this.setState({
            id: animateurId,
            prénom: animateurItem.prénom,
            nom: animateurItem.nom,
            email: animateurItem.email,
            téléphone: animateurItem.téléphone,
            qualification: animateurItem.qualification,
            animation: animateurItem.animation
        })
        } 
    }

    updateAnimateurState = () => {
        const params = this.props.match.params;
        const {animateurId} = params;

        if ( animateurId === 'animateur' )
        {  
            this.setState({
                id: '',
                prénom: '',
                nom: '',
                email: '',
                téléphone: '',
                qualification: '',
                animation: ''
           })
        } 
        else 
        {   const {animateurItem} = this.props
            this.setState({
                id: animateurId,
                prénom: animateurItem.prénom,
                nom: animateurItem.nom,
                email: animateurItem.email,
                téléphone: animateurItem.téléphone,
                qualification: animateurItem.qualification,
                animation: animateurItem.animation
            })
        }
    }

    handleSaveAnimateur = () => {
       this.props.addAnimateur(this.state)
       this.setState({
        id: '',
        prénom: '',
        nom: '',
        email: '',
        téléphone: '',
        qualification: '',
        animation: ''
       })
    }

    handleUpdateAnimateur = () =>{
        this.props.updateAnimateur(this.state)
        this.setState({
            id: '',
            prénom: '',
            nom: '',
            email: '',
            téléphone: '',
            qualification: '',
            animation: ''
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
        console.log(auth)
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/animateurs">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Animateurs
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.prénom ? this.state.prénom : 'New Animateur'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Animateur Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>
                            <div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.animateurId === 'animateur' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick = { this.handleSaveAnimateur }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick = { this.handleUpdateAnimateur }
                                        component={Link} to={'/animateurs'}
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
                            this.props.match.params.animationId === 'new' ? (
                                <h4> Nouvelle Animateur </h4>
                                    ) : (
                                    <h4> Animateur details </h4>
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
                                        value={this.state.prénom}
                                        id="prénom"
                                        label="Prénom"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="prénom"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="nom"
                                        name="nom"
                                        onChange={this.handleChange}
                                        label="Nom"
                                        type="text"
                                        value={this.state.nom}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="email"
                                        name="email"
                                        onChange={this.handleChange}
                                        label="Email"
                                        type="text"
                                        value={this.state.email}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={600}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="téléphone"
                                        name="téléphone"
                                        onChange={this.handleChange}
                                        label="Téléphone"
                                        type="text"
                                        value={this.state.téléphone}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={400}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="qualification"
                                        name="qualification"
                                        onChange={this.handleChange}
                                        label="Qualification"
                                        type="text"
                                        value={this.state.qualification}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={400}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="animation"
                                        name="animation"
                                        onChange={this.handleChange}
                                        label="Animation"
                                        type="text"
                                        value={this.state.animation}
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
        allAnimateurs: state.animateurReducer.allAnimateurs,
        animateurs: state.firestore.ordered.animateurs,
        animateurItem: state.animateurReducer.animateurItem,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, {addAnimateur, getAllAnimateurs, updateAnimateur, signOut})(FormulaireAnimateur);