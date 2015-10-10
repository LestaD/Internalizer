
import Tree from 'db/tree';
import { get, post } from 'utils/requester';



/**
 * Need description for getProjects
 */
export function getProjects() {
  return get('/projects')
    .then((response) => {
      Tree.select('projects').set(response.projects);
    });
}

