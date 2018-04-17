import axios from 'axios'
const method = 'POST';
const CLIENT_ID = '993793b1d8d3e2e'
const headers = {
	// "Accept": "application/json",
	// "Content-type": "application/json;charset=UTF-8",
    'Authorization': 'Client-ID ' + CLIENT_ID
};
 
/*
using fetch with { "mode": "no-cors" } you can only set
	application/x-www-form-urlencoded
	multipart/form-data
	text/plain
to the Content-Type

// for example
const noCors = { "mode": "no-cors" };
const apiEndpoint = "http://localhost:8888";
*/

const apiEndpoint = ".";

export const getLanguage = () => {
	const lang = /^\w+/.exec(navigator.language)[0];
	return fetch(`./translations/lang.${lang}.json`/*, { ...noCors }*/)
		.then(res => res.json())
		.then(json => json)
};

export const getTemplate = (templateId) => {
	return fetch(new Request(templateId?`${apiEndpoint}/template/${templateId}`:`/template.json`/*, { ...noCors }*/))
		.then(res => res.json())
		.then(json => json)
};

export const getComponents = () => {
	return fetch(new Request(`./components.json`/*, { ...noCors }*/))
		.then(res => res.json())
		.then(json => json)
};
//
// export const saveImage = (file) => {
// 	var formData = new FormData();
// 	formData.append('file', file);
// 	const params = {
// 		method,
// 		// ...noCors,
// 		body: formData,
// 	};
// 	return fetch(new Request(`${apiEndpoint}/image`, params))
// 		.then(res => res.json())
// 		.then(json => json)
// };


export const saveImage = (file) => {
    var formData = new FormData()
    formData.append('type', 'file')
    formData.append('image', file)

    return fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Client-ID dc708f3823b7756'// imgur specific
        },
        body: formData
    })
        .then(res => res.json())
        .then(json => json)

};


// export const saveImage = (file) => {
//     const CLIENT_ID = '993793b1d8d3e2e'
//
//     var formData = new FormData();
//     formData.append('image', file)
//
// return axios({
//         url: 'https://api.imgur.com/3/image',
//         method: 'POST',
//         headers: {
//             'Authorization': 'Client-ID ' + CLIENT_ID
//         },
//         data: formData
//     })
//         .then((result) => {
//             console.log(result);
//             result.url = result.data.data.link;
//             console.log(result.url);
//         })
//
//         .catch((err) => {
//             console.log(err);
//         })
//
// };

export const saveTemplate = ({ id, html, name, template }) => {
/*
with noCors use this
	var formData = new FormData();
	formData.append('html', html);
	formData.append('name', name);
	formData.append('template', JSON.stringify(template));
*/


	// const params = {
	// 	method,
	// 	headers,
	// 	// ...noCors,
	// 	body: JSON.stringify({ html, name, template }) // formData
	// };
	// return fetch(new Request(`${apiEndpoint}/template/${id||'null'}`, params))
	// 	.then(res => res.json())
	// 	.then(json => json)
    function downloadCurrentDocument() {
        let content = encodeURIComponent(html),
            a = document.createElement('a'),
            e = new MouseEvent('click');

        a.download = name+'.html';
        a.href = ' data:'+  'text/html || text/plain'+';charset=utf-8,'+  content;
        a.dispatchEvent(e);
    }

    downloadCurrentDocument();
};

export const sendTestEmail = ({ email, html }) => {
/*
with noCors use this
	var formData = new FormData();
	formData.append('html', html);
	formData.append('email', email);
*/
	const params = {
		method,
		headers,
		// ...noCors,
		body: JSON.stringify({ email, html }) // formData
	};
	return fetch(new Request(`${apiEndpoint}/send`, params))
		.then(res => res.json())
		.then(json => json)
};
