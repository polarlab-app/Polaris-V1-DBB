module.exports = {
    name: 'Member Role Add [Event]',

    description:
        "When a Member gets a Role added, this event will trigger.",

    category: 'Events',

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            id: 'action',
            name: 'Action',
            description:
                'Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.',
            types: ['action']
        },
        {
            id: 'member',
            name: 'Member',
            description: 'Type: Object\n\nDescription: The Member the role was added to',
            types: ['object']
        },
        {
            id: 'user',
            name: 'User',
            description: 'Type: Object\n\nDescription: The User the role was removed from',
            types: ['object']
        },
        {
            id: 'role',
            name: 'Role',
            description: 'Type: Object\n\nDescription: The Role that was added',
            types: ['object']
        }
    ],

    code(cache) {
        this.events.on('guildMemberUpdate', async (oldMember, newMember) => {

            if (oldMember.roles.cache.size <= newMember.roles.cache.size) {
                this.StoreOutputValue(newMember, 'member', cache);
                this.StoreOutputValue(newMember.user, 'user', cache);
                this.StoreOutputValue(oldMember.roles.cache.difference(newMember.roles.cache).first(), 'role', cache)
                this.RunNextBlock('action', cache)
            }
        })
    }
}
