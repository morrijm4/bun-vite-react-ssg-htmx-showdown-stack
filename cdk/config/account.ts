import type { Env } from './env';

export function getAccount(env: Env): string {
    switch (env) {
        case 'dev':
            return '670799836323';
        case 'prod':
        default:
            throw new Error(`No account configured for ${env}`);
    }
}
