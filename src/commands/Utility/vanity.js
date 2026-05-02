const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vanity')
        .setDescription('Configure and display server vanity URLs')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('The vanity URL to set')),

    async execute(interaction) {
        const { guild } = interaction;
        const url = interaction.options.getString('url');

        if (url) {
            // Logic to set the vanity URL only for server admins
            if (!guild.me.permissions.has('MANAGE_GUILD')) {
                return interaction.reply({ content: 'You do not have permission to set a vanity URL.', ephemeral: true });
            }

            // Assuming `setVanityURL` is a function that handles setting the vanity URL in your system
            await setVanityURL(guild.id, url);
            return interaction.reply(`Vanity URL set to: ${url}`);
        } else {
            // Display the current vanity URL
            const currentUrl = await getVanityURL(guild.id); // Assuming this function retrieves the vanity URL
            return interaction.reply(`Current vanity URL: ${currentUrl || 'None set'}`);
        }
    },
};
