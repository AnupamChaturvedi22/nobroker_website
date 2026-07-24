export const getStoredTheme = () => localStorage.getItem('theme') || 'light';

export const setHtmlTheme = theme => {
  document.documentElement.dataset.theme = theme;
};
