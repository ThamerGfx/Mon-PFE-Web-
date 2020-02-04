import {FuseLoadable} from '@fuse';

export const ProduitConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/produits',
            component: FuseLoadable({
                loader: () => import('./Produits')
            })
        },
        {
            path     : '/formproduit/:produitId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        }
    ]
};