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
    addMessage, 
    getAllMessages,
    getAllMessagesSuccess
} from '../../../store/actions/messageActions/message.action'
 
class FormulaireMessages extends Component {

    state = {
        id: '',
        dist:'',
        msg: ''
    }; 

    componentDidMount()
    {
        this.updateMessageState();
        console.log('je trouve', this.props.messageItem)
    }

    updateMessageState = () => {
        const params = this.props.match.params;
        const {messageId} = params;

        if ( messageId === 'message' )
        {  
            this.setState({
                id: '',
                dist:'',
                msg: ''
            })
        } 
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }
   
    handleSend = () =>{
        console.log(this.state)
        this.props.addMessage(this.state)
        this.setState({
            id: '',
            dist:'',
            msg: ''
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
                                        Message
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Message Details</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div> 
                            </div>

                            <div>
                            
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                this.props.match.params.messageId === 'message' ? (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSend }
                                    >
                                    Send
                                    </Button>
                                ) : (
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        onClick={ this.handleSend }
                                        component={Link} to={'/profile'}
                                    >
                                    Reply
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
                                <FuseAnimate animation="transition.bounceUpIn" delay={1000}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="dist"
                                        name="dist"
                                        onChange={this.handleChange}
                                        label="Email de destinataire"
                                        type="text"
                                        value={this.state.dist}
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.bounceUpIn" delay={800}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        id="msg"
                                        name="msg"
                                        onChange={this.handleChange}
                                        label="Message"
                                        type="text"
                                        value={this.state.msg}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={5}
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
        allMessages: state.messageReducer.allMessages,
        messages: state.firestore.ordered.messages,
        messageItem : state.messageReducer.messageItem,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, {addMessage, getAllMessages, getAllMessagesSuccess})(FormulaireMessages);