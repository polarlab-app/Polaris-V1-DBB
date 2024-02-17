module.exports = {
    name: "Trending",
    description: "Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)",
    
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
            "id": "coins",
            "name": "Coins",
            "description": "Type: List\n\nDescription: The trending coins list.",
            "types": ["list"]
        },
        {
            "id": "exchanges",
            "name": "Exchanges",
            "description": "Type: List\n\nDescription: The trending exchanges list.\n\nMight be empty!",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        const axios = require('axios');
        const result = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/search/trending', {
        });
        return response.data
    }
    
    const sresult = await result()

    this.StoreOutputValue(sresult.coins, "coins", cache);
    this.StoreOutputValue(sresult.exchanges, "exchanges", cache);
    this.RunNextBlock("action", cache);
}
}
