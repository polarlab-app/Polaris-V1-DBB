module.exports = {
    name: "Edit Member Nickname",

    description: "Edit the Nickname of a Member",

    category: "Member Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Member to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "nick",
            "name": "Nickname",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this Member.",
            "types": ["text", "unspecified"],
            "required": true
        },
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
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Member",
            "types": ["object", "unspecified"],
        }
    ],

    code(cache) {
        const member = this.GetInputValue("member", cache);
        const nick = this.GetInputValue("nick", cache) + "";

        member.setNickname(nick).then(() => {
            this.StoreOutputValue(member, "member", cache);
            this.RunNextBlock("action", cache);
        });
    }
}