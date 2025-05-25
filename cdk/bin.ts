import { App } from 'aws-cdk-lib/core';
import { StaticSiteStack } from './stacks/static-site.stack';

const app = new App();

const subDomain = process.env['SUBDOMAIN'] ?? app.node.tryGetContext('subdomain');

let id = 'StaticSite';
if (subDomain) {
  id += `-${subDomain}`;
}

new StaticSiteStack(app, id, {
  env: {
    region: 'us-east-1',
    account: '670799836323',
  },
  domainName: 'mattymo.dev',
  subDomain,
});
