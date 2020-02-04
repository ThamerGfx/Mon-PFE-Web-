import React from 'react';
import {FusePageCarded} from '@fuse';
import ListeFormations from './ListeFormations';
import { connect } from 'react-redux';
import { compose} from 'redux';
import _ from '@lodash';


const MesFormations = () => {

    return (
    <React.Fragment>
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            content={
                <ListeFormations/>
            }
            innerScroll
        />
    
    </React.Fragment>
    );
};

function mapStateToProps(state)
{
    return {
          auth : state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
)(MesFormations);