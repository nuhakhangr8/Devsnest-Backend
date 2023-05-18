const puppeteer = require("puppeteer");
const fs = require("fs")
const data = {
    list:[],
};
async function main(skill){
    const browser = puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=`,{
        timeout:0,
        waitUntil:'networkidle0',
    })

    const jobData = await page.evaluate(async (data)=>{
        const items = document.querySelectorAll("td.resultContent");
        items.forEach((item,index)=>{
            console.log(`scrapping data of product: ${index}`);
            const title = item.querySelector('h2.jobTitle>a')?.innerText;
            const link = item.querySelector('h2.jobTitle>a')?.href;
            let salary = item.querySelector('div.metadata.salary-snippet-container')?.innerText;
            const companyName = item.querySelector('span.companyName')?.innerText;

            if(salary===null){
                salary = "salary not defined";
            }

            data.list.push({
                title,
                salary,
                company,
                link,
            })
        });
        return data;
    },data);

    let response = await jobData;
    let json = await JSON.stringify(jobData,null,2)
    fs.writeFile('job.json',json,'utf-8',()=>{
        console.log("written in job.json")
    })
    browser.close();
    return response;
}


module.exports = main

//  Get a screenshot of the page
// await page.screenshot({ path: 'example.png', fullPage: true });
//  Get a PDF of the page
// await page.pdf({ path: 'example.pdf', format: 'A4' });