var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
	until = webdriver.until,
	assert = webdriver.Assert;;
let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

function quitDriver(done) {
    console.log("WebDriver is about to close.");
    driver.close(done);
}
function handleFailure(err) {
    console.error('Something went wrong!\n', err.stack, '\n');
    quitDriver();
}

describe('Selenium Test Case', function () {
    it('should execute test case without errors', function (done) {
        //driver.get("http://www.bing.com/");
        //driver.get("http://www.example.com/");
        driver.get("http://demo.guru99.com/test/upload/").then(function(){
            driver.findElement(By.id("uploadfile_0")).then(function (uploadElement) {
                // enter the file path onto the file-selection input field
                uploadElement.sendKeys("C:\\test.txt");
    
                // check the "I accept the terms of service" check box
                driver.findElement(By.id("terms")).click();
    
                // click the "UploadFile" button
                driver.findElement(By.name("send")).click();
            });
        }).then(function () {
			done();
		}).catch(function (err) {
            console.log("err - ", err);
            done.bind(this, err)();
        });
    });
});