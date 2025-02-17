import { Stack, type StackProps } from 'aws-cdk-lib/core';
import type { Construct } from 'constructs';
import type { Env } from '../config/env';

export type BaseStackProps = StackProps

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: BaseStackProps) {
    super(scope, id, props);
  }

  get env(): Env {
    switch (this.account) {
      case '670799836323':
        return 'dev';
      default:
        throw new Error(`Could not find region for ${this.account} account`);
    }
  }
}
