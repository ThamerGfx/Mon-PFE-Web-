import {FuseLoadable} from '@fuse';

export const ClientConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/clients',
            component: FuseLoadable({
                loader: () => import('./Clients')
            })
        },
        {
            path     : '/formclient/:clientId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        },
        {
            path     : '/mapclient',
            component: FuseLoadable({
                loader: () => import('../map/MapClients')
            })
        }
    ]
};