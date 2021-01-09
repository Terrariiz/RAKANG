import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Landing from '@/views/Landing.vue'


const Login                     = () => import('@/components/profile/Login')
const Register                  = () => import('@/components/profile/Register')
const Listnews               = () => import('@/components/admin/Listnews')
const Addnews                   = () => import('@/components/admin/Addnews')
const editnews               = () => import('@/components/admin/editnews')
const Listdoctrine           = () => import('@/components/admin/Listdoctrine')
const Adddoctrine               = () => import('@/components/admin/Adddoctrine')
const DetailDoctrine               = () => import('@/components/admin/DetailDoctrine')
const Admin                     = () => import('@/components/admin/Admin')
const loginAdmin                = () => import('@/components/admin/loginAdmin')
const ListCampaign           = () => import('@/components/admin/ListCampaign')
const AddCampaign           = () => import('@/components/admin/AddCampaign')
const editCampaign               = () => import('@/components/admin/EditCampaign')
const profile                 = () => import('@/components/profile/profile')
const editprofile                 = () => import('@/components/profile/editprofile')



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
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: {
      requiresUserAuth: true
    }
  },  
  {
    path: '/editprofile',
    name: 'editprofile',
    component: editprofile,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/login',
    name: 'loginAdmin',
    component: loginAdmin,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/Listnews',
    name: 'Listnews',
    component: Listnews,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/addnews',
    name: 'Addnews',
    component: Addnews,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/editnews',
    name: 'editnews',
    component: editnews,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/Listdoctrine',
    name: 'Listdoctrine',
    component: Listdoctrine,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/Adddoctrine',
    name: 'Adddoctrine',
    component: Adddoctrine,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/ListCampaign',
    name: 'ListCampaign',
    component: ListCampaign,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/addCampaign',
    name: 'addCampaign',
    component: AddCampaign,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/editCampaign',
    name: 'editCampaign',
    component: editCampaign,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/listdoctrine/:id',
    name: 'DetailDoctrine',
    component: DetailDoctrine,
    meta: {
      requiresAdminAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresUserAuth)) {
      if (localStorage.getItem('user_token') == null) {
        window.alert("please sign in!!")
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      }  
      else { 
        next()
        }
  } else if(to.matched.some(record => record.meta.requiresAdminAuth)) {
      if(localStorage.getItem('admin_token') == null){
        window.alert("please sign in!!")
        next({
          path: '/admin/login',
          params: { nextUrl: to.fullPath }
      })
      }
      else{
          next()
      }
  }else {
      next()
  }
});

export default router
