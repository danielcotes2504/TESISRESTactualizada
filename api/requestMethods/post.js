const fetch = require('node-fetch');
module.exports = function() {
    this.postData = async(url, data) => {

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        })
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            throw new Error(`An error ocurred while fetching the data, error status code: ${response.status}`)
        }
    }
}