const THEMES = ['light', 'dark'];
type Theme = (typeof THEMES)[number];

function isTheme(theme: string): theme is Theme {
  return THEMES.includes(theme);
}

function assertTheme(theme: string): asserts theme is Theme {
  if (!isTheme(theme)) throw new Error(`${theme} not a theme`);
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

function getTheme(): Theme | null {
  const theme = localStorage.getItem('theme');

  if (theme == null) {
    return null;
  }

  assertTheme(theme);
  return theme;
}

function isDarkMode(): boolean {
  const theme = getTheme();

  if (theme == null) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return theme === 'dark';
}

function main() {
  const theme = getTheme();

  if (theme != null) {
    changeTheme(theme);
  }

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    if (isDarkMode()) {
      changeTheme('light');
    } else {
      changeTheme('dark');
    }
  });
}

main();
