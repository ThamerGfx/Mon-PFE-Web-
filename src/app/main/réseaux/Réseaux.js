import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import RéseauxTable from './RéseauxTable';
import RéseauxHeader from './RéseauxHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import {Redirect} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

class Réseaux extends Component {
    render()
    {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to = '/Login' />

        return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <RéseauxHeader/>
            }
            content={
                <RéseauxTable/>
            }
            innerScroll
        />
        )
    };
}
const mapStateToProps = (state) => {
    return {
        réseaux: state.firestore.ordered.réseaux,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'réseaux'},
    ]))(Réseaux);
