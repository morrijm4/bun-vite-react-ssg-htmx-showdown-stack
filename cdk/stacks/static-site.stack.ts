import { BaseStack, type BaseStackProps } from './base.stack';
import type { Construct } from 'constructs';
import { StaticSite } from '../constructs/static-site';

interface StaticSiteProps extends BaseStackProps {
  domainName: string;
  subDomain?: string;
}

export class StaticSiteStack extends BaseStack {
  constructor(scope: Construct, id: string, { domainName, subDomain, ...rest }: StaticSiteProps) {
    super(scope, id, rest);

    new StaticSite(this, 'mattymo', {
      domainName,
      subDomain,
    });
  }
}
