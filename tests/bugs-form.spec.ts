import { test, expect } from "@playwright/test";
import { BugsFormPage, getUserById } from "../src";

import { alertsMessage } from "../src";
import { describe } from "node:test";
const { passwordCountMessage, successfullMessage } = alertsMessage;

const user = getUserById(1);
if (!user) {
  throw new Error(`User with ID 1 not found`);
}
const { firstName, lastName, phone, email, country, password } = user;

test.describe("Form: test cases", () => {
  test("Create a register successfully", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).toBe(successfullMessage);
    expect(await bugsFormPage.getFirstNameResult()).toBe(
      `First Name: ${firstName}`
    );
    expect(await bugsFormPage.getLastNameResult()).toBe(
      `First Name: ${lastName}`
    );
    expect(await bugsFormPage.getPhoneResult()).toBe(`First Name: ${phone}`);
    expect(await bugsFormPage.getEmailResult()).toBe(`First Name: ${email}`);
    expect(await bugsFormPage.getCountryResult()).toBe(
      `First Name: ${country}`
    );
  });
  test("Terms and conditions Should be enable", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    expect(await bugsFormPage.exampleCheck1IsDisabled()).toBeFalsy();
  });

  test("Success Alert should no has 'alert-danger' class", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);

    await bugsFormPage.clickRegister();
    expect(await bugsFormPage.getAlertMessage()).toBe(successfullMessage);
    expect(await bugsFormPage.getAlertClass()).not.toContain("alert-danger");
  });
});

test.describe("First Name: test cases", () => {
  test("First Name should not entered special characters", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName("@#$%^&*");
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("First Name should be clear after submitting", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.isFirstNameEmpty()).toBeTruthy();
  });

  test("First Name should not be min characters", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName("A");
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("First Name should not be max characters", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName("A".repeat(300));
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("First Name field NOT is being validated as required", async ({
    page,
  }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("FirstName Label should has * Symbol", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();

    const firstNameLabeled = page.getByLabel("First Name");

    expect(await firstNameLabeled.textContent()).toContain("*");
  });
});

test.describe("Last Name: test cases", () => {
  test("Last Name field NOT is being validated as required", async ({
    page,
  }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("Last Name should be clear after submitting", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.isLastNameEmpty()).toBeTruthy();
  });

  test("The register lastName result should be correct ", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);

    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getFirstNameResult()).toBe(
      `First Name: ${firstName}`
    );
    expect(await bugsFormPage.getLastNameResult()).toBe(
      `Last Name: ${lastName}`
    );
  });
});

test.describe("Phone number: test cases", () => {
  test("Phone should be clear after submitting", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.isPhoneEmpty()).toBeTruthy();
  });

  test("Phone number fields is allowing space characters", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();

    await bugsFormPage.enterPhone("          ");

    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("The register Phone result should be correct ", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);

    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getPhoneResult()).toBe(`Phone Number: ${phone}`);
  });
});

test.describe("country: test cases", () => {
  test("Country Label should has * Symbol", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();

    const countryLabeled = page.getByLabel("Country");

    expect(await countryLabeled.textContent()).toContain("*");
  });

  test("Country field NOT is being validated as required", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("Select a country... should NOT be default country", async ({
    page,
  }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getCountryResult()).not.toBe(
      `Country: Select a country...`
    );
  });
});

test.describe("Email Address: test cases", () => {
  test("Email Address field NOT is being validated as required", async ({
    page,
  }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);

    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("Email Address field NOT is being validated", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress("not-valid-email");
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.getAlertMessage()).not.toBe(successfullMessage);
  });

  test("Email Address should be clear after submitting", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.isEmailAddressEmpty()).toBeTruthy();
  });
});

test.describe("Password: test cases", () => {
  test("Password should be clear after submitting", async ({ page }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterLastName(lastName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    await bugsFormPage.enterPassword(password);
    await bugsFormPage.clickRegister();

    expect(await bugsFormPage.isPasswordEmpty()).toBeTruthy();
  });

  test("Password field NOT is valdiated 20 max characters ", async ({
    page,
  }) => {
    const bugsFormPage = new BugsFormPage(page);

    await bugsFormPage.openBugsForm();
    await bugsFormPage.enterFirstName(firstName);
    await bugsFormPage.enterPhone(phone);
    await bugsFormPage.selectCountry(country);
    await bugsFormPage.enterEmailAddress(email);
    // Enter 20 characters
    await bugsFormPage.enterPassword("12345678901234567890");
    await bugsFormPage.clickRegister();

    // The validation message should not present
    expect(await bugsFormPage.getAlertMessage()).not.toBe(passwordCountMessage);
  });
});
