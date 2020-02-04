import {FuseLoadable} from '@fuse';

export const AnimationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/animations',
            component: FuseLoadable({
                loader: () => import('./Animations')
            })
        },
        {
            path     : '/form/:animationId?',
            component: FuseLoadable({
                loader: () => import('./Formulaire')
            })
        },
        {
            path     : '/mapanimation',
            component: FuseLoadable({
                loader: () => import('../map/MapAnimations')
            })
        },
        {
            path     : '/affecter',
            component: FuseLoadable({
                loader: () => import('./AffecterAnimateurs')
            })
        }
    ]
};

