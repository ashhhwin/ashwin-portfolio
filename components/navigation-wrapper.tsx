"use client"

import React, { useState } from 'react'
import { Navigation } from './navigation'
import Home from '@/app/page'

export function NavigationWrapper() {
  const [showEducation, setShowEducation] = useState(false)

  const handleShowEducation = () => {
    setShowEducation(true)
    // Scroll to education section after a brief delay
    setTimeout(() => {
      const educationSection = document.getElementById('education')
      if (educationSection) {
        educationSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <>
      <Navigation onShowEducation={handleShowEducation} />
      <Home showEducation={showEducation} setShowEducation={setShowEducation} />
    </>
  )
} 