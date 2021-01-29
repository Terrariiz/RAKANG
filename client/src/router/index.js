import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Landing from '@/views/Landing.vue'
import coin from '@/views/coin.vue'
import detailcoin from '@/views/detailcoin.vue'
import campaign from '@/views/Campaign.vue'
import doctrine from '@/views/Doctrine.vue'
import news from '@/views/News.vue'
import swal from "sweetalert2"

const Login                  = () => import('@/components/profile/Login')
const Register               = () => import('@/components/profile/Register')
const Logpayment             = () => import('@/components/profile/Logpayment')
const Logcoin                = () => import('@/components/profile/Logcoin')
const Listnews               = () => import('@/components/admin/Listnews')
const Addnews                = () => import('@/components/admin/Addnews')
const editnews               = () => import('@/components/admin/editnews')
const Listdoctrine           = () => import('@/components/admin/Listdoctrine')
const Adddoctrine            = () => import('@/components/admin/Adddoctrine')
const DetailDoctrine         = () => import('@/components/admin/DetailDoctrine')
const DetailNews             = () => import('@/components/admin/DetailNews')
const DetailCampaign         = () => import('@/components/admin/DetailCampaign')
const EditDoctrine           = () => import('@/components/admin/EditDoctrine')
const Admin                  = () => import('@/components/admin/Admin')
const loginAdmin             = () => import('@/components/admin/loginAdmin')
const ListCampaign           = () => import('@/components/admin/ListCampaign')
const AddCampaign            = () => import('@/components/admin/AddCampaign')
const editCampaign           = () => import('@/components/admin/EditCampaign')
const profile                = () => import('@/components/profile/profile')
const editprofile            = () => import('@/components/profile/editprofile')
const test                   = () => import('@/components/admin/test')
// const coin                    = () => import('@/views/coin')
const payment                = () => import('@/components/admin/payment')
const UserDetailCampaign     = () => import('@/views/Donate_Campaign')


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
    path: '/campaign',
    name: 'Campaign',
    component: campaign
  },
  // {
  //   path: '/campaign/:id',
  //   name: 'DetailCampaign',
  //   component: DetailCampaign
  // },
  {
    path: '/campaign/:id',
    name: 'UserDetailCampaign',
    component: UserDetailCampaign,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/doctrine',
    name: 'Doctrine',
    component: doctrine
  },
  {
    path: '/news',
    name: 'News',
    component: news
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
    path: '/profile/logpayment',
    name: 'Logpayment',
    component: Logpayment,
    meta:{
      requiresUserAuth: true
    }
  },
  {
    path: '/profile/logcoin',
    name: 'Logcoin',
    component: Logcoin,
    meta:{
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
    component: loginAdmin
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
    // path: '/admin/editnews',
    path: '/admin/listnews/:id/edit',
    name: 'editnews',
    component: editnews,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/listnews/:id',
    name: 'DetailNews',
    component: DetailNews,
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
    // path: '/admin/editCampaign',
    path: '/admin/listCampaign/:id/edit',
    name: 'editCampaign',
    component: editCampaign,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/listcampaign/:id',
    name: 'DetailCampaign',
    component: DetailCampaign,
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
  {
    path: '/admin/listdoctrine/:id/edit',
    name: 'EditDoctrine',
    component: EditDoctrine,
    meta: {
      requiresAdminAuth: true
    }
  },

  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/coin',
    name: 'coin',
    component: coin
  },
  {
    path: '/detailcoin',
    name: 'detailcoin',
    component: detailcoin
  },
  {
    path: '/payment',
    name: 'payment',
    component: payment
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresUserAuth)) {
      if (localStorage.getItem('user_token') == null) {
        // window.alert("please sign in!!")
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
          swal.fire('Please sign in!!', '', 'error')
      }  
      else { 
        next()
        }
  } else if(to.matched.some(record => record.meta.requiresAdminAuth)) {
      if(localStorage.getItem('admin_token') == null){
        // window.alert("please sign in!!")
        next({
          path: '/admin/login',
          params: { nextUrl: to.fullPath }
        })
        swal.fire('Please sign in!!', '', 'error')
      }
      else{
          next()
      }
  }else {
      next()
  }
});

export default router
