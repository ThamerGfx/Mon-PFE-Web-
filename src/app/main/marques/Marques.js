import React from 'react';
import {FusePageCarded} from '@fuse';
import MarquesTable from './MarquesTable';
import MarquesHeader from './MarquesHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';

const Marques = () => {
    
    return (
       <React.Fragment>
           <FusePageCarded
               classes={{
                   content: "flex",
                   header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
               }}
               header={
                 <MarquesHeader />
               }
               content={
                  <MarquesTable />
               }
               innerScroll
           />
        </React.Fragment>
       );
};

const mapStateToProps = (state) => {
    return {
        marques: state.firestore.ordered.marques,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'marques'},
    ]))(Marques);
