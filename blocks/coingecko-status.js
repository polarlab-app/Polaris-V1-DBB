module.exports = {
    name: "CoinGecko Ping",
    description: "Returns a message if the api is online!",
    
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
            "id": "status",
            "name": "Status",
            "description": "Type: Action\n\nDescription: The api status/ping message.",
            "types": ["text"]
        },
    ],
    
    async code(cache) {
        const axios = require('axios');
        const coinGecko = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/ping', {
        });
        return response.data.gecko_says
    }
    
    const res = await coinGecko()
    
    this.StoreOutputValue(res, "status", cache);
    this.RunNextBlock("action", cache);
}
}
