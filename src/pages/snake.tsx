import * as elements from 'typed-html';
import { Layout } from '../components/private/layout';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';
import { ts } from '../services/func-body-to-string/func-body-to-string';

type Node = {
  type: 'empty' | 'food' | 'snake';
  element: HTMLElement;
};

type Grid = Array<Array<Node>>;

type Point = {
  col: number;
  row: number;
};

type GameState = {
  direction: 'up' | 'down' | 'left' | 'right';
  grid: Grid;
  head: Point;
  tail: Point;
  food: Point;
  score: number;
  controller: AbortController;
  pause: boolean;
};

export default (
  <Html>
    <Head />
    <Layout>
      <main class="m-auto mt-24 flex max-w-fit flex-col items-start gap-4">
        <div class="flex h-8 w-full justify-between text-2xl">
          <h1 id="title"></h1>
          <h1>
            Score:&nbsp;<span id="score">0</span>
          </h1>
        </div>
        <div id="root"></div>
        <div class="flex"></div>
      </main>
    </Layout>
    <script>
      {ts(() => {
        const COLUMNS = 11;
        const ROWS = 11;

        function assert(condition: unknown, msg?: string): asserts condition {
          if (!condition) throw new Error(msg);
        }

        function createRandomPoint(): Point {
          return {
            col: Math.floor(Math.random() * COLUMNS),
            row: Math.floor(Math.random() * ROWS),
          };
        }

        function pointEq(a: Point, b: Point) {
          return a.col === b.col && a.row === b.row;
        }

        function initGrid(root: HTMLElement, head: Point, food: Point): Grid {
          return Array.from({ length: COLUMNS }, (_, i) => {
            const col = document.createElement('div');
            root.appendChild(col);

            return Array.from({ length: ROWS }, (_, j): Node => {
              const row = document.createElement('div');
              col.appendChild(row);

              row.classList.add('border-1');
              row.classList.add('p-4');

              const point = { col: i, row: j };

              let type: Node['type'] = 'empty';

              if (pointEq(point, head)) type = 'snake';
              if (pointEq(point, food)) type = 'food';

              return {
                type,
                element: row,
              };
            });
          });
        }

        function createFoodPoint(head: Point): Point {
          const point = createRandomPoint();
          return pointEq(point, head) ? createFoodPoint(head) : point;
        }

        function initGameState(root: HTMLElement): GameState {
          root.classList.add('flex');

          const head: Point = {
            col: 5,
            row: 5,
          };

          const food: Point = createFoodPoint(head);

          const state: GameState = {
            direction: 'up',
            grid: initGrid(root, head, food),
            score: 0,
            pause: false,
            controller: new AbortController(),
            food,
            head,
            tail: structuredClone(head),
          };

          document.addEventListener(
            'keydown',
            (event) => {
              switch (event.key) {
                case 'ArrowUp':
                  state.direction = 'up';
                  break;
                case 'ArrowDown':
                  state.direction = 'down';
                  break;
                case 'ArrowLeft':
                  state.direction = 'left';
                  break;
                case 'ArrowRight':
                  state.direction = 'right';
                  break;
                case 'p': // TODO: remove in prod
                  state.pause = !state.pause;
                  break;
              }
            },
            { signal: state.controller.signal },
          );

          return state;
        }

        function endGame(state: GameState) {
          state.controller.abort();

          const title = document.getElementById('title');
          assert(title, 'Could not find title');

          title.innerText = 'Game over!';
        }

        function render(state: GameState): void {
          for (const col of state.grid) {
            for (const row of col) {
              row.element.classList.remove('bg-red-500', 'bg-yellow-500');

              switch (row.type) {
                case 'empty':
                  break;
                case 'food':
                  row.element.classList.add('bg-red-500');
                  break;
                case 'snake':
                  row.element.classList.add('bg-yellow-500');
                  break;
              }
            }
          }

          const score = document.getElementById('score');
          assert(score, 'Could not find score');

          score.innerHTML = state.score.toString();
        }

        function printState(state: GameState) {
          const copy = JSON.parse(JSON.stringify(state)) as GameState;
          copy.grid.forEach((col) => {
            col.forEach((row) => {
              // @ts-expect-error
              delete row.element;
            });
          });

          console.log(copy);
        }

        function update(state: GameState): void {
          const { head, grid, direction, pause } = state;

          if (pause) return;

          const prev = grid[head.col]?.[head.row];
          assert(prev, 'Cannot find prev node');

          switch (direction) {
            case 'down':
              head.row += 1;
              break;
            case 'left':
              head.col -= 1;
              break;
            case 'right':
              head.col += 1;
              break;
            case 'up':
              head.row -= 1;
              break;
          }

          const next = grid[head.col]?.[head.row];

          if (next == null) {
            return endGame(state);
          }

          if (next.type === 'food') {
            state.score += 1;
            state.food = createFoodPoint(state.head);

            const foodNode = state.grid[state.food.col]?.[state.food.row];
            assert(foodNode, 'Can not find food point');
            foodNode.type = 'food';

            printState(state);
          }

          prev.type = 'empty';
          next.type = 'snake';
        }

        function main() {
          const root = document.getElementById('root');
          assert(root, 'Cannot find root node');

          const state = initGameState(root);
          render(state);

          const loop = setInterval(() => {
            update(state);
            render(state);
          }, 500);

          state.controller.signal.addEventListener('abort', () => {
            clearInterval(loop);
          });
        }
        main();
      })}
    </script>
  </Html>
);
