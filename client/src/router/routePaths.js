const routePaths = {};

export const indexRoute = {
    path: '/',
    title: 'Index'
};
export const homeRoute = {
    path: '/home',
    title: 'Home'
};
export const authRoute = {
    path: '/auth',
    title: 'Authorization',
    signUp: {
        path: '/auth/signUp',
        title: 'Sign Up'
    },
    signIn: {
        path: '/auth/signIn',
        title: 'Sign In'
    }
};
export const userRoute = {
    path: '/user',
    title: 'User',

    profile: {
        path: '/user/profile',
        title: 'Profile'
    }
};

routePaths.index = indexRoute;
routePaths.home = homeRoute;
routePaths.auth = authRoute;
routePaths.user = userRoute;

export default routePaths;
