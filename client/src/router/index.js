import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Landing from '@/views/Landing.vue'
import rank from '@/views/Rank.vue'
import detailcoin from '@/views/detailcoin.vue'
import campaign from '@/views/Campaign.vue'
import doctrine from '@/views/Doctrine.vue'
import news from '@/views/News.vue'
import swal from "sweetalert2"

// ---------------------------หน้าโปรไฟล์----------------------------------------------------
const Login                  = () => import('@/components/profile/Login')
const Register               = () => import('@/components/profile/Register')
const Logpayment             = () => import('@/components/profile/Logpayment')
const profile                = () => import('@/components/profile/profile')
const editprofile            = () => import('@/components/profile/editprofile')
const forgotPassword         = () => import('@/components/profile/forgotPassword')
const resetPassword          = () => import('@/components/profile/resetPassword')

// --------------------------CRUD ฝั่งแอดมิน--------------------------------------------------

// ----------------------------CRUD ข่าวสาร--------------------------------------------------
const Listnews               = () => import('@/components/admin/news/Listnews')
const Addnews                = () => import('@/components/admin/news/Addnews')
const editnews               = () => import('@/components/admin/news/editnews')
const DetailNews             = () => import('@/components/admin/news/DetailNews')

// ---------------------------CRUD หลักธรรม--------------------------------------------------
const Listdoctrine           = () => import('@/components/admin/doctrine/Listdoctrine')
const Adddoctrine            = () => import('@/components/admin/doctrine/Adddoctrine')
const DetailDoctrine         = () => import('@/components/admin/doctrine/DetailDoctrine')
const EditDoctrine           = () => import('@/components/admin/doctrine/EditDoctrine')

// ----------------------------CRUD แคมเปญ--------------------------------------------------
const DetailCampaign         = () => import('@/components/admin/campaign/DetailCampaign')
const ListCampaign           = () => import('@/components/admin/campaign/ListCampaign')
const AddCampaign            = () => import('@/components/admin/campaign/AddCampaign')
const editCampaign           = () => import('@/components/admin/campaign/EditCampaign')

// ----------------------------CRUD ของรางวัล-------------------------------------------------
const Additems               = () => import('@/components/admin/reward/Additems')
const Listitems              = () => import('@/components/admin/reward/Listitems')
const Detailitems            = () => import('@/components/admin/reward/Detailitems')
const Edititems              = () => import('@/components/admin/reward/Edititems')

// ----------------------------หน้าอื่นๆของแอดมิน-----------------------------------------------
const Admin                  = () => import('@/components/admin/Admin')
const LogDonateAdmin         = () => import('@/components/admin/LogDonate')
const loginAdmin             = () => import('@/components/admin/loginAdmin')
const payment                = () => import('@/components/admin/payment')
const dashboard              = () => import('@/components/admin/index')

// ----------------------------หน้าฝั่ง user----------------------------------------------------
const UserDetailCampaign     = () => import('@/views/Donate_Campaign')
const seamsi                 = () => import('@/views/random')
const Lantern                = () => import('@/views/Lantern')
const UserDetailDoctrine     = () => import('@/views/detail_Doctrine')
const UserDetailNews         = () => import('@/views/detail_news')
const termuse                = () => import('@/views/termUse')
const termservice            = () => import('@/views/termService')
const items                  = () => import('@/views/items')
const userDetailitems        = () => import('@/views/userDetailitems')

// ----------------------------หน้า dashboard-------------------------------------------------
const dashboard_home          = () => import('@/components/admin/dashboard/home')
const dashboard_list_campaign = () => import('@/components/admin/dashboard/list_campaign')
const dashboard_list_news     = () => import('@/components/admin/dashboard/list_news')
const dashboard_list_doctrine = () => import('@/components/admin/dashboard/list_doctrine')
const dashboard_list_reward   = () => import('@/components/admin/dashboard/list_reward')

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
    path: '/termuse',
    name: 'termuse',
    component: termuse
  },
  {
    path: '/termservice',
    name: 'termservice',
    component: termservice
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
    component: UserDetailCampaign
  },
  {
    path: '/doctrine',
    name: 'Doctrine',
    component: doctrine
  },
  {
    path: '/doctrine/:id',
    name: 'UserDetailDoctrine',
    component: UserDetailDoctrine
  },
  {
    path: '/news',
    name: 'News',
    component: news
  },
  {
    path: '/news/:id',
    name: 'UserDetailNews',
    component: UserDetailNews
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
    component: Login,
    meta: {
      requiresUserAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: forgotPassword
  },
  {
    path: '/resetPassword/:token',
    name: 'resetPassword',
    component: resetPassword
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
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAdminAuth: true
    }
  },

  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: dashboard,
    meta: {
      requiresAdminAuth: true
    },
    children: [
      {
        path: '',
        component: dashboard_home,
        meta: {
          requiresAdminAuth: true
        }
      },
      {
        path: '/admin/dashboard/list-campaign',
        component: dashboard_list_campaign,
        meta: {
          requiresAdminAuth: true
        }
      },
      {
        path: '/admin/dashboard/list-news',
        component: dashboard_list_news,
        meta: {
          requiresAdminAuth: true
        }
      },
      {
        path: '/admin/dashboard/list-doctrine',
        component: dashboard_list_doctrine,
        meta: {
          requiresAdminAuth: true
        }
      },
      {
        path: '/admin/dashboard/list-reward',
        component: dashboard_list_reward,
        meta: {
          requiresAdminAuth: true
        }
      },
    ]
  },

  {
    path: '/admin/login',
    name: 'loginAdmin',
    component: loginAdmin
  },
  {
    path: '/admin/logdonate/:id',
    name: 'LogDonate',
    component: LogDonateAdmin,
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
    // path: '/admin/editnews',
    path: '/admin/listnews/:id/edit',
    name: 'EditNews',
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
    path: '/rank',
    name: 'rank',
    component: rank
  },
  {
    path: '/detailcoin',
    name: 'detailcoin',
    component: detailcoin
  },
  {
    path: '/payment',
    name: 'payment',
    component: payment,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/seamsi',
    name: 'seamsi',
    component: seamsi,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/lantern',
    name: 'lantern',
    component: Lantern,
    meta: {
      requiresUserAuth: true
    }
  },  
  {
    path:'/items',
    name: 'items',
    component: items,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path:'/items/userDetailitems',
    name: 'userDetailitems',
    component: userDetailitems,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path:'/admin/Listitems',
    name: 'Listitems',
    component: Listitems,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path:'/admin/Detailitems',
    name: 'Detailitems',
    component: Detailitems,
    meta: {
      requiresAdminAuth: true
    }
  }, 
  {
    path:'/admin/Edititems',
    name: 'Edititems',
    component: Edititems,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/additems',
    name: 'Additems',
    component: Additems,
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
