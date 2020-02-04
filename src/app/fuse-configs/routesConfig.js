import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';

import {AnimationConfig} from '../main/animations/AnimationConfig';
import {AnimateurConfig} from 'app/main/animateurs/AnimateurConfig';
import {ClientConfig} from 'app/main/clients/ClientConfig';
import {RéseauConfig} from '../main/réseaux/RéseauConfig'
import {MagasinConfig} from '../main/magasins/MagasinConfig'
import {MarqueConfig} from '../main/marques/MarqueConfig'
import {ProduitConfig} from '../main/produits/ProduitConfig'
import {ChatAppConfig} from '../main/chat/ChatAppConfig'
import {LoginConfig} from '../auth/LoginConfig'
import {Register2PageConfig} from '../auth/Register2PageConfig'
import {ProfilePageConfig} from '../main/profil/ProfilePageConfig'
import {MessagesConfig} from '../main/profil/tabs/MessagesConfig'
import {CalendarAppConfig} from '../main/profil/tabs/calendar/CalendarAppConfig'

const routeConfigs = [
    AnimationConfig,
    AnimateurConfig,
    ClientConfig,
    RéseauConfig,
    MagasinConfig,
    MarqueConfig,
    ProduitConfig,
    ProfilePageConfig,
    MessagesConfig,
    CalendarAppConfig,
    ChatAppConfig,
    LoginConfig,
    Register2PageConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/Login"/>
    }
];

 export default routes;
