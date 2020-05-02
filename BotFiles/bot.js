const Discord = require("discord.js");

const DBC = {};
DBC.Bot = new Discord.Client();
DBC.settings = require("./data/settings.json");

DBC.events = require("./data/events");
DBC.commands = require("./data/commands.json");
DBC.variables = require("./data/variables.json");

DBC.Mods = new Map();

DBC.loadMods = async function () {
    require("fs").readdirSync("./mods/").forEach(modFile => {
        const fetchedMod = require("./mods/" + modFile);
        fetchedMod.init();
        if (fetchedMod.isEvent) {
            DBC.Bot.on(fetchedMod.name, fetchedMod.mod.bind(null, DBC.Bot));
        } else if (fetchedMod.isResponse) {
            DBC.Mods.set(fetchedMod.name, fetchedMod);
        } else {
            fetchedMod.mod();
        };
    });
};

DBC.checkMessage = async function (message) {
    this.prefix = DBC.settings.prefix;
    if (message.author.bot) return;
    if (!message.content.startsWith(this.prefix)) return;
    const args = message.content.slice(this.prefix.length).trim().split(/ + /g);
    const command = args.shift().toLowerCase();
    DBC.checkPerms(command, message, args)
}

DBC.runCommand = async function (command, message, args, DBC) {
    for (const cmd of DBC.commands) {
        if (cmd.name == command) {
            for (const action of cmd.actions) {
                const fetchedMod = DBC.Mods.get(action.name);
                fetchedMod.mod(command, message, args, action.data, DBC)
            };
        }
    };
};

DBC.checkPerms = function (command, message, args) {
    if (command.perms == "BotOwner") {
        if (!message.author.id == DBC.settings.ownerID) return;
        DBC.runCommand(command, message, args, DBC);
    } else {
        if (!message.member.permissions.has([command.perms])) return;
        DBC.runCommand(command, message, args, DBC);
    };
};

DBC.Bot.on("message", (message) => DBC.checkMessage(message));

DBC.startBot = async function () {
    await DBC.loadMods();
    DBC.Bot.login(DBC.settings.token);
};

DBC.startBot();

