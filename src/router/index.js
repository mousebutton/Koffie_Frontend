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
             path: '/register',
             name: 'Register',
             component: () => import('@/components/Register'),
        },
        {
            path: '/canvas',
            name: 'Canvas',
            component: () => import('@/components/Canvas'),
            meta: {
                requiresAuth: true
            }
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
            },
            children: [
                {
                    path: '/users',
                    name: 'Users',
                    component: () => import('@/components/AdminDashboard/Users')
                },
                {
                    path: '/departments',
                    name: 'Departments',
                    component: () => import('@/components/AdminDashboard/Departments')
                },
                {
                    path: '/coffee',
                    name: 'Coffee',
                    component: () => import('@/components/AdminDashboard/Coffees')
                }
                // {
                //     path: '/canvas/edit',
                //     name: 'Canvas',
                //     component: () => import('@/components/AdminDashboard/AdminCanvas')
                // }          
            ]
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
                path: '/',
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




