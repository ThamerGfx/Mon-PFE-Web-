/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    animateur    : ['admin', 'animateur'],
    user     : ['admin', 'staff', 'user'],
    onlyGuest: ['guest']
};

export default authRoles;
