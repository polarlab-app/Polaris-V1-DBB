module.exports = {
    name: "Supported Currencies",
    description: "Returns all of the supported currencies.",
    
    category: "CoinGecko",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
    ],
    
    options: [],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: List\n\nDescription: The suppoted currencies.",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        const axios = require('axios');
        const supCur = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies', {
        });
        return response.data
    }
    
    const resSupCur = await supCur()
    
    this.StoreOutputValue(resSupCur, "result", cache);
    this.RunNextBlock("action", cache);
}
}
