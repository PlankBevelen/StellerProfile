import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/stellerprofile', name: 'StellerProfile', meta: { title: 'StellerProfile' }, redirect: { name : 'HomeView' }, component: ()=> import('@/views/StellerProfile.vue') , children: [
      { path : 'homeview', name: 'HomeView', meta: { title: 'HomeView' }, component: ()=> import('@/views/HomeView.vue') },
      { path : 'createview', name: 'CreateView', meta: { title: 'CreateView' }, component: ()=> import('@/views/CreateView/index.vue') },
      { path : 'templatesview', name: 'TemplatesView', meta: { title: 'TemplatesView' }, component: ()=> import('@/views/TemplatesView/index.vue') },
      { path : 'aipolishview', name: 'AIPolishView', meta: { title: 'AIPolishView' }, component: ()=> import('@/views/AIPolishView/index.vue') },
      { path : 'profileview', name: 'ProfileView', meta: { title: 'ProfileView' }, component: ()=> import('@/views/ProfileView/index.vue') },
      { path : 'resumeedit', name: 'ResumeEdit', meta: { title: 'ResumeEdit' }, component: ()=> import('@/views/ResumeEdit/index.vue') },
      { path : 'login', name: 'Login', meta: { title: 'Login' }, component: ()=> import('@/views/Login/index.vue') },
      { path : 'registe', name: 'Registe', meta: { title: 'Registe' }, component: ()=> import('@/views/Registe/index.vue') },
      { path : 'forget', name: 'Forget', meta: { title: 'Forget' }, component: ()=> import('@/views/Forget/index.vue') }
    ]},
    { path: '/', redirect: { name: 'HomeView'} },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

export default router
