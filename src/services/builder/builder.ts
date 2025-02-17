export type BuildFunction<TReturn> = () => Promise<TReturn> | TReturn;
export type ReadyFunction = () => void;

export type BuilderOptions<TReturn> = {

  /**
    * Build function
    */
  onBuild: BuildFunction<TReturn>;
}

export class Builder<TReturn> {
  #buildPromise: Promise<TReturn> | TReturn | undefined;

  readonly #onBuild: BuildFunction<TReturn>;
  readonly #tasks: Promise<void>[];


  constructor({ onBuild }: BuilderOptions<TReturn>) {
    this.#onBuild = onBuild;
    this.#tasks = [];
  }

  async buildAfter(tasks: Promise<void>[]): Promise<void> {
    this.#addTasks(tasks);
    await this.#awaitAllPromises();
    await this.#build();
  }

  async #build() {
    if (this.#buildPromise == null) {
      this.#buildPromise = this.#onBuild();
    }

    await this.#buildPromise;

    this.#buildPromise = undefined;
  }

  #addTasks(tasks: Promise<void>[]) {
    this.#tasks.push(...tasks);
  };


  async #awaitAllPromises(): Promise<void> {
    for await (const _ of this.#tasks);
  }
}
