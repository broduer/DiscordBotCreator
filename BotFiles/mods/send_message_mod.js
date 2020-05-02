module.exports = {
    name: "Send Message",

    version: "1.0.0",

    author: "Great Plains Modding",

    isEvent: false,

    isResponse: true,

    isAddon: false,

    html: function (data) {

    },

    init: function () {

    },

    mod: function (command, message, args, data, DBC) {
        switch (data.sendTo) {
            case "sameChannel":
                message.channel.send(data.message);
                break;
            case "messageAuthor":
                message.author.send(data.message);
                break;
            case "mentionedUser":
                message.mentions.first().send(data.message);
                break;
        };
    }
};