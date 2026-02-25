const loginWith = async (page, username, password) => {
  await page.getByLabel("Username").fill(username)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", { name: "Login" }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click();
  await page.getByRole('textbox', { name: 'Title:' }).fill(title);
  await page.getByRole('textbox', { name: 'Author:' }).fill(author);
  await page.getByRole('textbox', { name: 'Url:' }).fill(url);
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText(title).waitFor()
}

export { loginWith, createBlog }
