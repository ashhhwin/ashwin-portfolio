import { test, expect } from '@playwright/test'

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Ashwin Ram Venkataraman/)
    await expect(page.locator('h1')).toContainText('Ashwin Ram Venkataraman')
  })

  test('should toggle dark mode', async ({ page }) => {
    // Check initial theme
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('class')
    
    // Find and click theme toggle button
    const themeToggle = page.locator('[data-testid="theme-toggle"]').or(page.locator('button').filter({ hasText: 'Toggle theme' }))
    await themeToggle.click()
    
    // Wait for theme change
    await page.waitForTimeout(500)
    
    // Check if theme changed
    const newTheme = await html.getAttribute('class')
    expect(newTheme).not.toBe(initialTheme)
  })

  test('should navigate to sections smoothly', async ({ page }) => {
    // Test navigation to About section
    const aboutLink = page.locator('a[href="#about"]')
    await aboutLink.click()
    
    // Wait for smooth scroll
    await page.waitForTimeout(1000)
    
    // Check if we're in the about section
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()
    
    // Test navigation to Skills section
    const skillsLink = page.locator('a[href="#skills"]')
    await skillsLink.click()
    
    await page.waitForTimeout(1000)
    
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeVisible()
  })

  test('should have responsive navigation', async ({ page }) => {
    // Test mobile navigation
    await page.setViewportSize({ width: 768, height: 1024 })
    
    // Check if hamburger menu is visible
    const hamburger = page.locator('button').filter({ has: page.locator('svg') })
    await expect(hamburger).toBeVisible()
    
    // Click hamburger menu
    await hamburger.click()
    
    // Check if mobile menu is visible
    const mobileMenu = page.locator('nav').locator('div').filter({ hasText: 'Home' })
    await expect(mobileMenu).toBeVisible()
  })

  test('should display all sections', async ({ page }) => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact']
    
    for (const section of sections) {
      const sectionElement = page.locator(`#${section}`)
      await expect(sectionElement).toBeVisible()
    }
  })

  test('should have working contact form', async ({ page }) => {
    // Navigate to contact section
    await page.goto('http://localhost:3000/#contact')
    
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="subject"]', 'Test Subject')
    await page.fill('textarea[name="message"]', 'This is a test message')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Check for success message (since it's a demo)
    await expect(page.locator('text=Message sent successfully')).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    
    // Check if focus is on navigation
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Test keyboard navigation through sections
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    
    // Should navigate to the focused section
    await page.waitForTimeout(1000)
  })
}) 