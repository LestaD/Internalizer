import Tree from 'db/tree';


export function getCurrentUser() {
  return Tree.select(['state', 'users']).get('current');
}


export function getCurrentHost() {
  return Tree.select(['state', 'hosts']).get('current');
}


export function loginAs(user, password = null) {
  const userRecord = Tree.select(['state', 'users', 'list']).get(user);
  if (!userRecord) {
    return false;
  }

  if (userRecord.password !== password) {
    return false;
  }
  console.log(userRecord);

  Tree.select(['state', 'users']).set('current', user);
  return true;
}