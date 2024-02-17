module.exports = {
    name: "Coin OHLC",
    description: "The OHLC of the provided coin id with the currency and day(s).  \n\n[\n   1594382400000 (time),\n   1.1 (open),\n   2.2 (high),\n   3.3 (low),\n   4.4 (close) \n]",
    
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
        {
            "id": "vs_currency",
            "name": "Currency",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The target currency of market data.\n\nValid currencies can be found by the \"Supported Currencies\" block!\n\nExamples: aed, usd",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "days",
            "name": "Day(s)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Data up to number of days ago.\n\nValid days: 1, 7, 14, 30, 90, 180, 365",
            "types": ["number","unspecified"],
            "required": true
        },
    ],
    
    options: [],
    
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
            "id": "error",
            "name": "Error",
            "description": "Type: List\n\nDescription: The errors list.",
            "types": ["list"]
        },
        {
            "id": "actionerr",
            "name": "Action (Wrong ID)",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks if wrong coin id provided. (ONLY USE FOR COIN ID)",
            "types": ["action"]
        },
    ],
    
    async code(cache) {
        const id = this.GetInputValue("id", cache);
        let vs_currency  = this.GetInputValue("vs_currency", cache);
        let days = this.GetInputValue("days", cache);
        
        const valid_days = [1, 7, 14, 30, 90, 180, 365];

        let errors = [];

        let success;
        if (!id) {success = false; errors.push("A coin ID must be provided! Can be obtained via the \"Search\" block.")} else {success = true};
        if (!vs_currency) {vs_currency = "usd"; errors.push("A supported currency must be provided! Can be obtained via the \"Supported Currencies\" block. Was set to \"usd\" automatically!")}
        if (!days) {vs_currency = 1; errors.push("A valid day must be provided! Valid days: (1, 7, 14, 30, 90, 180, 365). Was set to \"1\" automatically!")} else {
            if (valid_days.indexOf(days, 1 - 1) + 1 == false) {
                days = 1
                errors.push("A wrong day provided! Valid days: (1, 7, 14, 30, 90, 180, 365). Was set to \"1\" automatically!")
            }
        }

        const checker = async () => {
            if (success) {
                const axios = await this.require('axios');
                const result = async () => {
                    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}/ohlc`, {
                    params: {
                        vs_currency ,
                        days
                    }
                });
                return response.data
            }
            return result()
        }
    }
    
    const sresult = await checker();
    
    this.StoreOutputValue(errors, "error", cache)
    this.StoreOutputValue(sresult, "result", cache);
    this.RunNextBlock(success ? "action" : "actionerr", cache);
}
}
