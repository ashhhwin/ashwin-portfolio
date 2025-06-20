"use client"

import React from 'react'
import { Navigation } from './navigation'
import Home from '@/app/page'

export function NavigationWrapper() {
  const handleShowEducation = () => {
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
      <Home />
    </>
  )
} 