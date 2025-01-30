import { BaseStack, type BaseStackProps } from './base.stack'
import type { Construct } from 'constructs';

export class StaticSiteStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: BaseStackProps) {
      super(scope, id, props);
  }
}
