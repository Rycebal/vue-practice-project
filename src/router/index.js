import Vue from 'vue/dist/vue.js';
import Router from 'vue-router'
import UserList from '@/components/UserList'
import UserPosts from '@/components/UserPosts'
import UserAlbums from '@/components/UserAlbums'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',              //  set path to / to load the UserList route on front page
            name: 'UserList',
            component: UserList
        },
        {
            path: '/UserPosts/:id', //  :id binds the user id from the UserList route and passes it through props to 
            name: 'UserPosts',      //      the UserPosts component in order to know which posts are from that user
            component: UserPosts,
            props: true
        },
        {
            path: '/UserAlbums/:id', //  :id binds the user id from the UserList route and passes it through props to 
            name: 'UserAlbums',      //      the UserAlbums component in order to know which ablums are from that user
            component: UserAlbums,
            props: true
        }
    ]
})
