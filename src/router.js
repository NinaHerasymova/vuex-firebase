import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList';
import NotFound from './pages/NotFound';
import store from './store/index';

const CoachDetails = defineAsyncComponent(()=>import('./pages/coaches/CoachDetails'));
const CoachRegister = defineAsyncComponent(()=>import('./pages/coaches/CoachRegister'));
const ContactCoach = defineAsyncComponent(()=>import('./pages/requests/ContactCoach'));
const RequestReceived = defineAsyncComponent(()=>import('./pages/requests/RequestReceived'));
const UserAuth = defineAsyncComponent(()=>import('./pages/auth/UserAuth'));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id', component: CoachDetails, props: true, children: [
        { path: 'contact', component: ContactCoach }
      ]
    },
    {
      path: '/register', component: CoachRegister, meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests', component: RequestReceived, meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth', component: UserAuth, meta: {
        requiresUnauth: true
      }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthentificated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthentificated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
