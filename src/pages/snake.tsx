import * as elements from 'typed-html';
import { Layout } from '../components/private/layout';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';
import { ts } from '../services/func-body-to-string/func-body-to-string';

interface Node {
  type: 'empty' | 'food' | 'snake';
  element: HTMLElement;
}

interface SnakeNode extends Node {
  type: 'snake';
  direction: Direction;
}

type Grid = Array<Array<HTMLElement>>;

type GridState = Array<Array<Node>>;

type Point = {
  col: number;
  row: number;
};

type Direction = 'up' | 'down' | 'left' | 'right';

type GameState = {
  direction: Direction;
  pendingDirection: Direction;
  grid: GridState;
  head: Point;
  tail: Point;
  food: Point;
  score: number;
  controller: AbortController;
  pause: boolean;
  gameOver: boolean;
  title: string;
};

export default (
  <Html>
    <Head>
      <link href="/public/styles/snake.css" rel="stylesheet" />
    </Head>
    <Layout>
      <main class="m-auto mt-16 flex max-w-fit flex-col items-start gap-4 px-4">
        <div class="heading flex w-full justify-between">
          <h1>
            Score:&nbsp;<span id="score">0</span>
          </h1>
          <h1>
            High score:&nbsp;<span id="high-score">0</span>
          </h1>
        </div>
        <div class="flex" id="root"></div>
        <div class="heading flex w-full justify-between">
          <h1 id="title"></h1>
          <button
            class="play-button cursor-pointer rounded-2xl bg-blue-500 hover:bg-blue-600"
            id="play-button"
          >
            Play
          </button>
        </div>
      </main>
    </Layout>
    <script>
      {ts(() => {
        const COLUMNS = 13;
        const ROWS = 13;
        const INITIAL_SPEED = 300;

        function getSnakeSpeed(state: GameState): number {
          return Math.max(INITIAL_SPEED - Math.log(state.score + 1) * 60, 100);
        }

        function assert(condition: unknown, msg?: string): asserts condition {
          if (!condition) throw new Error(msg);
        }

        function assertSnakeNode(node: Node, msg?: string): asserts node is SnakeNode {
          assert(node.type === 'snake', msg);
        }

        function getHighScore(): number {
          const highScore = window.sessionStorage.getItem('high-score');
          if (highScore == null) return 0;
          return parseInt(highScore);
        }

        function setHighScore(score: number) {
          window.sessionStorage.setItem('high-score', score.toString());

          const element = document.getElementById('high-score');
          assert(element, 'Cannot find high score dom node');
          element.innerHTML = score.toString();
        }

        function createRandomPoint(): Point {
          return {
            col: Math.floor(Math.random() * COLUMNS),
            row: Math.floor(Math.random() * ROWS),
          };
        }

        function getNode(grid: GridState, point: Point): Node | undefined {
          return grid[point.col]?.[point.row];
        }

        function initGrid(root: HTMLElement): Grid {
          return Array.from({ length: COLUMNS }, (_, i) => {
            const col = document.createElement('div');
            root.appendChild(col);

            return Array.from({ length: ROWS }, (_, j): HTMLElement => {
              const row = document.createElement('div');
              col.appendChild(row);

              row.classList.add('custom-border');
              row.classList.add('node');

              return row;
            });
          });
        }

        function initGridState(grid: Grid): GridState {
          return grid.map((col) =>
            col.map(
              (row): Node => ({
                type: 'empty',
                element: row,
              }),
            ),
          );
        }

        function createFoodPoint(grid: GridState): Point {
          const point = createRandomPoint();
          const node = getNode(grid, point);
          assert(node, 'Unable to find point in createFoodPoint');
          return node.type !== 'empty' ? createFoodPoint(grid) : point;
        }

        function createKeyDownHandler(state: GameState) {
          return async (event: KeyboardEvent) => {
            switch (event.key) {
              case 'ArrowUp':
                if (state.direction === 'down') return;
                state.pendingDirection = 'up';
                break;
              case 'ArrowDown':
                if (state.direction === 'up') return;
                state.pendingDirection = 'down';
                break;
              case 'ArrowLeft':
                if (state.direction === 'right') return;
                state.pendingDirection = 'left';
                break;
              case 'ArrowRight':
                if (state.direction === 'left') return;
                state.pendingDirection = 'right';
                break;
              case 'p': // TODO: remove in prod
                state.pause = !state.pause;
                break;
            }

            const headNode = getNode(state.grid, state.head);
            assert(headNode, 'Cannot find head node');
            assertSnakeNode(headNode);

            headNode.direction = state.direction;
          };
        }

        function initGameState(grid: Grid): GameState {
          setHighScore(getHighScore());

          const gridState = initGridState(grid);

          const head: Point = {
            col: Math.floor(COLUMNS / 2),
            row: Math.floor(ROWS / 2),
          };

          const direction: Direction = 'up';

          const headNode = getNode(gridState, head);
          assert(headNode, 'Cannot find head node');
          headNode.type = 'snake';
          assertSnakeNode(headNode);
          headNode.direction = direction;

          const food: Point = createFoodPoint(gridState);

          const foodNode = getNode(gridState, food);
          assert(foodNode, 'Cannot find food node');
          foodNode.type = 'food';

          const state: GameState = {
            direction,
            pendingDirection: direction,
            grid: gridState,
            score: 0,
            pause: false,
            controller: new AbortController(),
            food,
            head,
            tail: structuredClone(head),
            gameOver: false,
            title: '',
          };

          document.addEventListener('keydown', createKeyDownHandler(state), {
            signal: state.controller.signal,
          });

          return state;
        }

        function render(state: GameState): void {
          const playButton = document.getElementById('play-button');
          assert(playButton, 'play button not found');

          if (state.gameOver) {
            state.controller.abort();
            playButton.classList.remove('hidden');

            const highScore = getHighScore();
            if (highScore < state.score) {
              setHighScore(state.score);
            }
          } else {
            playButton.classList.add('hidden');
          }

          const title = document.getElementById('title');
          assert(title, 'Could not find title');

          title.innerText = state.title;

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

        function updatePoint(direction: Direction, point: Point) {
          switch (direction) {
            case 'down':
              point.row += 1;
              break;
            case 'left':
              point.col -= 1;
              break;
            case 'right':
              point.col += 1;
              break;
            case 'up':
              point.row -= 1;
              break;
          }
        }

        function update(state: GameState): void {
          state.direction = state.pendingDirection;

          const oldHead = getNode(state.grid, state.head);
          assert(oldHead, 'Cannot find old head node');
          assertSnakeNode(oldHead);
          oldHead.direction = state.direction;

          if (state.pause) return;

          updatePoint(state.direction, state.head);
          const head = getNode(state.grid, state.head);

          if (head == null || head.type === 'snake') {
            state.gameOver = true;
            state.title = 'Game over!';
            return;
          }

          if (head.type === 'food') {
            state.score += 1;
            state.food = createFoodPoint(state.grid);

            const foodNode = getNode(state.grid, state.food);
            assert(foodNode, 'Cannot find food node');

            foodNode.type = 'food';
          } else {
            const tail = getNode(state.grid, state.tail);

            assert(tail, 'Could not find tail');
            const snake = tail;
            assertSnakeNode(snake);

            tail.type = 'empty';
            updatePoint(snake.direction, state.tail);
          }

          head.type = 'snake';
          assertSnakeNode(head);
          head.direction = state.direction;
        }

        async function wait(ms: number) {
          return new Promise((res) => setTimeout(res, ms));
        }

        async function nextFrame(state: GameState, speed: number) {
          await wait(speed);
          update(state);
          render(state);
        }

        async function run(state: GameState) {
          render(state);

          while (!state.controller.signal.aborted) {
            await nextFrame(state, getSnakeSpeed(state));
          }
        }

        function main() {
          const root = document.getElementById('root');
          assert(root, 'Cannot find root node');

          const grid = initGrid(root);

          const playButton = document.getElementById('play-button');
          assert(playButton, 'Cannot find play button');

          playButton.addEventListener('click', () => run(initGameState(grid)));
        }
        main();
      })}
    </script>
  </Html>
);
