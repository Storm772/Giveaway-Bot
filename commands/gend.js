const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gend')
    .setDescription('🔚 End a giveaway without selecting a winner')
    .addStringOption(option => option.setName('message_id').setDescription('🆔 Message ID of the giveaway').setRequired(true)),
  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    try {
      if (interaction.channel.type === 'DM') {
        return interaction.reply('⚠️ This command cannot be used in DMs. Please use it in a server channel.');
      }

      console.log('[DEBUG] Executing /gend command... 🟢');
      const message = await interaction.channel.messages.fetch(messageId);
      const giveaway = global.activeGiveaways.get(messageId);
      if (!giveaway) {
        throw new Error('Giveaway not found.');
      }

      await message.edit('⏲️ **Giveaway ended!** 🎉');
      console.log('[DEBUG] Giveaway ended successfully. ✅');
      interaction.reply({ content: '🟢 Giveaway has been ended without selecting a winner.', ephemeral: true });
      global.activeGiveaways.delete(messageId);
    } catch (error) {
      console.error('[ERROR] Error ending giveaway: ❌', error);
      interaction.reply({ content: `⚠️ There was an error while ending the giveaway: ${error.message || 'Unknown error.'}`, ephemeral: true });
    }
  },
};