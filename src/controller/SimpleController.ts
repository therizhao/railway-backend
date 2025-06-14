import { Router } from 'express';
import { createLogger } from '../util/LoggerFactory';


const SimpleController = Router();
const log = createLogger('SimpleController');

SimpleController.route("/").get((req, res) => {
    log.debug('Received hello request');
    res.status(200).json({ message: 'hello' });
})

export default SimpleController;
