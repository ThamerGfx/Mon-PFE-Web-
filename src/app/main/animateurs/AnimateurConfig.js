import {FuseLoadable} from '@fuse';

export const AnimateurConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/animateurs',
            component: FuseLoadable({
                loader: () => import('./Animateurs')
            })
        },
        {
            path     : '/formulaire/:animateurId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        }
    ]
};