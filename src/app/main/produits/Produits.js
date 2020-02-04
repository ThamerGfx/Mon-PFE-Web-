import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import ProduitsTable from './ProduitsTable';
import ProduitsHeader from './ProduitsHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import {Redirect} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';

const Produits = () => {
    
    return (
       <React.Fragment>
           <FusePageCarded
               classes={{
                   content: "flex",
                   header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
               }}
               header={
                 <ProduitsHeader />
               }
               content={
                  <ProduitsTable />
               }
               innerScroll
           />
        </React.Fragment>
       );
};

const mapStateToProps = (state) => {
    return {
        produits: state.firestore.ordered.produits,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'produits'},
    ]))(Produits);
