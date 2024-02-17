module.exports = {
    name: "Prices",
    description: "Returns coin(s) price in the provided currencies and more.",
    
    category: "CoinGecko",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "ids",
            "name": "Id (s)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The coin(s) ids.\n\nIds can be found with the coins list block!\n\nMust be separated by commas if more than one id.",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "currs",
            "name": "Currency (s)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The currencies.\n\nCurrencies can be found with the supported currencies block!\n\nMust be separated by commas if more than one currency.",
            "types": ["text","unspecified"],
            "required": true
        },
    ],
    
    options: [
        {
            "id": "include_market_cap",
            "name": "Include Market Cap",
            "description": "Description: Include market cap?\n\nDefault \"Yes\"",
            "type": "SELECT",
            "options": {
                "true": "Yes",
                "false": "No"
            }
        },
        {
            "id": "include_24hr_vol",
            "name": "Include 24Hr Volume",
            "description": "Description: Include 24 hour volume?\n\nDefault \"Yes\"",
            "type": "SELECT",
            "options": {
                "true": "Yes",
                "false": "No"
            }
        },
        {
            "id": "include_24hr_change",
            "name": "Include 24Hr Change",
            "description": "Description: Include 24 hour change?\n\nDefault \"Yes\"",
            "type": "SELECT",
            "options": {
                "true": "Yes",
                "false": "No"
            }
        }
    ],
    
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
            "description": "Type: Object\n\nDescription: The result.",
            "types": ["object"]
        },
    ],
    
    async code(cache) {
        const checker = async (variable) => {
            if (!this.GetInputValue(variable, cache)) return undefined; else return this.GetInputValue(variable, cache).replaceAll(" ","");
        }

        const ids = await checker("ids");
        const vs_currencies = await checker("currs");
        const imc = this.GetOptionValue("include_market_cap", cache);
        const i24v = this.GetOptionValue("include_24hr_vol", cache);
        const i24c = this.GetOptionValue("include_24hr_change", cache);

        let include_market_cap;
        let include_24hr_vol;
        let include_24hr_change;

        switch (imc) {
            case "true":
                include_market_cap = true
                break;
            case "false":
                include_market_cap = false
                break;
        };
        switch (i24v) {
            case "true":
                include_24hr_vol = true
                break;
            case "false":
                include_24hr_vol = false
                break;
        };
        switch (i24c) {
            case "true":
                include_24hr_change = true
                break;
            case "false":
                include_24hr_change = false
                break;
        };


        const axios = require('axios');
        const result = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids,
                vs_currencies,
                include_market_cap,
                include_24hr_vol,
                include_24hr_change,
            },
        });
        return response.data
    }
    
    const sresult = await result()
    
    this.StoreOutputValue(sresult, "result", cache);
    this.RunNextBlock("action", cache);
}
}
