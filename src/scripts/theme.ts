function main() {
  changeTheme(getTheme());

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const theme = getTheme();
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  });
}

function changeTheme(theme: Theme) {
  const dark = document.getElementById('dark');
  const light = document.getElementById('light');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    dark?.classList.remove('hidden');
    light?.classList.add('hidden');

    document
      .querySelectorAll('.theme-inverse')
      .values()
      .forEach((el) => {
        if ('fill' in el) {
          el.fill = '#000000';
        }
      });
  } else {
    document.documentElement.classList.remove('dark');
    light?.classList.remove('hidden');
    dark?.classList.add('hidden');

    document
      .querySelectorAll('.theme-inverse')
      .values()
      .forEach((el) => {
        if ('fill' in el) {
          el.fill = '#FFFFFF';
        }
      });
  }

  localStorage.setItem('theme', theme);
}

function getTheme(): Theme {
  const theme = localStorage.getItem('theme');

  if (theme == null) {
    return getDefaultTheme();
  }

  assertTheme(theme);
  return theme;
}

function getDefaultTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const THEMES = ['light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

function isTheme(theme: string): theme is Theme {
  return THEMES.includes(theme as Theme);
}

function assertTheme(theme: string): asserts theme is Theme {
  if (!isTheme(theme)) throw new Error(`${theme} not a theme`);
}

main();
