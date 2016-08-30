/** Created by hhj on 8/30/16. */
import { createSelector } from 'reselect'

export const getResourcesRootState = (state) => state.resources

const getResourceName = (x, resourceName) => resourceName

export const getResourceState = createSelector(
  [getResourcesRootState, getResourceName],
  (rootState, resourceName) => rootState[resourceName]
)

export const getItemsOf = createSelector(
  getResourceState,
  (state) => state.items
)

export const getResourceStateFP = resourceName => createSelector(
  getResourcesRootState,
  (rootState) => rootState[resourceName]
)

export const getItemsOfFP = resourceName => createSelector(
  getResourceStateFP(resourceName),
  (state) => state.items
)
