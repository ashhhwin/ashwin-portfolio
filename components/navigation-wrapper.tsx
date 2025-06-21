"use client"

import React from 'react'

export function NavigationWrapper({ 
  onShowEducation,
  children 
}: { 
  onShowEducation: () => void,
  children: React.ReactNode 
}) {
  // The wrapper's purpose is primarily for positioning and state context if needed.
  // The actual navigation component is passed as a child.
  return (
    <>
      {React.cloneElement(children as React.ReactElement, { onShowEducation })}
    </>
  )
} 