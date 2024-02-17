module.exports = {
    name: "Coin Data",
    description: "Returns the data of the coin provided.",
    
    category: "CoinGecko",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "id",
            "name": "Coin ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The ID of the coin.\n\nCoins ids can be found by the \"Search\" block!\n\nExample: bitcoin",
            "types": ["text","unspecified"],
            "required": true
        },
    ],
    
    options: [
        {
            "id": "localization",
            "name": "Localization",
            "description": "Description: Include all localized languages in response.\n\n(OPTIONAL)",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "tickers",
            "name": "Tickers",
            "description": "Description: Include tickers data.\n\n(OPTIONAL)",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "market_data",
            "name": "Market Data",
            "description": "Description: Include market_data.\n\n(OPTIONAL)",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "community_data",
            "name": "Community Data",
            "description": "Description: Include community_data data.\n\n(OPTIONAL)",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "developer_data",
            "name": "Developer Data",
            "description": "Description: Include developer_data data.\n\n(OPTIONAL)",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "sparkline",
            "name": "Sparkline",
            "description": "Description: Include sparkline 7 days data.\n\n(OPTIONAL)",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action (Success)",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks if success.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: Object\n\nDescription: The coin data.",
            "types": ["object"]
        },
        {
            "id": "actionerr",
            "name": "Action (Error)",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks if there is an error.",
            "types": ["action"]
        },
        {
            "id": "error",
            "name": "Error",
            "description": "Type: Text\n\nDescription: The error.",
            "types": ["text"]
        },
    ],
    
    async code(cache) {
        const id = this.GetInputValue("id", cache);
        const localization = this.GetOptionValue("localization", cache);
        const tickers = this.GetOptionValue("tickers", cache);
        const market_data = this.GetOptionValue("market_data", cache);
        const community_data = this.GetOptionValue("community_data", cache);
        const developer_data = this.GetOptionValue("developer_data", cache);
        const sparkline = this.GetOptionValue("sparkline", cache);
        
        let success;
        if (!id) {success = false; this.StoreOutputValue("A coin ID must be provided! Can be obtained via the \"Search\" block.", "error", cache)} else {success = true};
        
        const checker = async () => {
            if (success) {
                const axios = await this.require('axios');
                const result = async () => {
                    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}`, {
                    params: {
                        localization,
                        tickers,
                        market_data,
                        community_data,
                        developer_data,
                        sparkline
                    }
                });
                return response.data
            }
            return result()
        }
    }
    
    const sresult = await checker();
    
    this.StoreOutputValue(sresult, "result", cache);
    this.RunNextBlock(success ? "action" : "actionerr", cache);
}
}
