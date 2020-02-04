import {FuseLoadable} from '@fuse';

export const LoginConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display : false,
                    folded  : false,
                    position: 'left'
                },
                toolbar       : {
                    display : false,
                    style   : 'fixed',
                    position: 'below'
                },
                footer        : {
                    display : false,
                    style   : 'fixed',
                    position: 'below'
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/login',
            component: FuseLoadable({
                loader: () => import('./Login')
            })
        }
    ]
};