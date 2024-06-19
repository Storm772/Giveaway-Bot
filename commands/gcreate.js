const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gcreate')
    .setDescription('🎉 Create a giveaway'),
  async execute(interaction) {
    try {
      if (interaction.channel.type === 'DM') {
        return interaction.reply('⚠️ This command cannot be used in DMs. Please use it in a server channel.');
      }

      console.log('[DEBUG] Executing /gcreate command... 🟢');
      const modal = new ModalBuilder()
        .setCustomId('gcreateModal')
        .setTitle('🎉 Create a Giveaway')
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('prize')
              .setLabel('🎁 Prize')
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('duration')
              .setLabel('⏲️ Duration (in minutes)')
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          )
        );

      await interaction.showModal(modal);
    } catch (err) {
      console.error('[ERROR] Error showing modal in /gcreate command: ❌', err);
      interaction.reply({
        content: '⚠️ An error occurred while trying to show the modal. Please try again later.',
        ephemeral: true,
      });
    }
  },
  async handleModalSubmit(interaction) {
    try {
      console.log('[DEBUG] Handling modal submit for /gcreate command... 🟢');
      if (!interaction.isModalSubmit()) return;

      const prize = interaction.fields.getTextInputValue('prize');
      const duration = parseInt(interaction.fields.getTextInputValue('duration'));

      if (isNaN(duration) || duration <= 0) {
        return interaction.reply({
          content: '⚠️ Duration must be a positive number of minutes.',
          ephemeral: true,
        });
      }

      const endTime = new Date(Date.now() + duration * 60000);

      const messageContent = `
        🎉 **Giveaway Started!**
        🎁 Prize: **${prize}**
        ⏲️ Ends at: **<t:${Math.floor(endTime.getTime() / 1000)}:T>**
        React with 🎉 to enter!
      `;

      const message = await interaction.reply({
        content: messageContent,
        fetchReply: true,
      });
      console.log('[DEBUG] Giveaway message sent. Reacting with 🎉...');

      await message.react('🎉');
      console.log('[DEBUG] Reaction added.');

      const collector = message.createReactionCollector({ time: duration * 60000 });
      collector.on('end', async (collected) => {
        try {
          console.log('[DEBUG] Reaction collection ended.');
          const reactions = collected.get('🎉');
          if (!reactions) {
            throw new Error('No 🎉 reactions found on the message.');
          }
          const users = reactions.users.cache.filter((user) => !user.bot);
          if (users.size > 0) {
            const winner = users.random();
            const embed = new EmbedBuilder()
              .setColor('#FFD700')
              .setTitle('🎉 Congratulations!')
              .setDescription(`You have won the **${prize}** in the giveaway!`)
              .addFields(
                { name: '🎁 Prize', value: prize, inline: true },
                { name: '⏲️ Ended At', value: `<t:${Math.floor(endTime.getTime() / 1000)}:F>`, inline: true },
                { name: '🎉 Server', value: interaction.guild.name, inline: true }
              )
              .setFooter({ text: 'Giveaway Bot', iconURL: interaction.client.user.avatarURL() })
              .setTimestamp();

            await winner.send({ embeds: [embed] });
            await interaction.followUp(`🎊 Congratulations ${winner}! You won the **${prize}**! 🎉`);
          } else {
            await interaction.followUp('⚠️ No one entered the giveaway.');
          }
          await message.edit(`${messageContent}\n\n⏲️ **Giveaway ended!**`);
        } catch (err) {
          console.error('[ERROR] Error selecting winner: ❌', err);
          await interaction.followUp('⚠️ An error occurred while selecting the winner.');
        }
      });
    } catch (err) {
      console.error('[ERROR] Error handling modal submission: ❌', err);
      interaction.reply({
        content: '⚠️ An error occurred while creating the giveaway.',
        ephemeral: true,
      });
    }
  },
};