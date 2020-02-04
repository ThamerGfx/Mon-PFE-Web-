import React, {Component} from 'react';
import { AppBar,  Card, CardContent, Icon, Toolbar, Typography, Fab} from '@material-ui/core';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { 
    getAllMessagesSuccess, 
    getAllMessages, 
    OpenDialogMessage
} from '../../../store/actions/messageActions/message.action'


class Messages extends Component {


    componentDidMount()
    {
        this.props.getAllMessages();
    }

    handleClick = (message) => {
        console.log(message)
        this.props.EditMessageItem(message)
    }

    render()
    {
        const messages = this.props.messages || []
        const auth = this.props.auth
        return (
            <div className="md:flex max-w-2xl">
            
                <div>
                    <Card>
                        <FuseAnimate animation="transition.expandIn" delay={600}>
                            <Fab color="red" aria-label="add">
                                <Icon
                                   component={Link} role="button" to={"/formmessage/message"}
                                >
                                    new_message
                                </Icon>
                            </Fab>
                        </FuseAnimate>
                    </Card>
                </div>
                <div className="flex flex-col flex-1 md:pr-32">

                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                    {
                        messages.map(item => {
                            if(auth.email === item.dist) {
                                        return (
                                            <Card className="w-full mb-16">
                                                <AppBar position="static" elevation={0} style={{backgroundColor: "#124164"}}>
                                                    <Toolbar className="pl-16 pr-8">
                                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                            {item.authorEmail}
                                                        </Typography>
                                                        <Fab color="red" aria-label="add">
                                                            <Icon
                                                                component={Link} role="button" to={"/formmessage/message"}
                                                            >
                                                                send_message
                                                            </Icon>
                                                        </Fab>
                                                    </Toolbar>
                                                </AppBar>
                                                <CardContent>

                                                    <div className="mb-24">
                                                        <Typography className="font-bold mb-4 text-15">Message</Typography>
                                                        <Typography>{item.msg}</Typography>
                                                    </div>

                                                </CardContent>
                                            </Card>
                                        );
                            }
                        })
                    }
                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allMessages: state.messageReducer.allMessages,
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps,
        { 
            getAllMessages, 
            getAllMessagesSuccess, 
            OpenDialogMessage
        }
    ),firestoreConnect([
      { collection: 'messages'},
    ]))(Messages);