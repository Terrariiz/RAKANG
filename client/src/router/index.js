import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Landing from '@/views/Landing.vue'

const Login                     = () => import('@/components/profile/Login')
const Register                  = () => import('@/components/profile/Register')
const ListAddnews               = () => import('@/components/admin/ListAddnews')
const Addnews                   = () => import('@/components/admin/Addnews')
const editAddnews               = () => import('@/components/admin/editAddnews')
const ListAdddoctrine           = () => import('@/components/admin/ListAdddoctrine')
const Adddoctrine               = () => import('@/components/admin/Adddoctrine')
const Admin                     = () => import('@/components/admin/Admin')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/ListAddnews',
    name: 'ListAddnews',
    component: ListAddnews
  },
  {
    path: '/addnews',
    name: 'Addnews',
    component: Addnews
  },
  {
    path: '/editaddnews',
    name: 'editAddnews',
    component: editAddnews
  },
  {
    path: '/ListAdddoctrine',
    name: 'ListAdddoctrine',
    component: ListAdddoctrine
  },
  {
    path: '/Adddoctrine',
    name: 'Adddoctrine',
    component: Adddoctrine
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
