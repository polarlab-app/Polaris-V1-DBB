module.exports = {
    name: "Get Interaction Message Buttons",

    description: "Gets the Buttons from a Interaction Message Object by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object\n\nDescription: The Message Object",
            "types": ["Object"],
            "required": true
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
            "id": "buttons",
            "name": "Buttons",
            "description": "Type: List\n\nDescription: The Property CustomID Obtained.",
            "types": ["list", "unspecified"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);

        let buttons;

        buttons = message.components[0]['components'];

        this.StoreOutputValue(buttons, "buttons", cache);
        this.RunNextBlock("action", cache);
    }
}