import {FuseLoadable} from '@fuse';

export const MarqueConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/marques',
            component: FuseLoadable({
                loader: () => import('./Marques')
            })
        },
        {
            path     : '/formmarque/:marqueId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        }
    ]
};