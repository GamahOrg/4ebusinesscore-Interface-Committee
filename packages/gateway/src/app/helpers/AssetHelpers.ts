export const toAbsoluteUrl = (pathname: string) =>
  (window as any)._env_?.PUBLIC_URL
    ? (window as any)._env_?.PUBLIC_URL + pathname
    : pathname;
