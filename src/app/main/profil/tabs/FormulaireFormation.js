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
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    updateFormation, 
    addFormation, 
    getAllFormations
} from '../../../store/actions/formationActions/formation.action'
 
class FormulaireFormation extends Component {

    state = {
        id: '',
        titre:'',
        date: '',
        client: '',
        durée: ''
    }; 

    componentDidMount()
    {
        this.updateFormationState();
        console.log('je trouve', this.props.formationItem)
    }

    updateFormationState = () => {
        const params = this.props.match.params;
        const {formationId} = params;

        if ( formationId === 'formation' )
        {  
            this.setState({
                id: '',
                titre:'',
                date: '',
                client: '',
                durée: ''
            })
        } 
        else 
        {           
            const {formationItem} = this.props
            this.setState({
                id: formationId,
                titre: formationItem.titre,
                date: formationItem.date,
                client: formationItem.client,
                durée: formationItem.durée
            }) 
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const params = this.props.match.params;
        const {formationId} = params;

        if ( formationId === 'edit' )
        {           
            const {formationItem} = this.props
            this.setState({
                id: formationId,
                titre: formationItem.titre,
                date: formationItem.date,
                client: formationItem.client,
                durée: formationItem.durée
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
        this.props.addFormation(this.state)
        this.setState({
            id: '',
            titre:'',
            date: '',
            client: '',
            durée: '',
        })
    }

    handleUpdate = () =>{
        console.log(this.state)
        this.props.updateFormation(this.state)
        this.setState({
            id: '',
            titre:'',
            date: '',
            client: '',
            durée: '',
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
                                        Mes Formations
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Formation Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>

                            <div>
                            
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.formationId === 'formation' ? (
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
                                        value={this.state.titre}
                                        id="titre"
                                        label="Titre"        
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin="normal" 
                                        className="mt-8 mb-16"   
                                        name="titre"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="client"
                                        name="client"
                                        onChange={this.handleChange}
                                        label="Client"
                                        type="text"
                                        value={this.state.client}
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: 
                                                <InputAdornment position="end">
                                                    <Icon>person_outline</Icon>
                                                </InputAdornment>
                                        }}
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="date"
                                        name="date"
                                        onChange={this.handleChange}
                                        label="Date"
                                        type="datetime-local"
                                        value={this.state.date}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={600}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="durée"
                                        name="durée"
                                        onChange={this.handleChange}
                                        label="Durée"
                                        type="text"
                                        value={this.state.durée}
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: 
                                                <InputAdornment position="end">
                                                    <Icon>watch_later</Icon>
                                                </InputAdornment>
                                        }}
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
        allFormations: state.formationReducer.allFormations,
        formations: state.firestore.ordered.formations,
        formationItem : state.formationReducer.formationItem,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, {updateFormation, addFormation, getAllFormations})(FormulaireFormation);