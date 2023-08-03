'use client';

import React from 'react'
import { PulseLoader } from 'react-spinners';

const ComponentLevelLoader = ({text, color , loading, size}) => {
  return (
    <div className='flex gap-2 items-center'>
        {text}
        <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid = 'loader'
        />
    </div>
  )
}

export default ComponentLevelLoader
