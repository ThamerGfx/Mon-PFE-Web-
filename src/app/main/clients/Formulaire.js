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
    addClient,
    getAllClients,
    updateClient
} from '../../store/actions/clientActions/client.action';
import {signOut} from '../../store/actions/authActions/signOut.actions'
 
class FormulaireClient extends Component {

    state = {
        id: '',
        nom_soc: '',
        adresse_soc: '',
        longitude: '',
        latitude: '',
        SIREN: '',
        contact_tel: '',
        contact_email: ''
    }; 

    componentDidMount()
    {
        this.updateClientState();
        console.log('je trouve', this.props.clientItem)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const params = this.props.match.params;
        const {clientId} = params;

        if ( clientId === 'edit' )
        {   const {clientItem} = this.props
            this.setState({
                id: clientId,
                nom_soc: clientItem.nom_soc,
                adresse_soc: clientItem.adresse_soc,
                longitude: clientItem.longitude,
                latitude: clientItem.latitude,
                SIREN: clientItem.SIREN,
                contact_tel: clientItem.contact_tel,
                contact_email: clientItem.contact_email
            })
        }
    }

    updateClientState = () => {
        const params = this.props.match.params;
        const {clientId} = params;

        if ( clientId === 'client' )
        {  
            this.setState({
                nom_soc: '',
                adresse_soc: '',
                SIREN: '',
                contact_tel: '',
                contact_email: '',
                longitude: '',
                latitude: '',
           })
        } 
        else 
        {   const {clientItem} = this.props
            this.setState({
                id: clientId,
                nom_soc: clientItem.nom_soc,
                adresse_soc: clientItem.adresse_soc,
                longitude: clientItem.longitude,
                latitude: clientItem.latitude,
                SIREN: clientItem.SIREN,
                contact_tel: clientItem.contact_tel,
                contact_email: clientItem.contact_email
            })
        }
    }

    handleSaveClient = () => {
       this.props.addClient(this.state)
       this.setState({
        id: '',
        nom_soc: '',
        adresse_soc: '',
        SIREN: '',
        contact_tel: '',
        contact_email: '',
        longitude: '',
        latitude: '',
        })
    }

    handleUpdateClient = () =>{
        this.props.updateClient(this.state)
        this.setState({
            id: '',
            nom_soc: '',
            adresse_soc: '',
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/clients">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Clients
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {this.state.nom_soc ? this.state.nom_soc : 'New Client'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Client Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>
                            <div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.clientId === 'client' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick = { this.handleSaveClient }
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick = { this.handleUpdateClient }
                                        component={Link} to={'/clients'}
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
                            this.props.match.params.clientId === 'client' ? (
                                <h4> Nouveau Client </h4>
                                    ) : (
                                    <h4> Client details </h4>
                                    )                               
                        }
                        </FuseAnimate>
                    </div>
                }
                content={
                        <div className="p-16 sm:p-24 max-w-2xl">
                            <form>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField  
                                        value={this.state.nom_soc}
                                        id="nom_soc"
                                        label="Nom de la société"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="nom_soc"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="adresse_soc"
                                        name="adresse_soc"
                                        onChange={this.handleChange}
                                        label="Adresse"
                                        type="text"
                                        value={this.state.adresse_soc}
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
                                <FuseAnimate animation="transition.bounceUpIn" delay={600}>
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
                                <FuseAnimate animation="transition.bounceUpIn" delay={400}>
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
        allClients: state.clientReducer.allClients,
        clients: state.firestore.ordered.clients,
        clientItem: state.clientReducer.clientItem,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, {addClient, getAllClients, updateClient, signOut})(FormulaireClient);