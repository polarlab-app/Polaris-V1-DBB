module.exports = {
    name: "Categories List",
    description: "Returns a categories list from CoinGecko.",
    
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
            "description": "Type: List\n\nDescription: The categories list.",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        const axios = await this.require('axios');
        const result = async () => {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/categories/list', {
        });
        return response.data
    }
    
    const sresult = await result();
    
    this.StoreOutputValue(sresult, "result", cache);
    this.RunNextBlock("action", cache);
}
}
