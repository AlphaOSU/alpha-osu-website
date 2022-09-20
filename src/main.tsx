import dva from 'dva';
import { createBrowserHistory } from 'history';
import { version } from '../package.json';
import { Routes } from './routes';
import models from './models';
import { initI18n } from './i18n';
import './index.d.ts';
import 'antd/dist/antd.css';
import './reset.css';
import './index.css';
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
