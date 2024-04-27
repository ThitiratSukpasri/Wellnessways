const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

// Function to navigate to a page and assert its title
async function navigateAndAssertTitle(driver, url, expectedTitle) {
  await driver.get(url);
  await driver.wait(until.titleContains(expectedTitle), 10000);
  const pageTitle = await driver.getTitle();
  assert.strictEqual(pageTitle, expectedTitle, `Page title '${pageTitle}' doesn't match expected '${expectedTitle}'`);
  return pageTitle;
}

// Function to click on a link and navigate to the corresponding page
async function clickLinkAndNavigate(driver, linkText, expectedTitle) {
  const link = await driver.findElement(By.linkText(linkText));
  await link.click();
  return await navigateAndAssertTitle(driver, driver.getCurrentUrl(), expectedTitle);
}

describe("Navigate to localhost:3000 and login", function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("Check if login is successful", async function () {
    await navigateAndAssertTitle(driver, "http://localhost:3000/", "Login");

    await driver.findElement(By.id("email")).sendKeys("thitirat.min@hotmail.com");
    await driver.findElement(By.id("password")).sendKeys("test");
    await driver.findElement(By.className("btn-primary")).click();

    await navigateAndAssertTitle(driver, "http://localhost:3000/homepage.html", "Homepage");
  });

  it("Check if BMI page is successful", async function () {
    await navigateAndAssertTitle(driver, "http://localhost:3000/homepage.html", "Homepage");

    await clickLinkAndNavigate(driver, "BMI", "BMI Calculator");
  });

  it("Check if My Profile page is successful", async function () {
    await navigateAndAssertTitle(driver, "http://localhost:3000/homepage.html", "Homepage");

    await clickLinkAndNavigate(driver, "My profile", "My Profile");
  });

  it("Check if Menu calories page is successful", async function () {
    await navigateAndAssertTitle(driver, "http://localhost:3000/homepage.html", "Homepage");

    await clickLinkAndNavigate(driver, "Menu calories", "Menu calories");
  });
 
  
});
