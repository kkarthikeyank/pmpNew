
export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // async gotoLoginPage() {
  //   await this.page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login');
  //   // await this.page.goto(process.env.LOGIN_URL);
  // }
async gotoLoginPage() {
  await this.page.goto('https://hikepmp-dev.smilecdr.com/member-portal/#/login', {
    waitUntil: 'domcontentloaded', // Wait until DOM is ready (faster for SPAs)
    timeout: 60000                 // 60 seconds timeout for slower environments
  });
}
// }
  // async gotoLoginPage() {
  //   const loginUrl = process.env.LOGIN_URL || 'https://hikepmp-dev.smilecdr.com/member-portal/#/login';  // Fallback URL
  //   console.log('Using login URL:', loginUrl);  // Debug: Print the login URL
  //   await this.page.goto(loginUrl);
  // }
  

  async login(user, password) {
    //  async login(NAME, PASSWORD) {

    const loginButton = this.page.getByRole('button', { name: 'Login' });
    const usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    const passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    const signInButton = this.page.getByRole('button', { name: 'Sign in' });

    await loginButton.click();
    await usernameInput.fill(user);
    await passwordInput.fill(password);
    await signInButton.click();

    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 180000 });
  }
}
