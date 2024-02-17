module.exports = {
    name: "Embed Pagination",
    
    description: "Embed pagination!\n\nCredits: by @T-45",
    
    category: "Embed Pagination",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "embeds",
            "name": "Embeds",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The embeds to paginate.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "attachment",
            "name": "Attachment",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "labels",
            "name": "Labels",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The labels of the buttons. (OPTIONAL)",
            "types": ["object", "unspecified"]
        }
    ],
    
    options: [
        {
            "id": "enable",
            "name": "Pagination Interactions",
            "description": "Description: What do you want in your pagination? Buttons only, select menu only, or both?",
            "type": "SELECT",
            "options": {
                "buttons": "Buttons",
                "select": "Select Menu",
                "both": "Both"
            }
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The message obtained.",
            "types": ["object"]
        }
    ],
    
    async code(cache) {
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, DirectoryChannel, StringSelectMenuBuilder } = require('discord.js');

        const channel = this.GetInputValue("channel", cache);
        const text = this.GetInputValue("text", cache);
        let embedees = this.GetInputValue("embeds", cache);
        const attachment = this.GetInputValue("attachment", cache);
        let message_embed;
        let componentss = [];
        let otherrows = [];
        const labels = this.GetInputValue("labels", cache);

        let ids = {
            buttons: {
                first: createID(),
                back: createID(),
                next: createID(),
                last: createID()
            },

            selects: {
                menu1: createID(),
                menu2: createID(),
                menu3: createID()
            }
        }

        if (!embedees) throw("You must provide embeds to paginate!")
        for (const item of embedees) {
            embedees[embedees.indexOf(item)] = numberPages(item, embedees.indexOf(item), embedees.length)
        }
        message_embed = embedees[0]

        switch (this.GetOptionValue("enable", cache)) {
            case "buttons":
                componentss.push(createButtonsRow(embedees.length));
                break;
            case "select":
                createSelects(embedees)
                for (const item of otherrows) {
                    componentss.push(item)
                }
                break;
            case "both":
                createSelects(embedees)
                for (const item of otherrows) {
                    componentss.push(item)
                }
                componentss.push(createButtonsRow(embedees.length));
                break;
        }

        const data = {
            content: text,
            embeds: message_embed && message_embed.hasOwnProperty('data') && [message_embed.data],
            files: attachment ? [attachment] : undefined,
            components: embedees.length > 1 ? componentss : null
        }
        
        const cleanData = Object.keys(data).reduce((accumulator, key) => {
            if (data[key] !== undefined)
            accumulator[key] = data[key]
            
            return accumulator;
        }, {});
        
        const sentMessage = await channel.send(cleanData).then(msg => {
            this.StoreOutputValue(msg, "message", cache);
            this.RunNextBlock("action", cache);
            return msg;
        });

        let embed_inter;
        if (!embed_inter) {embed_inter = message_embed};
        this.events.on('interactionCreate', async interaction => {
            if(interaction.isButton()) {
                if (interaction.customId == ids.buttons.first) embed_inter = changePage("first", embed_inter); else if (interaction.customId == ids.buttons.back) embed_inter = changePage("back", embed_inter);else if (interaction.customId == ids.buttons.next) embed_inter = changePage("front", embed_inter);else if (interaction.customId == ids.buttons.last) embed_inter = changePage("last", embed_inter);
            } else if (interaction.isStringSelectMenu()) {
                if (interaction.customId == 'selectpages1' || 'selectpages2' || 'selectpages3') {
                    embed_inter = changePage("select", interaction.values[0])
                }
            }
            await interaction.deferUpdate().catch(error => {
                if (error.code !== 40060) console.log(error);
            });
            await interaction.editReply({ content: text, embeds: embed_inter && embed_inter.hasOwnProperty('data') && [embed_inter.data], components: embedees.length > 1 ? componentss : null })
            interMessage = interaction.message;
        })
        
        // Add page numbers
        function numberPages(gottenembed, pos, length) {
            const emblended = new EmbedBuilder()
            emblended.setColor(gottenembed['data'].color);
            gottenembed['data'].hasOwnProperty('thumbnail') ? emblended.setThumbnail(gottenembed['data'].thumbnail.url) : ""
            gottenembed['data'].hasOwnProperty('author') ? emblended.setAuthor({
                name: gottenembed['data'].author.hasOwnProperty('name') ? gottenembed['data'].author.name : "\u200b",
                url: gottenembed['data'].author.hasOwnProperty('url') ? gottenembed['data'].author.url : "",
                icon_url: gottenembed['data'].author.hasOwnProperty('icon_url') ? gottenembed['data'].author.icon_url : "" 
            }) : ""
            gottenembed['data'].hasOwnProperty('title') ? emblended.setTitle(gottenembed['data'].title) : ""
            gottenembed['data'].hasOwnProperty('url') ? emblended.setURL(gottenembed['data'].url) : ""
            gottenembed['data'].hasOwnProperty('description') ? emblended.setDescription(gottenembed['data'].description) : ""
            gottenembed['data'].hasOwnProperty('image') ? emblended.setImage(gottenembed['data'].image.url) : ""
            emblended.setFooter({
                text: `Page: ${pos + 1} of ${length}`,
            })
            gottenembed['data'].hasOwnProperty('timestamp') ? emblended.setTimestamp(gottenembed['data'].timestamp.value) : ""
            return emblended;

        }

        // Create the pagination buttons
        function createButtonsRow(length, disabled, id) {
            if (length >= 3) {
                const row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
					    .setCustomId(ids.buttons.first)
					    .setLabel(labels == undefined ? '⏪' : labels.first == '' ? '⏪' : labels.first)
					    .setStyle(ButtonStyle.Primary)
                        .setDisabled(disabled || false),
                    new ButtonBuilder()
					    .setCustomId(ids.buttons.back)
					    .setLabel(labels == undefined ? '◀' : labels.back == '' ? '◀' : labels.back)
					    .setStyle(ButtonStyle.Danger)
                        .setDisabled(disabled || false),
				    new ButtonBuilder()
					    .setCustomId(ids.buttons.next)
					    .setLabel(labels == undefined ? '▶' : labels.next == '' ? '▶' : labels.next)
					    .setStyle(ButtonStyle.Success)
                        .setDisabled(disabled || false),
                    new ButtonBuilder()
					    .setCustomId(ids.buttons.last)
					    .setLabel(labels == undefined ? '⏩' : labels.last == '' ? '⏩' : labels.last)
					    .setStyle(ButtonStyle.Primary)
                        .setDisabled(disabled || false)
			    );
                return row;
            } else {
                const row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
                        .setCustomId(ids.buttons.back)
                        .setLabel(labels == undefined ? '◀' : labels.back == '' ? '◀' : labels.back)
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(disabled || false),
                    new ButtonBuilder()
                        .setCustomId(ids.buttons.next)
                        .setLabel(labels == undefined ? '▶' : labels.next == '' ? '▶' : labels.next)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(disabled || false),
			    );
                return row;
            }
        }

        // Create the pages select menu
        function createSelects(array) {
            if (embedees.length <= 25) {
                    const roww = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(ids.selects.menu1)
                            .setPlaceholder('📔| Select a page')
                            .addOptions(createOptions1()),
                    );
                    otherrows.push(roww);
            } else if (embedees.length > 25 && embedees.length <= 50) {
                    const roww = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(ids.selects.menu1)
                            .setPlaceholder('📔| Select a page')
                            .addOptions(createOptions1()),
                    );
                    const roww2 = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(ids.selects.menu2)
                                .setPlaceholder('📔| Select a page | Part 2')
                                .addOptions(createOptions2()),
                    );
                    otherrows.push(roww);otherrows.push(roww2)
            } else if (embedees.length > 50 && embedees.length <= 75) {
                const roww = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(ids.selects.menu1)
                                .setPlaceholder('📔| Select a page')
                                .addOptions(createOptions1()),
                        );
                    const roww2 = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(ids.selects.menu2)
                                .setPlaceholder('📔| Select a page | Part 2')
                                .addOptions(createOptions2()),
                        );
                    const roww3 = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(ids.selects.menu3)
                                .setPlaceholder('📔| Select a page | Part 3')
                                .addOptions(createOptions3()),
                        );
                    otherrows.push(roww);otherrows.push(roww2);otherrows.push(roww3)
            }
        }
        
        // Create select menu options
        function createOptions1() {
            let options = [];
            for (const eembed of embedees) {
                if (embedees.indexOf(eembed) <= 24) {
                   options.push(
                    {
                        label: `Page: ${embedees.indexOf(eembed) + 1}`,
                        description: `Page title: ${eembed['data'].title}`,
                        value: `page_${embedees.indexOf(eembed)}`,
                        emoji: {
                            name: '📃'
                        }
                    }
                   ) 
                }
            }
            return options
        }
        function createOptions2() {
            let options = [];
            for (const eembed of embedees) {
                if (embedees.indexOf(eembed) > 24 && embedees.indexOf(eembed) <= 49) {
                   options.push(
                    {
                        label: `Page: ${embedees.indexOf(eembed) + 1}`,
                        description: `Page title: ${eembed['data'].title}`,
                        value: `page_${embedees.indexOf(eembed)}`,
                        emoji: {
                            name: '📃'
                        }
                    }
                   ) 
                }
            }
            return options
        }
        function createOptions3() {
            let options = [];
            for (const eembed of embedees) {
                if (embedees.indexOf(eembed) > 49 && embedees.indexOf(eembed) <= 74) {
                   options.push(
                    {
                        label: `Page: ${embedees.indexOf(eembed) + 1}`,
                        description: `Page title: ${eembed['data'].title}`,
                        value: `page_${embedees.indexOf(eembed)}`,
                        emoji: {
                            name: '📃'
                        }
                    }
                   ) 
                }
            }
            return options
        }

        // Change page
        function changePage(direction, current_page) {
            let final_page;
            const max = embedees.length - 1;
            const min = 0;

            switch (direction) {
                case "front":
                    if (embedees.indexOf(current_page) === max) {
                        final_page = embedees[min]
                    } else {
                        final_page = embedees[embedees.indexOf(current_page) + 1]
                    }
                    break;
                case "back":
                    if (embedees.indexOf(current_page) === min) {
                        final_page = embedees[max]
                    } else {
                        final_page = embedees[embedees.indexOf(current_page) - 1]
                    }
                    break;
                case "first":
                    final_page = embedees[min]
                    break;
                case "last":
                    final_page = embedees[max]
                    break;
                case "select":
                    final_page = embedees[current_page.substring(5)]
                    break;
            }
            return final_page;
        }
        
        // Create IDs
        function createID() {
            const stuff = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
            let result = "";

            for (i = 0; i < 10 ;i++) {
                result += stuff.charAt(Math.floor(Math.random() * stuff.length))
            }

            return result;
        }
    }
};