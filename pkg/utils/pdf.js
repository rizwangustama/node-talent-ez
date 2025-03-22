import path from 'path'
import fs from 'fs'
// import pdf from 'html-pdf'
// import puppeteer from 'puppeteer'

// export const htlmToPdf = async (html, name) => {
//     let option = {
//         format: "A4",
//         orientation: "potrait",
//         type: "pdf",
//         directory: "/tmp",
//         timeout: 300000,
//         border: {
//             "top": "20px",
//             "right": "20px",
//             "bottom": "30px",
//             "left": "30px"
//         },
//     }
//     let data = null
//     let base64 = null
//     let buff = null
//     name = name.replace(/\//g, "")
//     let filepath = path.join(__dirname,`./../../tmp/${name}`)
//     await Promise.all([
//         await new Promise((resolve, reject) => {
//             pdf.create(html, option).toFile(filepath, function (err, res) {
//                 if (err) return reject(err);
//                 resolve(res)
//             });
//         }),
//         await new Promise((resolve, reject) => {
//             pdf.create(html).toBuffer(function(err, buffer){
//                 if (err) return reject(err);
//                 buff = buffer
//                 base64 = buffer.toString('base64');
//                 resolve(buffer)
//             });
//         }),
//     ])
//     if (fs.existsSync(filepath)) {
//         data = filepath
//     }

//     setTimeout(() => {
//         if (fs.existsSync(data) && !save) {
//             fs.unlink(data, (err) => {
//                 console.error(err)
//             })
//         }
//     }, 1000 * 300)
//     return {
//         filepath: data,
//         base64: base64,
//         buff: buff,
//     }
// }
// export const puppeteerHtmlToPdf = async (url, name, headers, cookies) => {
//     console.log("headers",headers);
//     name = name.replace(/\//g, "")
//     let filepath = path.join(__dirname,`./../../tmp/${name}`)

//     const browser = await puppeteer.launch({
//         headless: true,
//     });
//     let page = await browser.newPage();
//     await page.setExtraHTTPHeaders({
//         'authorization': cookies.rt || headers?.authorization?.split(' ')[1]
//     })
//     await page.goto(url, {
//         waitUntil: 'networkidle2',

//     });
//     await page.emulateMediaType('screen');

//     let buff = await page.pdf({
//         path: filepath,
//         // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//         printBackground: true,
//         preferCSSPageSize: true,
//         format: 'A4',
//         margin: {
//             top: 10,
//             bottom: 0,
//             left: 0,
//             right: 0,
//         }
//     });
//     let base64 = buff.toString('base64');

//     setTimeout(() => {
//         if (fs.existsSync(filepath)) {
//             fs.unlink(filepath, (err) => {
//                 if (err) throw err
//             })
//         }
//     }, 1000 * 300)
//     return {
//         filepath: filepath,
//         base64: base64,
//         buff: buff,
//     }
// } 