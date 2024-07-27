/**
 * Routes that are allowed even the principle is unauthenticated
 * @type {string[]}
 */
export const PublicRoutes: string[] = [
    '/',
    '/verify-email',
]

/**
 * Routes that are used to authenticate
 * @type {string[]}
 */
export const AuthRoutes: string[] = [
    '/login',
    '/signup',
    '/auth-error',
    '/reset-password',
    '/new-password',
]
/**
 * Routes that used for providers
 * @type {string}
 */
export const ApiRoutes: string = '/api/auth/'
/**
 * Route that is used for default redirect if nothing is specified
 * @type {string}
 */
export const DEFAULT_REDIRECT_ROUTE: string = '/settings'

/**
 * Route that is use to redirect if the principle is unauthenticated
 * @type {string}
 */
export const DEFAULT_AUTH_ROUTE: string = '/login'
