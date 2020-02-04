import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import { 
    Button, 
    TextField, 
    Icon, 
    Typography,
    Tab, 
    Tabs
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {FuseAnimate, FusePageCarded} from '@fuse';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { connect } from 'react-redux';
import {
    addAnimateur,
    getAllAnimateurs,
    updateAnimateur
} from '../../store/actions/animateurActions/animateur.action';
 
class AffecterAnimateurs extends Component {

    state = {
        id: '',
        prénom: '',
        nom: '',
        email: '',
        téléphone: '',
        qualification: ''
    }; 

    // componentDidMount()
    // {
    //     this.updateAnimateurState();
    //     console.log('je trouve', this.props.animateurItem)
    // }

    // componentDidUpdate(prevProps, prevState, snapshot)
    // {

    //     const params = this.props.match.params;
    //     const {animateurId} = params;

    //     if ( animateurId === 'edit')
    //     { const {animateurItem} = this.props
    //     this.setState({
    //         id: animateurId,
    //         prénom: animateurItem.prénom,
    //         nom: animateurItem.nom,
    //         email: animateurItem.email,
    //         téléphone: animateurItem.téléphone,
    //         qualification: animateurItem.qualification
    //     })
    //     } 
    // }

    // updateAnimateurState = () => {
 
    //         this.setState({
    //             id: '',
    //             prénom: '',
    //             nom: '',
    //             email: '',
    //             téléphone: '',
    //             qualification: ''
    //        })
    // }

    // handleSaveAnimateur = () => {
    //    this.props.addAnimateur(this.state)
    //    this.setState({
    //         id: '',
    //         prénom: '',
    //         nom: '',
    //         email: '',
    //         téléphone: '',
    //         qualification: ''
    //    })
    // }

    // handleUpdateAnimateur = () =>{
    //     this.props.updateAnimateur(this.state)
    //     this.setState({
    //         id: '',
    //         prénom: '',
    //         nom: '',
    //         email: '',
    //         téléphone: '',
    //         qualification: ''
    //    })
    // }

    // handleChange = (e) => {
    //     this.setState({
    //       [e.target.id]: e.target.value
    //     })
    // }

    // handleSignOut = () => {
    //     this.props.signOut()
    // }
    
    render()
    {   
        const { auth } = this.props;
        console.log(auth)

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
                            </div>
                        </div>
                }
                contentToolbar={
                    <div className="px-24"> 
                        <FuseAnimate animation="transition.perspectiveUpIn" delay={500}>
                        Affecter Animateurs
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

export default connect(mapStateToProps, {addAnimateur, getAllAnimateurs, updateAnimateur})(AffecterAnimateurs);