import React from 'react'
import { SubtractAlt } from '@carbon/icons-react';

const RemoveButton = ({
  onClick = console.log
}) => {
  return (
    <div>
      <SubtractAlt className="fill-gray-500 cursor-pointer mt-2.5" size="24" onClick={onClick} />
    </div>
  )
}

export default RemoveButton