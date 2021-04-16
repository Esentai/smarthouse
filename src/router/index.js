import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Details from '../components/Details'
import Payment from '../views/Payment'

Vue.use(VueRouter)

let userState = false;

if (localStorage.getItem('login')){
  userState = localStorage.getItem('login')
}else{
    localStorage.setItem('login', 'false');
}

console.log(userState)



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {requiresAuth: true}
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment,
        meta: {requiresAuth: true}
    },
    {
        path: '/:id',
        name: 'categories',
        component: Details,
        props: true,
        meta: {requiresAuth: true}
    }

]


const router = new VueRouter({
    mode: 'history',
    routes
})


router.beforeEach((to,from,next) => {
    if(to.matched.some(route => route.meta.requiresAuth)){
        if (localStorage.getItem('login') === 'true'){
            return next();
        }
        return next('/auth');
    }
    next();
});

export default router
