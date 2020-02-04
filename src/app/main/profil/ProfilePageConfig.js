import {FuseLoadable} from '@fuse';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/profile',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        },
        {
            path     : '/formformation/:formationId?',
            component: FuseLoadable({
                loader: () => import('./tabs/FormulaireFormation')
            })
        },
        {
            path     : '/forminfos/:forminfosId?',
            component: FuseLoadable({
                loader: () => import('./tabs/FormulaireInfosGenerales')
            })
        },
        {
            path     : '/formmessage/:messageId?',
            component: FuseLoadable({
                loader: () => import('./tabs/FormulaireMessages')
            })
        },        {
            path     : '/profile',
            component: FuseLoadable({
                loader: () => import('./tabs/AboutTab')
            })
        }
    ]
};
