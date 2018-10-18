import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserPage from '@/components/UserPage'
import Admin from '@/components/Admin'
import Unauthorized from '@/components/Unauthorized'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/unauthorized',
            name: 'Unauthorized',
            component: Unauthorized
        },
        {
            path: '/profile',
            name: 'UserPage',
            component: UserPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: Admin,
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




