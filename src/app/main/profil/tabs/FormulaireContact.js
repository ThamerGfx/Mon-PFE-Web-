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
    updateContact, 
    addContact, 
    getAllContact
} from '../../../store/actions/contactActions/contact.action'
 
class FormulaireContact extends Component {

    state = {
        id: '',
        adresse:'',
        tel: '',
        email: ''
    }; 

    componentDidMount()
    {
        this.updateContactState();
        console.log('je trouve', this.props.contactItem)
    }

    updateContactState = () => {
        const params = this.props.match.params;
        const {contactId} = params;

        if ( contactId === 'ajouter' )
        {  
            this.setState({
                id: '',
                adresse:'',
                tel: '',
                email: ''
            })
        } 
        else 
        {           
            const {contactItem} = this.props
            this.setState({
                id: contactId,
                adresse: contactItem.adresse,
                tel: contactItem.tel,
                email: contactItem.email
            }) 
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const params = this.props.match.params;
        const {contactId} = params;

        if ( contactId === 'edit' )
        {           
            const {contactItem} = this.props
            this.setState({
                id: contactId,
                adresse: contactItem.adresse,
                tel: contactItem.tel,
                email: contactItem.email
            }) 
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }
   
    handleSubmit = () =>{
        console.log(this.state)
        this.props.addContact(this.state)
        this.setState({
            id: '',
            adresse:'',
            tel: '',
            email: ''
        })
    }

    handleUpdate = () =>{
        console.log(this.state)
        this.props.updateContact(this.state)
        this.setState({
            id: '',
            adresse:'',
            tel: '',
            email: ''
        })
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/profile">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Mon Contact
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Contact Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>

                            <div>
                            
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.contactId === 'ajouter' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSubmit }
                                        component={Link} to={'/profile'}
                                    >
                                    Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleUpdate }
                                        component={Link} to={'/profile'}
                                    >
                                    Update
                                    </Button>
                                )                               
                            }
                            </FuseAnimate>
                            </div>
                        </div>
                }
                content={
                        <div className="p-16 sm:p-24 max-w-2xl">
                            <form>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1200}>
                                    <TextField  
                                        value={this.state.adresse}
                                        id="adresse"
                                        label="Adresse"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="adresse"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="tel"
                                        name="tel"
                                        onChange={this.handleChange}
                                        label="Téléphone"
                                        type="number"
                                        value={this.state.tel}
                                        multiline
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
                                        type="email"
                                        value={this.state.email}
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
        allContact: state.contactReducer.allContact,
        contact: state.firestore.ordered.contact,
        formationItem : state.contactReducer.formationItem,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, {updateContact, addContact, getAllContact})(FormulaireContact);