/** Created by hhj on 8/31/16. */

export function getAuthTree(getResourcesRoot) {
  return state => getResourcesRoot(state).auth
}
