const webdriver = require('selenium-webdriver');
async function runTestWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://sykim_oaqj2N:sBgqBXHdBUu7mdkm7zsS@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build();

    await driver.get("http://www.google.com");
    //.then() testing starts here
    const inputField = await driver.findElement(webdriver.By.name("q"));
    await inputField.sendKeys("BrowserStack", webdriver.Key.ENTER); // this submits on desktop browsers
    try {
      await driver.wait(webdriver.until.titleMatches(/BrowserStack/i), 5000);
    } catch (e) {
      await inputField.submit(); // this helps in mobile browsers
    }
    try {
      await driver.wait(webdriver.until.titleMatches(/BrowserStack/i), 5000);
      console.log(await driver.getTitle());
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Title contains BrowserStack!"}}'
      );
    } catch (e) {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Page could not load in time"}}'
      );
    }
    await driver.quit();
  }

const capabilities1 = {
  'browserName': 'chrome',
  'browser_version': 'latest',
  'os': 'Windows',
  'os_version': '10',
  'build': 'BStack-[NodeJS] Sample Build',
  'name': 'Parallel test 1'
}

const capabilities2 = {
  'browserName': 'firefox',
  'browser_version': 'latest-beta',
  'os': 'Windows',
  'os_version': '10',
  'build': 'BStack-[NodeJS] Sample Build',
  'name': 'Parallel test 2'
}

const capabilities3 = {
  'device': 'iPhone 12 Pro',
  'browserName': 'iPhone',
  'os_version': '14',
  'real_mobile': 'true',
  'build': 'BStack-[NodeJS] Sample Build',
  'name': 'Parallel test 3'
}

const capabilities4 = {
  'device': 'Samsung Galaxy S20',
  'browserName': 'Android',
  'os_version': '11.0',
  'real_mobile': 'true',
  'build': 'BStack-[NodeJS] Sample Build',
  'name': 'Parallel test 4'
}

const capabilities5 = {
  'browserName': 'Safari',
  'browser_version': 'latest',
  'os': 'OS X',
  'os_version': 'Big Sur',
  'build': 'BStack-[NodeJS] Sample Build',
  'name': 'Parallel test 5'
}


runTestWithCaps(capabilities1);
runTestWithCaps(capabilities2);
runTestWithCaps(capabilities3);
//runTestWithCaps(capabilities4);
runTestWithCaps(capabilities5);