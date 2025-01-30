const ENV = ['dev', 'prod'] as const;

export type Env = typeof ENV[number];

export function isEnv(env: string): env is Env {
    return ENV.includes(env as Env);
}

export function assertEnv(env: string): asserts env is Env {
    if (isEnv(env)) return;
    throw new Error(`Unknown env: ${env}`);
}
