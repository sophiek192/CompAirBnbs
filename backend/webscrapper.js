import axios from 'axios';
import fs from 'fs';

async function getBnbInfo(/*links bnbLinks[]*/) {
    try {
        const response = await axios.get(
            'https://www.airbnb.com.au/rooms/40900197?adults=1&category_tag=Tag%3A8186&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&check_in=2023-07-24&check_out=2023-07-29&source_impression_id=p3_1688208910_4XEneGtR6Etd5XQc&previous_page_section_name=1000&federated_search_id=0a68c266-4b11-4ce0-8ef5-e66fef1a3faa'
        );
        // console.log(response.data);

        fs.writeFile('output.html', response.data, (err) => {
            if (err) throw err;
        });

        const rawName = response.data.match(/<meta property="og:description" content=[^\/]*\/>/);
        const name = rawName[0].replace('<meta property="og:description" content="', "").replace('"/>', "");
        const rawRoomInfo = response.data.match(/<meta property="og:title" content=[^\/]*\/>/);
        const amenities = response.data.match(/{"niobeMinimalClientData"[^<]*/);
        //const cost = response.data.match();
        const starRating = rawRoomInfo[0].replace(/[^0-9]*/, "").replace(/\s.*/, "");
        const bedrooms = rawRoomInfo[0].match(/[0-9]+ bedrooms?/)[0].replace(/\s[^0-9]*/, "");;
        const beds = rawRoomInfo[0].match(/[0-9]+ beds?/)[0].replace(/\s[^0-9]*/, "");;
        const bathrooms = rawRoomInfo[0].match(/[0-9]+ baths?/)[0].replace(/\s[^0-9]*/, "");
        //const rooms = rawRoomInfo[0].match(/\s[0-9][a-zA-Z]*(\s|")/g);
        console.log(beds);
        //const amenities = rawAmenities.replace("", "")

        const data = JSON.parse(amenities);
        
        const img = data.niobeMinimalClientData[0][1].data.presentation.stayProductDetailPage.sections.metadata.seoFeatures.relImageSrc;
        console.log(data.niobeMinimalClientData[0][1].data.presentation.stayProductDetailPage.sections.metadata.seoFeatures.relImageSrc);
        //console.log(data.niobeMinimalClientData[0][1].data.presentation.stayProductDetailPage.sections);
          
        console.log(name);
        //console.log(result[0]);
        console.log(img);
        //console.log(amenities[0]);
       // Internet and office
        
        const bnb = {
            name: name,
            // totalCost: ,
            // costpp: ,
            starRating: starRating,
            wifi: true,
            images: img,
            bedrooms: parseInt(bedrooms),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
        }
        console.log(bnb);
        return bnb;

    } catch (error) {
        console.error(error);
    }
}

getBnbInfo();

// import puppeteer from 'puppeteer';

// (async() => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     //await page.goto("https://www.airbnb.com.au/rooms/41508496?adults=1&category_tag=Tag%3A8186&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&check_in=2023-08-06&check_out=2023-08-11&source_impression_id=p3_1688197340_ZTpeKseMs7wUmaPX&previous_page_section_name=1000&federated_search_id=a2f26ee7-c80f-46c7-94a2-090403130658E");
//     await page.goto("https://kenjimmy.me");
//     await page.screenshot({ path: "example.png" });  

//     await browser.close();
// })

// import puppeteer from "puppeteer";

// const getQuotes = async () => {
//   // Start a Puppeteer session with:
//   // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
//   // - no default viewport (`defaultViewport: null` - website page will in full width and height)
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//   });

//   // Open a new page
//   const page = await browser.newPage();

//   // On this new page:
//   // - open the "http://quotes.toscrape.com/" website
//   // - wait until the dom content is loaded (HTML is ready)
//   await page.goto("https://www.airbnb.com.au/?c=.pi0.pk145025231_9003698711&ghost=true&gclid=CjwKCAjw-vmkBhBMEiwAlrMeFyCMLre-N51Nj31-rK1CThjY8GKqjZih3FVhxJaE28-0q4jdRs9TMBoCeogQAvD_BwE", {
//     waitUntil: "domcontentloaded",
//   });
// };

// // Start the scraping
// getQuotes();