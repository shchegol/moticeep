export function getLastValueFromURLPath (path) {
  let splittedPath = path.split('/');
  return splittedPath[splittedPath.length - 1]
}
