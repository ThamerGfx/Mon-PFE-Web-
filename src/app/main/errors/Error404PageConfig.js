import {FuseLoadable} from '@fuse';

export const Error404PageConfig = {
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
            path     : '/app/error-404',
            component: FuseLoadable({
                loader: () => import('./Error404Page')
            })
        }
    ]
};
