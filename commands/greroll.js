const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('greroll')
    .setDescription('🔄 Reroll a giveaway')
    .addStringOption(option => option.setName('message_id').setDescription('🆔 Message ID of the giveaway').setRequired(true)),
  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    try {
      if (interaction.channel.type === 'DM') {
        return interaction.reply('⚠️ This command cannot be used in DMs. Please use it in a server channel.');
      }

      console.log('[DEBUG] Executing /greroll command... 🟢');
      const message = await interaction.channel.messages.fetch(messageId);
      const reaction = message.reactions.cache.get('🎉');
      if (!reaction) {
        throw new Error('No 🎉 reactions found on the message.');
      }

      const users = reaction.users.cache.filter(user => !user.bot);
      const numberOfWinners = message.content.match(/🏆 Number of winners: \*\*(\d+)\*\*/)[1];
      if (users.size >= numberOfWinners) {
        const winners = users.random(numberOfWinners);
        winners.forEach(async winner => {
          const embed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('🎉 Reroll Result!')
            .setDescription(`You have won the rerolled giveaway!`)
            .setTimestamp()
            .setFooter({ text: 'Giveaway Bot', iconURL: interaction.client.user.avatarURL() });

          await winner.send({ embeds: [embed] });
          await interaction.followUp(`🎊 Congratulations ${winner}! You won the rerolled giveaway! 🎉`);
        });
        await message.edit('⏲️ **Giveaway rerolled!** 🎉');
        console.log('[DEBUG] Giveaway rerolled successfully. ✅');
      } else {
        interaction.reply('⚠️ Not enough participants in the giveaway.');
      }
    } catch (error) {
      console.error('[ERROR] Error rerolling giveaway: ❌', error.message || error);
      interaction.reply({ content: `⚠️ There was an error while rerolling the giveaway: ${error.message || 'Unknown error.'}`, ephemeral: true });
    }
  },
};