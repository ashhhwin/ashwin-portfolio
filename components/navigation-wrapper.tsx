"use client"

import React from 'react'
import { Navigation } from './navigation'
import Home from '@/app/page'

export function NavigationWrapper() {
  const handleShowEducation = () => {
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      const educationSection = document.getElementById('education')
      if (educationSection) {
        educationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  }

  return (
    <>
      <Navigation onShowEducation={handleShowEducation} />
      <Home />
    </>
  )
} 