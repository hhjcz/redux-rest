/** Created by hhj on 8/31/16. */

export function selectAuthTree(getResourcesRoot) {
  return state => getResourcesRoot(state).auth
}
