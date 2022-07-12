import { ConfigReader } from '@backstage/config';
import { UrlReaders } from '@backstage/backend-common';
import {
  ActionContext,
  createFetchTemplateAction,
} from '@backstage/plugin-scaffolder-backend';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import winston from 'winston';

export async function runTemplate(input: {
  url: string;
  targetPath?: string;
  values?: any;
  copyWithoutRender?: string[];
  cookieCutterCompat?: boolean;
}): Promise<void> {
  const config = new ConfigReader({});

  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

  const templater = createFetchTemplateAction({
    reader: UrlReaders.create({
      logger,
      config,
    }),
    integrations: null as any,
  });

  const context: ActionContext<any> = {
    logger,
    workspacePath: process.cwd(),
    input,
    async createTemporaryDirectory() {
      return fs.mkdtemp(path.resolve(os.tmpdir(), 'scaffold'));
    },
    templateInfo: {
      baseUrl: `file://${process.cwd()}/${input.url}`,
      entityRef: `component:default/${path.basename(process.cwd())}`,
    },
    // unused in testing but required for typing
    logStream: null as any,
    output: null as any,
  };

  return templater.handler(context);
}
