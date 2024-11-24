import dva from 'dva';
import { createBrowserHistory } from 'history';
import { version } from '../package.json';
import { initI18n } from './i18n';
import './index.css';
import './index.d.ts';
import models from './models';
import './reset.css';
import { Routes } from './routes';
import { prodLog } from './utils/log';

initI18n();

prodLog(version);

const app = dva({
  history: createBrowserHistory(),
});

models.forEach((m) => {
  app.model(m as any);
});

app.router(Routes);

app.start('#root');
