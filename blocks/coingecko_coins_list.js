module.exports = {
    name: "Coins List",
    description: "Returns a coins list from CoinGecko.\n\nList length: 12284+",
    
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
            "description": "Type: List\n\nDescription: The coins list.",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        const axios = require('axios');
        const result = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/list', {
        });
        return response.data
    }
    
    const sresult = await result()
    
    this.StoreOutputValue(sresult, "result", cache);
    this.RunNextBlock("action", cache);
}
}
