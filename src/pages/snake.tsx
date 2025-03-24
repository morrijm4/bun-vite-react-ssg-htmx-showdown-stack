import * as elements from 'typed-html';
import { Layout } from '../components/private/layout';
import { Html } from '../components/private/html';
import { Head } from '../components/private/head';
import { ts } from '../services/func-body-to-string/func-body-to-string';
import { CoreDnsComputeType } from 'aws-cdk-lib/aws-eks';

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
      <title>Snake</title>
      <link href="/public/styles/snake.css" rel="stylesheet" />
    </Head>
    <Layout>
      <main class="m-auto mt-4 flex max-w-fit flex-col items-start gap-4 px-4">
        <div class="flex w-full justify-between text-lg lg:text-2xl">
          <h1 id="title"></h1>
          <button
            class="play-button cursor-pointer rounded-2xl bg-blue-500 hover:bg-blue-600"
            id="play-button"
          >
            Play
          </button>
        </div>
        <div class="flex" id="root"></div>
        <div class="flex w-full justify-between text-lg lg:text-2xl">
          <h1>
            Score:&nbsp;<span id="score">0</span>
          </h1>
          <h1>
            High score:&nbsp;<span id="high-score">0</span>
          </h1>
        </div>
        <div class="m-auto flex w-48 flex-col items-center gap-1 lg:invisible">
          <div>
            <img
              id="up"
              width="64px"
              height="64px"
              src="/public/icons/up-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
          </div>
          <div class="flex w-full justify-between">
            <img
              id="left"
              width="64px"
              height="64px"
              src="/public/icons/left-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
            <img
              id="right"
              width="64px"
              height="64px"
              src="/public/icons/right-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
          </div>
          <div>
            <img
              id="down"
              width="64px"
              height="64px"
              src="/public/icons/down-arrow.svg"
              class="cursor-pointer rounded-full bg-blue-500 p-4 hover:bg-blue-600"
            />
          </div>
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
          const highScore = window.localStorage.getItem('high-score');
          if (highScore == null) return 0;
          return parseInt(highScore);
        }

        function setHighScore(score: number) {
          window.localStorage.setItem('high-score', score.toString());

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

        function initButtons() {
          const up = document.getElementById('up');
          const left = document.getElementById('left');
          const right = document.getElementById('right');
          const down = document.getElementById('down');

          assert(up);
          assert(left);
          assert(right);
          assert(down);

          up.addEventListener('click', () => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          });
          left.addEventListener('click', () => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
          });
          right.addEventListener('click', () => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
          });
          down.addEventListener('click', () => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          });
        }

        function initPlayHandler() {
          const controller = new AbortController();

          document.addEventListener(
            'keydown',
            ({ key }) => {
              switch (key) {
                case 'ArrowUp':
                case 'w':
                case 'ArrowRight':
                case 'd':
                case 'ArrowDown':
                case 's':
                  controller.abort();
                  break;
              }
            },
            { signal: controller.signal },
          );
        }

        function initGrid(root: HTMLElement): Grid {
          return Array.from({ length: COLUMNS }, (_, i) => {
            const col = document.createElement('div');
            root.appendChild(col);

            return Array.from({ length: ROWS }, (_, j): HTMLElement => {
              const row = document.createElement('div');
              col.appendChild(row);

              row.classList.add('custom-border');
              row.classList.add('lg:p-4');
              row.classList.add('p-3');

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
              case 'w':
                if (state.direction === 'down') return;
                state.pendingDirection = 'up';
                break;
              case 'ArrowDown':
              case 's':
                if (state.direction === 'up') return;
                state.pendingDirection = 'down';
                break;
              case 'ArrowLeft':
              case 'a':
                if (state.direction === 'right') return;
                state.pendingDirection = 'left';
                break;
              case 'ArrowRight':
              case 'd':
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
            col: Math.floor(COLUMNS / 2) - 2,
            row: Math.floor(ROWS / 2),
          };

          const tail: Point = {
            col: head.col - 2,
            row: head.row,
          };

          const direction: Direction = 'right';

          const s1 = getNode(gridState, head);
          const s2 = getNode(gridState, { col: head.col - 1, row: head.row });
          const s3 = getNode(gridState, tail);

          assert(s1, 'Cannot find snake node');
          assert(s2, 'Cannot find snake node');
          assert(s3, 'Cannot find snake node');

          s1.type = 'snake';
          s2.type = 'snake';
          s3.type = 'snake';

          assertSnakeNode(s1);
          assertSnakeNode(s2);
          assertSnakeNode(s3);

          s1.direction = direction;
          s2.direction = direction;
          s3.direction = direction;

          const food: Point = {
            col: head.col + 6,
            row: head.row,
          };

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
            tail,
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
            playButton.classList.remove('invisible');

            const highScore = getHighScore();
            if (highScore < state.score) {
              setHighScore(state.score);
            }
          } else {
            playButton.classList.add('invisible');
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
          setHighScore(getHighScore());
          initButtons();

          const root = document.getElementById('root');
          assert(root, 'Cannot find root node');

          const grid = initGrid(root);
          // render(initGameState(grid));

          const playButton = document.getElementById('play-button');
          assert(playButton, 'Cannot find play button');

          playButton.addEventListener('click', () => run(initGameState(grid)));
        }
        main();
      })}
    </script>
  </Html>
);
