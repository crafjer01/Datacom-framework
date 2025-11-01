import { Page } from "@playwright/test";

export class BugsFormPage {
  private readonly page;

  private readonly firstNameInput = "#firstName";
  private readonly lastNameInput = "#lastName";
  private readonly phoneInput = "#phone";
  private readonly passwordInput = "#password";
  private readonly emailAddressInput = "#emailAddress";
  private readonly countries_dropdown_menu = "#countries_dropdown_menu";
  private readonly exampleCheck1 = "#exampleCheck1";
  private readonly registerButton = "#registerBtn";
  private readonly messageAlert = "#message";

  private readonly resultFn = "#resultFn";
  private readonly resultLn = "#resultLn";
  private readonly resultPhone = "#resultPhone";
  private readonly resultCountry = "#country";
  private readonly resultEmail = "#resultEmail";

  constructor(page: Page) {
    this.page = page;
  }

  async openBugsForm() {
    await this.page.goto("/bugs-form");
    return this;
  }

  async enterFirstName(firstName: string) {
    await this.page.fill(this.firstNameInput, firstName);
    return this;
  }

  async isFirstNameEmpty(): Promise<boolean> {
    const firstNameValue = await this.page
      .locator(this.firstNameInput)
      .inputValue();
    return firstNameValue === "";
  }

  async enterLastName(lastName: string) {
    await this.page.fill(this.lastNameInput, lastName);
    return this;
  }

  async isLastNameEmpty(): Promise<boolean> {
    const lastNameValue = await this.page
      .locator(this.lastNameInput)
      .inputValue();
    return lastNameValue === "";
  }

  async enterPhone(phone: string) {
    await this.page.fill(this.phoneInput, phone);
    return this;
  }

  async isPhoneEmpty(): Promise<boolean> {
    const phoneValue = await this.page.locator(this.phoneInput).inputValue();
    return phoneValue === "";
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
    return this;
  }

  async isPasswordEmpty(): Promise<boolean> {
    const passwordValue = await this.page
      .locator(this.passwordInput)
      .inputValue();
    return passwordValue === "";
  }

  async enterEmailAddress(email: string) {
    await this.page.fill(this.emailAddressInput, email);
    return this;
  }

  async isEmailAddressEmpty(): Promise<boolean> {
    const emailAddressValue = await this.page
      .locator(this.emailAddressInput)
      .inputValue();
    return emailAddressValue === "";
  }

  async selectCountry(country: string) {
    await this.page.locator(this.countries_dropdown_menu).selectOption(country);
    return this;
  }

  async exampleCheck1IsDisabled(): Promise<boolean> {
    return await this.page.locator(this.exampleCheck1).isDisabled();
  }

  async clickRegister() {
    await this.page.click(this.registerButton);
    return this;
  }

  async getAlertMessage() {
    return await this.page.textContent(this.messageAlert);
  }

  async getAlertClass() {
    return this.page.locator(this.messageAlert).getAttribute("class");
  }

  async getFirstNameResult() {
    return await this.page.textContent(this.resultFn);
  }

  async getLastNameResult() {
    return await this.page.textContent(this.resultLn);
  }

  async getPhoneResult() {
    return await this.page.textContent(this.resultPhone);
  }

  async getEmailResult() {
    return await this.page.textContent(this.resultEmail);
  }

  async getCountryResult() {
    return await this.page.textContent(this.resultCountry);
  }
}
