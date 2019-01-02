var config = require('../../nightwatch.conf.js');

module.exports = { // addapted from: https://git.io/vodU0
  '@tags': ['login'],
  'Login Assert': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .assert.title('React App')
      .waitForElementVisible('input[name=userId]', 1000)
      .saveScreenshot(config.imgpath(browser) + 'nightwatch-loaded.png')
      .setValue('input[name=userId]', 'helloworld')
      .setValue('input[name=password]', '1234')
      .click('Button')
      .saveScreenshot(config.imgpath(browser) + 'nightwatch-login.png')
      .end();
  }
};
