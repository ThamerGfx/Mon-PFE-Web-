import {FuseLoadable} from '@fuse';

export const MessagesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/profile',
            component: FuseLoadable({
                loader: () => import('./AboutTab')
            })
        }
    ]
};
