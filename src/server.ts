import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
// Router
import PostRouter from './router/PostRouter';

// Server
class Server {
  public app : express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    // Setup Mongoose
    const MONGO_URI = 'mongodb://localhost/typescript-express-api'
    mongoose.connect(MONGO_URI || process.env.MONGO_URI);

    // Config
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  public routes(): void {
    let router: express.Router;
    router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/v1/posts', PostRouter);
  }
}

export default new Server().app;

