let csv = require('../csv');
let parseData = {};

let csvData = `
id,first_name,last_name,email,gender,ip_address
1,Claybourne,Herreros,cherreros0@bigcartel.com,Male,14.104.161.197
2,Silas,McLellan,smclellan1@naver.com,Male,231.230.131.222
3,Thekla,Rapier,trapier2@chronoengine.com,Female,13.171.205.12
4,Haydon,Bartolacci,hbartolacci3@blogs.com,Male,
5,Breena,Paine,bpaine4@tinypic.com,Female,176.230.87.155
6,Hersh,Chell,hchell5@biglobe.ne.jp,Male,232.141.193.78
7,Kimbell,Lexa,klexa6@yahoo.co.jp,Male,125.194.113.56
`

test('parse and serialize csv data', () => {
	expect.assertions(2);
	return csv.parse(csvData).then(data => {
		expect(data).toMatchSnapshot()
		return data;
	}).then(csv.serialize).then(data => expect(data).toEqual(csvData.trim()))
})