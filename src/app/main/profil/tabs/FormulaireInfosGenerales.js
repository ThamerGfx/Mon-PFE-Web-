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
    updateInformation, 
    addInformation, 
    getAllInformations
} from '../../../store/actions/infosActions/infos.action'
 
class FormulaireInfosGenerales extends Component {

    state = {
        id: '',
        nom: '',
        prénom: '',
        desc: '',
        adresse:'',
        tel: '',
        email: ''
    }; 

    componentDidMount()
    {
        this.updateFormationState();
        console.log('je trouve', this.props.formationItem)
    }

    updateFormationState = () => {
        const params = this.props.match.params;
        const {forminfosId} = params;

        if ( forminfosId === 'ajouter' )
        {  
            this.setState({
                id: '',
                nom: '',
                prénom: '',
                desc: '',
                adresse:'',
                tel: '',
                email: ''
            })
        } 
        else 
        {           
            const {informationItem} = this.props
            this.setState({
                id: informationItem.id,
                nom: informationItem.nom,
                prénom: informationItem.prénom,
                desc: informationItem.desc,
                adresse: informationItem.adresse,
                tel: informationItem.tel,
                email: informationItem.email
            }) 
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const params = this.props.match.params;
        const {forminfosId} = params;

        if ( forminfosId === 'edit' )
        {           
            const {informationItem} = this.props
            this.setState({
                id: informationItem.id,
                nom: informationItem.nom,
                prénom: informationItem.prénom,
                desc: informationItem.desc,
                adresse: informationItem.adresse,
                tel: informationItem.tel,
                email: informationItem.email
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
        this.props.addInformation(this.state)
        this.setState({
            id: '',
            nom: '',
            prénom: '',
            desc: '',
            adresse:'',
            tel: '',
            email: ''
        })
    }

    handleUpdate = () =>{
        console.log(this.state)
        this.props.updateInformation(this.state)
        this.setState({
            id: '',
            nom: '',
            prénom: '',
            desc: '',
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
                                        Retour
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Informations  Générales</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>

                            <div>
                            
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.forminfosId === 'ajouter' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSubmit }
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
                                        value={this.state.nom}
                                        id="nom"
                                        label="Nom"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="nom"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="prénom"
                                        name="prénom"
                                        onChange={this.handleChange}
                                        label="Prénom"
                                        type="text"
                                        value={this.state.prénom}
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="desc"
                                        name="desc"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={this.state.desc}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FuseAnimate>
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
        allInformations: state.infoReducer.allInformations,
        informations: state.firestore.ordered.informations,
        informationItem : state.infoReducer.informationItem,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, {updateInformation, addInformation, getAllInformations})(FormulaireInfosGenerales);