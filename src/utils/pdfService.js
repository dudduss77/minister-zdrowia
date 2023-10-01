import { dirname } from 'path';
import { createLog } from './logs';

const pdf = require('html-pdf');
const fs = require('fs');

const OPTIONS = { format: 'Letter' };
const PATH = __dirname


function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

export const generatePdf = (data) => {
    let html = fs.readFileSync(__dirname + '/template.html','utf8')

    const { 
        id,
        reasonNumber,
        ownersData,
        averagePrice,
        averageNbpExchangeRate,
        cryptos
     } = data;


    const mappedCryptos = cryptos.map(item => {
        const { quantity, shortName, name, exchangeRate } = item
        let toReturn = (`
            <div class="sumRow">
                <span>${quantity} ${shortName}:</span>
                <span>1000 PLN<span>
                <span>Kurs NBP: 1 USD = ${averageNbpExchangeRate} PLN</span>                                     
            </div>
        `)

        const mappedExchangeRate = exchangeRate.map(item => {
            const { link } = item

            return `
            <div class="small">
                <span>${ link }</span>
                <span class="green">1 BTC = 120 000 PLN</span>
                <span class="green">( Wartość: 1000 PLN )</span>
                <span>- Przeliczono z USD</span>
                <span class="red">Kryptowaluta nie jest notowana na giełdzie</span>
            </div> 
            `
        })

        toReturn += (`
        <div class="sumRow">     
            ${mappedExchangeRate.join('')}                                             
        </div>
        `)

    //     toReturn += (`
    //     <div class="sumRow">                
    //     <div class="small">
    //         <span>https://www.chmes.pl/produkt/benzoesan-denatonium-bitrex/</span>
    //         <span class="red">Kryptowaluta nie jest notowana na giełdzie</span>
    //     </div>                    
    //     <div class="small">
    //         <span>https://www.chmes.pl/produkt/benzoesan-denatonium-bitrex/</span>
    //         <span class="green">1 BTC = 120 000 PLN</span>
    //         <span class="green">( Wartość: 1000 PLN )</span>
    //         <span>- Przeliczono z USD</span>
    //     </div>                    
    //     <div class="small">
    //         <span>https://www.chmes.pl/produkt/benzoesan-denatonium-bitrex/</span>
    //         <span class="green">1 BTC = 120 000 PLN</span>
    //         <span class="green">( Wartość: 1000 PLN )</span>
    //         <span>- Przeliczono z USD</span>
    //     </div>                    
    // </div>
    //     `)

        return toReturn
    })

    html = html
    .replace('<#id>', id)
    .replace('<#date>', getCurrentDate())
    .replace('<#reasonNumber>', reasonNumber)
    .replace('<#ownersData>', ownersData)
    .replace('<#averagePrice>', averagePrice)
    .replace('<#mappedCryptos>', mappedCryptos.join(''))




    return new Promise((resolve, reject) => {
        pdf.create(html, OPTIONS).toFile(PATH + "/" + id + ".pdf", function(err, res) {
            if (err) {
                console.log(err);
                return reject(err)
            }
            createLog({
                type: 'REPORT',
                data: { id }
              })
            console.log(res)
            resolve(res)
        });
    })

}