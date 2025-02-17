import { App } from 'aws-cdk-lib/core'
import { StaticSiteStack } from './stacks/static-site.stack'

const app = new App()

new StaticSiteStack(app, 'StaticSite', {
  env: {
    region: 'us-east-1',
    account: '670799836323',
  }
});
