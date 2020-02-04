import React from 'react';
import {FusePageCarded} from '@fuse';
import MagasinsTable from './MagasinsTable';
import MagasinsHeader from './MagasinsHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';

const Magasins = () => {
    
    return (
       <React.Fragment>
           <FusePageCarded
               classes={{
                   content: "flex",
                   header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
               }}
               header={
                 <MagasinsHeader />
               }
               content={
                  <MagasinsTable />
               }
               innerScroll
           />
        </React.Fragment>
       );
};

const mapStateToProps = (state) => {
    return {
        magasins: state.firestore.ordered.magasins,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'magasins'},
    ]))(Magasins);
