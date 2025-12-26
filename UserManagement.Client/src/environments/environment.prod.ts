import { AppConfig } from '@core/config/app-config';

export const environment: AppConfig = {
  apiUrl: 'http://localhost:5192/api',
  production: true,
  retryAttempts: 1,
};
