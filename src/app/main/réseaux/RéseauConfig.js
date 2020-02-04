import {FuseLoadable} from '@fuse';

export const RéseauConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/réseaux',
            component: FuseLoadable({
                loader: () => import('./Réseaux')
            })
        },
        {
            path     : '/formreseau/:reseauId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        },
        {
            path     : '/mapréseau',
            component: FuseLoadable({
                loader: () => import('../map/MapRéseaux')
            })
        }
    ]
};