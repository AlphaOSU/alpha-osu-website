export const openTab = (url: string, callback?: (window: Window | null) => void) => {
  const open = window.open();
  open?.location?.href && (open.location.href = url);
  callback?.(open);
};

export const closeTab = () => {
  window.close();
};
