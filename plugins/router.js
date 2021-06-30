import cookie from 'js-cookie'
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const token = cookie.get('guli_token');
    if (!token && (/^\/course\/+/.test(to.path)) ) {
      next('/login');
    } else {
      next();
    }
  });
};
