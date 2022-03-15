var axios = require('axios');
const fs = require('fs')

const getPosition = (string, subString, index) => {
  return string.split(subString, index).join(subString).length;
};


const getRawData = async () => {
	try {
		var config = {
			method: 'get',
  			url: 'https://www.google.com/search?q=google+stock+price',
  			headers: { 
    				'Cookie': '1P_JAR=2022-03-15-17; NID=511=mct2HN5CGR6tYa0Sl68bcCOkLgK8zN_D34FByVD3ZvZsmoejcDMLnbkwndsLmzQJiQiXWgTU-Sw1OcFVW8jMkexZ5oFIEsn6PV83Q0iYwBXfCKn7VRQqAsMrhaC8Sj0CsiGwyg-iTkR8z8YUPgYD5S1P-W5PYf4k78_utHNosFI'
  			}
		};

		const result = await axios(config);
		const rawData = result.data;

		// get price
		const index = getPosition(rawData, "BNeawe iBp4i AP7Wnd", 2);
		const price = rawData.substring(index+21, index+31);
		console.log(price);

	} catch (err) {
		console.log(err);
	}

};

getRawData();

