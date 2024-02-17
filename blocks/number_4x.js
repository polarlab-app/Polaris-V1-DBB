module.exports = {
    name: "Number 4x",

    description: "Creates 4 numbers to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "number1",
            "name": "Text 1",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number2",
            "name": "Text 2",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number3",
            "name": "Text 3",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number4",
            "name": "Text 4",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "number1",
            "name": "Number 1",
            "description": "Type: Text\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number2",
            "name": "Number 2",
            "description": "Type: Text\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number3",
            "name": "Number 3",
            "description": "Type: Text\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number4",
            "name": "Number 4",
            "description": "Type: Text\n\nDescription: The number.",
            "types": ["number"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("number1", cache), "number1", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("number2", cache), "number2", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("number3", cache), "number3", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("number4", cache), "number4", cache, "inputBlock");
    }
}