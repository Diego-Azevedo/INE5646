const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/index' },
      { path: 'login', name: 'LoginPage', component: () => import('pages/LoginPage.vue') },
      { path: 'index', name: 'IndexPage', component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'AboutPage', component: () => import('pages/AboutPage.vue') },
      { path: 'profile', name: 'ProfilePage', component: () => import('pages/ProfilePage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
