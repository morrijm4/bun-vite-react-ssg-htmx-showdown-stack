function navigate(path: string) {
  hideElement(getElement(location.pathname, '.router'));
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

function hideElementByPath(path: string) {
  hideElement(getElement(path, '.router'));
}

function showElementByPath(path: string) {
  showElement(getElement(path, '.router'));
}

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
    showElementByPath('/');
  }
}

main();
