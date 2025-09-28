const { remote } = require('webdriverio');
const assert = require('assert');

describe('DevOps7.3 Web Server Test', function () {
  let driver;

  before(async function () {
    driver = await remote({
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
      }
    });
  });

  it('should load the website and verify title', async function () {
    await driver.url('http://localhost:3000');
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Welcome to DevOps7.3 webApp', 'Website title does not match expected value');
  });

  it('should verify the main heading exists', async function () {
    await driver.url('http://localhost:3000');
    const heading = await driver.$('h1');
    const text = await heading.getText();
    assert.strictEqual(text, 'Welcome to DevOps7.3 webApp', 'Heading text does not match');
  });

  after(async function () {
    await driver.deleteSession();
  });
});