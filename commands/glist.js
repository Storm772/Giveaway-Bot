const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('glist')
    .setDescription('📋 List all active giveaways'),
  async execute(interaction) {
    try {
      if (interaction.channel.type === 'DM') {
        return interaction.reply('⚠️ This command cannot be used in DMs. Please use it in a server channel.');
      }

      console.log('[DEBUG] Executing /glist command... 🟢');
      if (global.activeGiveaways.size === 0) {
        return interaction.reply('📋 There are currently no active giveaways.');
      }

      let listMessage = '📋 **Active Giveaways:**\n';
      global.activeGiveaways.forEach((giveaway, messageId) => {
        listMessage += `**Giveaway ID:** ${messageId}\n**Prize:** ${giveaway.prize}\n**Ends At:** <t:${Math.floor(giveaway.endTime.getTime() / 1000)}:F>\n**Number of Winners:** ${giveaway.numberOfWinners}\n**Creator:** ${giveaway.creator.tag}\n\n`;
      });

      interaction.reply(listMessage);
    } catch (error) {
      console.error('[ERROR] Error listing giveaways: ❌', error.message || error);
      interaction.reply({ content: `⚠️ There was an error while listing the giveaways: ${error.message || 'Unknown error.'}`, ephemeral: true });
    }
  },
};