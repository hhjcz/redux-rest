/** Created by hhj on 3/30/16. */
/* eslint-disable react/prop-types */
import RefreshIndicator from 'material-ui/RefreshIndicator'
import React from 'react'

export default function FetchIndicator(props) {
  if (!props.fetching) return <div />

  return (
    <div className="text-info">
      {props.text || 'louduju...'}
      <RefreshIndicator
        size={props.size || 32}
        left={10}
        top={0}
        status="loading"
        style={{ display: 'inline-block', position: 'relative' }}
      />
    </div>
  )
}
