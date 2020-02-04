const navigationConfig = [
    {
        'id'      : 'référentiels',
        'title'   : 'Gestion des référentiels',
        'type'    : 'collapse',
        'icon'    : 'home',
        'auth' : 'authRoles.admin',
        'children': [
            {
                'id'   : 'animations-component',
                'title': 'Animations',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/animations',
                'auth' : 'authRoles.admin',
            },
            {
                'id'   : 'clients-component',
                'title': 'Clients',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/clients',
                'auth' : 'authRoles.admin',
            },
            {
                'id'   : 'réseaux-component',
                'title': 'Réseaux',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/réseaux',
                'auth' : 'authRoles.admin',
            },
            {
                'id'   : 'magasins-component',
                'title': 'Magasins',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/magasins',
                'auth' : 'authRoles.admin',
            },
            {
                'id'   : 'produits-component',
                'title': 'Produits',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/produits',
                'auth' : 'authRoles.admin',
            },
            {
                'id'   : 'marques-component',
                'title': 'Marques',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/marques',
                'auth' : 'authRoles.admin',
            },
        ]
    },        
    {
        'id'      : 'utilisateurs',
        'title'   : 'Gestion des utilisateurs',
        'type'    : 'collapse',
        'icon'    : 'group',
        'auth' : 'authRoles.animateur',
        'children': [
            {
                'id'   : 'animateurs-component',
                'title': 'Animateurs',
                'type' : 'item',
                'icon' : 'liste',
                'url'  : '/animateurs',
                'auth' : 'authRoles.admin',
            },
        ]
    }

];

export default navigationConfig;
