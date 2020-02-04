import React from 'react';
import {FusePageCarded} from '@fuse';
import ClientsTable from './ClientsTable';
import ClientsHeader from './ClientsHeader';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';
import { firestoreConnect } from 'react-redux-firebase';

const Clients = () => {
    
    return (
       <React.Fragment>
           <FusePageCarded
               classes={{
                   content: "flex",
                   header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
               }}
               header={
                 <ClientsHeader />
               }
               content={
                  <ClientsTable />
               }
               innerScroll
           />
        </React.Fragment>
       );
   };
const mapStateToProps = (state) => {
    return {
        clients: state.firestore.ordered.clients
    }
}
export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
      { collection: 'clients'},
    ]))(Clients);
