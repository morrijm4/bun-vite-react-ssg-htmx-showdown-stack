import { BaseStack, type BaseStackProps } from './base.stack'
import type { Construct } from 'constructs';
import { StaticSite } from '../constructs/static-site';
import { getDomainName } from '../config/domain';

export class StaticSiteStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: BaseStackProps) {
    super(scope, id, props);

    new StaticSite(this, 'mattymo', {
      domainName: getDomainName(),
    });
  }
}
