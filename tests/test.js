const {Builder, By, Key, until} = require('selenium-webdriver');
const axios = require('axios')

let driver

beforeAll(async () => {
    try{
        driver = await new Builder().forBrowser('chrome').build()
        await driver.get('http://localhost:3000/')
    }
    catch(e){
        console.log(e)
    }
    
})

afterAll(async () => {
    try {
        await driver.quit();
        console.log("driver is shot")
        await axios.get('http://localhost:3000/reset') 
    }
    catch(e){
        console.log(e)
    }
})

test('#1 - Verify that data is loaded', async () => {
    try{
        let tbodycars = await driver.findElement(By.id('tbodycars'))
        let rows = await tbodycars.findElements(By.xpath('.//tr'))
        expect(rows.length).toBe(5)
    }
    catch(e){
        console.log(e)
    }

})

test('#2 - Filter 2002', async () => {
    try{
        let filtere = await driver.findElement(By.id('filter')).sendKeys('2002')
        let tbodycars = await driver.findElement(By.id('tbodycars'))
        let rows = await tbodycars.findElements(By.xpath('.//tr'))
        expect(rows.length).toBe(2)
    }
    catch(e){
        console.log(e)
    }

})

test('#3 - Clearing', async () => {
    try{
        await driver.findElement(By.id('filter')).sendKeys(Key.BACK_SPACE,Key.BACK_SPACE,Key.BACK_SPACE,Key.BACK_SPACE)
        let tbodycars = await driver.findElement(By.id('tbodycars'))
        let rows = await tbodycars.findElements(By.xpath('.//tr'))
        expect(rows.length).toBe(5)
    }
    catch(e){
        console.log(e)
    }

})
test('#4 - Sorting', async () => {
    try{
        await driver.findElement(By.id('h_year')).click()
        let tbodycars = await driver.findElement(By.id('tbodycars'))
        let car1 = await tbodycars.findElement(By.xpath('.//tr[1]//td[1]')).getText()
        let car2 = await tbodycars.findElement(By.xpath('.//tr[5]//td[1]')).getText()
        expect(car1).toBe("938")
        expect(car2).toBe("940")
    }
    catch(e){
        console.log(e)
    }

})

test('#5 - Editing', async () => {
    try{
       
        let tbodycars = await driver.findElement(By.id('tbodycars'))
        await tbodycars.findElement(By.xpath('.//tr[1]//td[8]//a[1]')).click()
        let desc = await driver.findElement(By.id('description'))
        desc.clear()
        desc.sendKeys('Cool Car')
        await driver.findElement(By.id('save')).click()
        let res = await tbodycars.findElement(By.xpath('.//tr[2]//td[6]')).getText()
        expect(res).toBe('Cool Car')

    }
    catch(e){
        console.log(e)
    }

})

test('#6 - New Car Error Msg', async () => {
    try{
       await driver.findElement(By.id('new')).click()
       await driver.findElement(By.id('save')).click()
       
       expect(await driver.findElement(By.id('submiterr')).getText()).toBe("All fields are required")
       

    }
    catch(e){
        console.log(e)
    }

})

test('#7 - New Car Entry', async () => {
    try{
       

       await driver.findElement(By.id('new')).click()
       await driver.findElement(By.id('year')).sendKeys('2008')
       await driver.findElement(By.id('registered')).sendKeys('2002-05-05')
       await driver.findElement(By.id('make')).sendKeys('Kia')
       await driver.findElement(By.id('model')).sendKeys('Rio')
       await driver.findElement(By.id('description')).sendKeys('As new')
       await driver.findElement(By.id('price')).sendKeys('31000')
       await driver.findElement(By.id('save')).click()

       let tbodycars = await driver.findElement(By.id('tbodycars'))
       let rows = await tbodycars.findElements(By.xpath('.//tr'))
       expect(rows.length).toBe(6)

    }
    catch(e){
        console.log(e)
    }

})