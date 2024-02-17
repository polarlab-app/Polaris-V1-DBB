module.exports = {
    name: "Markets List",
    description: "Returns a markets list from CoinGecko.",
    
    category: "CoinGecko",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "vs_currency",
            "name": "Currencies",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The target currency of market data.\n\nSupported currencies can be found by the \"Supported Currencies\" block!\n\nNote: Must be separated by commas if more than one currency is provided!",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "ids",
            "name": "Ids",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The ids of the coin(s).\n\n Can be found by the \"Search\" block.\n\nNote: Must be separated by commas if more than one id is provided!\n\n(OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "category",
            "name": "Category",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Filter by coin category.\n\nCategories can be found using the \"Categories List\" block!\n\n(OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "order",
            "name": "Order",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Sort results by field.\n\nValid values: market_cap_desc, gecko_desc, gecko_asc, market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc\n\n(OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "per_page",
            "name": "Per Page",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Total results per page.\n\nMaximum value: 250, if limit was exceeded it will be reduced to 10!\n\n(OPTIONAL)",
            "types": ["number","unspecified"]
        },
        {
            "id": "page",
            "name": "Page",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Page through results.\n\n(OPTIONAL)",
            "types": ["number","unspecified"]
        },
    ],
    
    options: [
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
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: List\n\nDescription: The markets list.",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        const checker = async (variable) => {
            if (!this.GetInputValue(variable, cache)) return undefined; else return this.GetInputValue(variable, cache).replaceAll(" ","");
        }

        let vs_currency = await checker("vs_currency");
        const ids = await checker("ids");
        const category = await checker("category");
        const order = await checker("order");
        let per_page = this.GetInputValue("per_page", cache);
        let page = this.GetInputValue("page", cache);
        const sparkline = this.GetOptionValue("sparkline", cache);

        if (!per_page) {per_page = 10}
        if (!page) {page = 1}

        if (per_page > 250) {
            per_page = 10
        }

        if (!vs_currency) {
            vs_currency = "usd"
        }

        const axios = await this.require('axios');
        const result = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency,
                    ids,
                    category,
                    order,
                    per_page,
                    page,
                    sparkline
                }
        });
        return response.data
    }
    
    const sresult = await result();
    
    this.StoreOutputValue(sresult, "result", cache);
    this.RunNextBlock("action", cache);
}
}
