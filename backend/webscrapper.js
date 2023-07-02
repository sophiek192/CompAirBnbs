import axios from 'axios';
import fs from 'fs';

export async function getBnbInfo(airbnbLink) {
    try {
        const response = await axios.get(
            airbnbLink
            //'https://www.airbnb.com.au/rooms/40900197?adults=1&category_tag=Tag%3A8186&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&check_in=2023-07-24&check_out=2023-07-29&source_impression_id=p3_1688208910_4XEneGtR6Etd5XQc&previous_page_section_name=1000&federated_search_id=0a68c266-4b11-4ce0-8ef5-e66fef1a3faa'
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

        const bedrooms = rawRoomInfo[0].match(/[0-9]+ bedrooms?/);
        bedrooms !== null ? bedrooms[0].replace(/\s[^0-9]*/, "") : bedrooms = 0;
        const beds = rawRoomInfo[0].match(/[0-9]+ beds?/)[0].replace(/\s[^0-9]*/, "");
        beds !== null ? bedrooms[0].replace(/\s[^0-9]*/, "") : beds = 0;
        const bathrooms = rawRoomInfo[0].match(/[0-9]+ baths?/)[0].replace(/\s[^0-9]*/, "");
        bathrooms !== null ? bathrooms[0].replace(/\s[^0-9]*/, "") : bathrooms = 0;
        //const rooms = rawRoomInfo[0].match(/\s[0-9][a-zA-Z]*(\s|")/g);
        //console.log(bedrooms);

        const data = JSON.parse(amenities);
        //const wifi = amenities[0].match(/"title": "Wi-Fi.*/);
        //console.log(wifi);
        const img = data.niobeMinimalClientData[0][1].data.presentation.stayProductDetailPage.sections.metadata.seoFeatures.relImageSrc;
        console.log(data.niobeMinimalClientData[0][1].data.presentation.stayProductDetailPage.sections.metadata.seoFeatures.relImageSrc);
        //console.log(data.niobeMinimalClientData[0][1].data.presentation.stayProductDetailPage.sections.sections.find(sectionId = ).seeAllAmenitiesGroups.find(title.localCompare("Internet and office") === 0)));
          
        console.log(name);
        //console.log(result[0]);
        console.log(img);
        //console.log(amenities[0]);
       // Internet and office
        
        const bnb = {
            name: name,
            totalCost: 750.33,
            starRating: starRating,
            wifi: true,
            image: img,
            bedrooms: parseInt(bedrooms),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
            leftSwipe:[],
            rightSwipe: []
        }
        //console.log(bnb);
        return bnb;

    } catch (error) {
        console.error(error);
    }
}

// getBnbInfo();