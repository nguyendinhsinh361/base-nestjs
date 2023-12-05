import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  project_name: process.env.PROJECT_NAME,
}));
