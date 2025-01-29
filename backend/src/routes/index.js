import AppController from '../controllers/AppController.js';
import AuthController from '../controllers/AuthController.js';
import UsersController from '../controllers/UsersController.js';

/**
 * Initializes routes for the application API
 * @param {express} api - The express app instance
 * @returns {void}
 */
const initialization = (api) => {
    // Define routes for AppController
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);

    // Define routes for UsersController
    api.post('/users', UsersController.postNew);
    api.get('/users/me', UsersController.getMe);

    // Define routes for AuthController
    api.get('/connect', AuthController.getConnect);
    api.get('/disconnect', AuthController.getDisconnect);
}

export default initialization;
