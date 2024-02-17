module.exports = {
    name: "Chat GPT Reply",

    description: "",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "id",
            "name": "Organisation ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "key",
            "name": "API Key",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "response",
            "name": "Response",
            "description": "Type: Object\n\nDescription: The message obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const { Configuration, OpenAIApi } = require("openai")
        const id = this.GetInputValue("id", cache);
        const key = this.GetInputValue("key", cache);
        const text = this.GetInputValue("text", cache);

        const config = new Configuration({
            organization: id,
            apiKey: key
        })
        const openai = new OpenAIApi(config)

        const gptresponse = await openai.createCompletion({
            model: "davinci",
            prompt: `You are Polar AI, and interactive AI to assist and talk to members on Polar Lab\n\
            ChatGPT: Hello, how can I help you?\n\
            member: ${text}\n\
            ChatGPT:`,
            temperature: 0.8,
            max_tokens: 100,
            stop: ["ChatGPT:", "member:"]
        })
        const response = gptresponse.data.choices[0].text

        this.StoreOutputValue(response, "response", cache);
        this.RunNextBlock("action", cache);
    }
}