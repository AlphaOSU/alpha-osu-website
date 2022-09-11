import dva from 'dva';
import { createBrowserHistory } from 'history';
import { Routes } from './routes';
import models from './models';
import './reset.css';
import './index.css';

const app = dva({
  history: createBrowserHistory(),
});

models.forEach((m) => {
  app.model(m as any);
});

app.router(Routes);

app.start('#root');
