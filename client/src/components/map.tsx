import React from 'react'
import India from "@react-map/india";
function Map() {
  return (
    <div>
        <India
            selectColor="blue"
            hoverColor="green"
            strokeWidth={1}
            hints={true}
            type="select-single"
          />
    </div>
  )
}

export default Map