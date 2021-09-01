# Actions-template-test

Github action to help validate scaffolder templates for backstage.

The github action takes the same arguments as the template action.

## Use as github action

```
jobs:
  template:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v2
      - uses: tradeshift/actions-template-test@v1
        with:
          url: ./template
          targetPath: ./tmp
          values: |
          {
            "name": "App",
            "type": "public"
          }
```

## Use from node

Note: _to be published_

```js
const { runTemplate } = require('@tradeshift/actions-template-test');

await runTemplate({
  url: './template',
  targetPath: './tmp',
  values: {},
});
```
