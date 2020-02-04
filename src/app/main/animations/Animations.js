import React from 'react';
import {FusePageCarded} from '@fuse';
import AnimationsTable from './AnimationsTable';
import AnimationsHeader from './AnimationsHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';


const Animations = () => {
    
    return (
       <React.Fragment>
           <FusePageCarded
               header={
                 <AnimationsHeader />
               }
               content={
                  <AnimationsTable />
               }
               innerScroll
           />
        </React.Fragment>
       );
   };
const mapStateToProps = (state) => {
    return {
        animations: state.firestore.ordered.animations,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'animations'},
    ]))(Animations);
