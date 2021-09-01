import * as core from '@actions/core';

import { runTemplate } from './scaffold';

export async function run(): Promise<any> {
  const url = core.getInput('url');
  const targetPath = core.getInput('targetPath');
  const values = JSON.parse(core.getInput('values'));
  const copyWithoutRender = core.getMultilineInput('copyWithoutRenders');
  const cookieCutterCompat = core.getBooleanInput('cookieCutterCompat');

  return runTemplate({
    url,
    targetPath,
    values,
    copyWithoutRender,
    cookieCutterCompat,
  });
}
