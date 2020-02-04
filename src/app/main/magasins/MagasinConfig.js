import {FuseLoadable} from '@fuse';

export const MagasinConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/magasins',
            component: FuseLoadable({
                loader: () => import('./Magasins')
            })
        },
        {
            path     : '/formmagasin/:magasinId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        },
        {
            path     : '/mapmagasin',
            component: FuseLoadable({
                loader: () => import('../map/MapMagasins')
            })
        }
    ]
};