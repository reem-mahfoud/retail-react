/**

 * Auth session / credentials types.

 *

 * @typedef {'admin' | 'university_admin' | 'user' | string} LoginRole

 */



/**

 * @typedef {Object} AuthUser

 * @property {string} [username]

 * @property {string} [email]

 * @property {string} [first_name]

 * @property {string} [last_name]

 * @property {LoginRole} [loginRole]

 * @property {string} [avatar]

 */



/**

 * @typedef {Object} LoginCredentials

 * @property {string} [username]

 * @property {string} [password]

 * @property {string} [email]

 * @property {string} [first_name]

 * @property {string} [last_name]

 * @property {LoginRole} [role]

 * @property {string} [avatar]

 */



/**

 * @typedef {Object} AuthContextValue

 * @property {AuthUser | null} user

 * @property {(credentials: LoginCredentials) => Promise<string>} login

 * @property {() => Promise<void>} logout

 * @property {boolean} isAuthenticated

 * @property {boolean} loading

 */



export {};

