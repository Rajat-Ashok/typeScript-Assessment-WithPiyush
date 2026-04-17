import { test, expect } from '@playwright/test'; 
 
test('Verify successful login', async ({ page }) => { 
 
  await page.goto('https://practicetestautomation.com/practice-test-login/', { waitUntil: 'domcontentloaded' , timeout: 60000 }); 
 
  await page.fill('#username', 'student'); 
 
  await page.fill('#password', 'Password123'); 
 
  await page.waitForSelector('#submit', { state: 'visible', timeout: 60000 });
  await page.click('#submit'); 
 
  await page.waitForTimeout(5000); 
 
  const successMessage = page.getByRole('heading', { name: 'Logged In Successfully'}); 
  await successMessage.waitFor({ state: 'visible', timeout: 60000 });
  await expect(successMessage).toBeVisible(); 
 
}); 