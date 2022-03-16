// import frameworks
const axios = require('axios');
const fs = require('fs');
const connectDB = require('./config/db.js');

connectDB();

const Price = require('./models/Price');

const target = ["google", "apple", "tesla", "intel", "goldman+sachs"];


const getPosition = (string, subString, index) => {
  return string.split(subString, index).join(subString).length;
};

const cleanPrice = (rawString) => {
	const index = getPosition(rawString, " ", 1);
	return rawString.substring(0, index);
}

const getRawData = async (target) => {
	try {
		var config = {
			method: 'get',
  			url: `https://www.google.com/search?q=${target}+stock+price`,
  			headers: { 
    				'Cookie': '1P_JAR=2022-03-15-17; NID=511=mct2HN5CGR6tYa0Sl68bcCOkLgK8zN_D34FByVD3ZvZsmoejcDMLnbkwndsLmzQJiQiXWgTU-Sw1OcFVW8jMkexZ5oFIEsn6PV83Q0iYwBXfCKn7VRQqAsMrhaC8Sj0CsiGwyg-iTkR8z8YUPgYD5S1P-W5PYf4k78_utHNosFI'
  			}
		};

		const result = await axios(config);
		const rawData = result.data;

		// get price
		const index = getPosition(rawData, "BNeawe iBp4i AP7Wnd", 2);
		const price = rawData.substring(index+21, index+31);
		const cleaned = cleanPrice(price);

		// order data
		const dateObj = new Date();
		const date = dateObj.toDateString();
		const time = dateObj.toTimeString();

		incoming = new Price ({
			name: target,
			obtainedTime: {
				date,
				time,
			},
			price: cleaned
		});
		const res = await incoming.save();
		console.log(res);

	} catch (err) {
		console.log(err);
		//console.log(`${target}, ${err.response.status}, ${err.response.statusText}`);
	}

};

target.forEach(each => getRawData(each));
});
