import {FuseLoadable} from '@fuse';

export const Register2PageConfig = {
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
            path     : '/register-2',
            component: FuseLoadable({
                loader: () => import('./Register2Page')
            })
        }
    ]
};
