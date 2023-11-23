import test, { expect } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // check landing page
  await expect(
    page.getByRole('heading', { name: 'TechNewZ', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Welcome to TechNewZ' }),
  ).toBeVisible();
  await expect(page.getByText('Stay ahead of the curve with')).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'comment section of the news' }),
  ).toBeVisible();
  await expect(page.getByText('At TechNewZ, we believe in')).toBeVisible();
  await expect(page.getByRole('img', { name: 'profile' })).toBeVisible();

  await expect(page.getByText('Create your own space in the')).toBeVisible();

  await expect(page.getByText('With Personal Blog Posts, you')).toBeVisible();

  await expect(
    page.getByRole('img', { name: 'Blog post', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Your thoughts are important')).toBeVisible();

  // registration part
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.goto('http://localhost:3000/register');
  await expect(page.getByLabel('User Name')).toBeVisible();
  await page.getByLabel('User Name').click();
  await page.getByLabel('User Name').fill('test');
  await page.getByLabel('E-Mail').click();
  await page.getByLabel('E-Mail').fill('test@mail.io');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('test');
  await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  await page.getByRole('link', { name: 'Already have an account?' }).click();
  await page.goto('http://localhost:3000/signin');
});
