export const parseUserId = (path: string) => Number(/\d+/.exec(path)[0]);
