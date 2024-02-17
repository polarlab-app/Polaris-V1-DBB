module.exports = {
    name: "CoinGecko Search",
    description: "Search for coins, categories and exchanges listed on CoinGecko ordered by largest Market Cap first.",
    
    category: "CoinGecko",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "query",
            "name": "Query",
            "description": "Acceptable Types: Action\n\nDescription: What to search for.\n\nCan search for coins, categories and exchanges\n\nExample: Bitcoin",
            "types": ["text", "unspecified"],
            "required": true
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
            "description": "Type: List, Text\n\nDescription: The coins search result.\n\nReturns \"null\" if no result.",
            "types": ["list", "text"]
        },
        {
            "id": "categs",
            "name": "Categories",
            "description": "Type: List, Text\n\nDescription: The categories search result.\n\nReturns \"null\" if no result.",
            "types": ["list", "text"]
        },
        {
            "id": "exchanges",
            "name": "Exchanges",
            "description": "Type: List, Text\n\nDescription: The exchanges search result.\n\nReturns \"null\" if no result.",
            "types": ["list", "text"]
        },
    ],
    
    async code(cache) {
        const query = this.GetInputValue("query" | "text", cache);
        
        const axios = require('axios');
        const search = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/search', {
            params: {
                query
            },
        });
        return response.data
    }

    const sresult = await search()

    let scoins;
    let scategories;
    let exchanges;


    const MaxSearchAmount = 15;

    if (sresult.coins.length >= MaxSearchAmount) {
        scoins = sresult.coins.slice(0,MaxSearchAmount);
    } else {
        scoins = sresult.coins.slice(0,sresult.coins.length);
    };
    if (sresult.categories.length >= MaxSearchAmount) {
        scategories = sresult.categories.slice(0,MaxSearchAmount);
    } else {
        scategories = sresult.categories.slice(0,sresult.categories.length);
    };
    if (sresult.exchanges.length >= MaxSearchAmount) {
        exchanges = sresult.exchanges.slice(0,MaxSearchAmount);
    } else {
        exchanges = sresult.exchanges.slice(0,sresult.exchanges.length);
    };


    if (!scoins.length) {
        scoins = null
    }
    if (!scategories.length) {
        scategories = null
    }
    if (!exchanges.length) {
        exchanges = null
    }

    this.StoreOutputValue(scoins, "coins", cache);
    this.StoreOutputValue(scategories, "categs", cache);
    this.StoreOutputValue(exchanges, "exchanges", cache);    

    this.RunNextBlock("action", cache);
}
}
