import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/components/Home'),
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/Login'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/components/Register'),
        },
        {
            path: '/app',
            name: 'Canvas',
            component: () => import('@/canvas/Canvas'),
        },
        {
            path: '/unauthorized',
            name: 'Unauthorized',
            component: () => import('@/components/Unauthorized'),
        },
        {
            path: '/profile',
            name: 'UserPage',
            component: () => import('@/components/UserPage'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: () => import('@/components/AdminDashboard/Admin'),
            meta: {
                requiresAuth: true,
                isAdmin: true
            }
        }
    ]
})

function userIsAdmin(roles) {
    var userIsAdmin = false;
    for (var i = 0; i < roles.length; i++) {
        if (roles[i].role === 'ADMIN') {
            userIsAdmin = true;
        }
    }
    return userIsAdmin;
}

router.beforeEach((to, from, next) => {
    // Check if the requested url requiresAuth
    if (to.matched.some(record => record.meta.requiresAuth)) {

        // No token, no user is logged in, redirect to login page
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }

        else { // Get the user based on the token
            let user = JSON.parse(localStorage.getItem('user'));
            if (to.matched.some(record => record.meta.isAdmin)) {
                // Check for admin role
                if (userIsAdmin(user.roles)) {
                    next()
                }
                else {
                    next({ name: 'Unauthorized' })
                }
            }
            else {
                next()
            }
        }
    }

    // The requested url not requiresAuth
    else {
        next()
    }
})

export default router;




