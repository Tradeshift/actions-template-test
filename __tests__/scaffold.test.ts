import { runTemplate } from '../src/scaffold';
import fs from 'fs-extra';
import path from 'path';

describe('scaffold', () => {
  describe('#runTemplate', () => {
    it('fails w/o copyWithoutRender', async () => {
      const targetPath = './build/1';
      await fs.emptyDir(targetPath);

      await expect(
        runTemplate({
          url: './template',
          targetPath,
          copyWithoutRender: [],
          values: {},
        })
      ).rejects.toThrow();

      await expect(
        fs.pathExists(
          path.resolve(process.cwd(), targetPath, '.static/workflow.yml')
        )
      ).resolves.toEqual(false);
    });

    it('works w/ copyWithoutRender', async () => {
      const targetPath = './build/2';
      await fs.emptyDir(targetPath);

      await expect(
        runTemplate({
          url: './template',
          targetPath,
          copyWithoutRender: ['.static'],
          values: {},
        })
      ).resolves.toBeUndefined();

      await expect(
        fs.pathExists(
          path.resolve(process.cwd(), targetPath, '.static/workflow.yml')
        )
      ).resolves.toEqual(true);
    });
  });
});
