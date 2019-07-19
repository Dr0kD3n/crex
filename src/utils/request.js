import axios from 'axios';

export const sendRequest = ({ method, url, data, success, fail }) => {
	axios({
		method,
		url,
		data,
	})
	.then((res) => {
		success(res);
	})
	.catch((err) => {
		console.log(`error ${method} -> ${url} ${err}`);
		fail(err);
	});
};
