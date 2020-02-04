import React, {Component} from 'react';
import { 
    AppBar, 
    Card, 
    CardContent, 
    Icon,
    Toolbar, 
    Typography, 
    Fab
} from '@material-ui/core';
import {FuseAnimateGroup,FuseAnimate} from '@fuse';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {UploadFile,removeFile} from '../../../store/actions/uploadActions/upload.action'

class MonCV extends Component {

    state = {
        color: 'default',
        onDelete: 'default',
        avatar: 'none',
        icon: 'none',
        variant: 'default',
        size: 'medium',
        file: null,
        url: '',
        progress: 0,
        id:''
    };
    handleChangeUpload = e => {
        if (e.target.files[0]) {
          const file = e.target.files[0];
          this.setState(() => ({file}));
        }
    }

    handleUpload = () => {
        const {file} = this.state;
        this.props.UploadFile(file)
    }
    render()
    { 
        return (
            <div className="md:flex max-w-2xl">

                <div className="flex flex-col flex-1 md:pr-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={2} style={{backgroundColor: "#124164"}}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            <b><h1>Gèrer votre CV</h1></b>
                                        </Typography>
                                        </Toolbar>
                                        </AppBar>
                                    <CardContent>
                                        <FuseAnimateGroup
                                            enter={{
                                                animation: "transition.slideUpBigIn"
                                            }}
                                        >
                                        <div> 
                                            <input type="file" onChange={this.handleChangeUpload}/>
                                    <FuseAnimate animation="transition.expandIn" delay={600}>
                                        <Fab 
                                            color="primary"
                                            onClick = {this.handleUpload}
                                        >      
                                            <Icon 
                                                aria-label="add"
                                            >
                                                add
                                            </Icon>
                                        </Fab>
                                        </FuseAnimate>
                                        </div>
                                        
                                        </FuseAnimateGroup>
                                </CardContent>
                            </Card>
                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allFiles: state.infoReducer.allFiles,
        files: state.firestore.ordered.files,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps, {UploadFile,removeFile}),
    firestoreConnect([
      { collection: 'files'},
    ])
    )(MonCV)