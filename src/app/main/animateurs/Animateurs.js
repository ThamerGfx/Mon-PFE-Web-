import React from 'react';
import {FusePageCarded} from '@fuse';
import AnimateursTable from './AnimateursTable';
import AnimateursHeader from './AnimateursHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';

const Animateurs = () => {
    
    return (
       <React.Fragment>
           <FusePageCarded
               classes={{
                   content: "flex",
                   header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
               }}
               header={
                 <AnimateursHeader />
               }
               content={
                  <AnimateursTable />
               }
               innerScroll
           />
        </React.Fragment>
       );
   };
const mapStateToProps = (state) => {
    return {
        animateurs: state.firestore.ordered.animateurs
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'animateurs'},
    ]))(Animateurs);
