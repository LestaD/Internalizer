import Tree from 'db/tree';

export function getCurrentDir() {
  return Tree.select('dir').get('wd');
}


export function listInDir() {

}