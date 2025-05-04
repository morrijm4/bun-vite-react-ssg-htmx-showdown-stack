function main() {
  const nav = document.querySelectorAll('.nav');

  nav.forEach((page) => {
    page?.addEventListener('click', () => navigate(page.id));
  });

  document.getElementById('go')?.addEventListener('click', () => {
    navigate('/blog');
  });

  const page = getElement(location.pathname, '.router');
  if (page) {
    showElement(page);
  } else {
    showElement(getElement('/', '.router'));
  }
}

function navigate(path: string) {
  const prev = getElement(location.pathname, '.router');

  if (/* not on spa page */ prev == null) {
    location.pathname = path;
  }

  hideElement(prev);
  deactivateElement(getElement(location.pathname, '.nav'));

  history.pushState(null, '', path);

  showElement(getElement(location.pathname, '.router'));
  activateElement(getElement(location.pathname, '.nav'));
}

function getElement(path: string, className: string) {
  return document
    .querySelectorAll(className)
    .values()
    .find((page) => page.id === path);
}

function activateElement(el?: Element) {
  el?.classList.add('underline');
}

function deactivateElement(el?: Element) {
  el?.classList.remove('underline');
}

function hideElement(el?: Element) {
  el?.classList.add('hidden');
}

function showElement(el?: Element) {
  el?.classList.remove('hidden');
}

main();
