# Discord Giveaways Bot 🎉

Welcome to the **Discord Giveaways Bot** project! This bot is built using Node.js and is designed to facilitate giveaways on your Discord server effortlessly. Whether you want to reward your community or engage your server members, this bot has you covered.

## Features ✨

- **Easy Setup**: Quickly configure and start using the bot with minimal effort.
- **Customizable Giveaways**: Set up giveaways with various customization options like duration, number of winners, and more.
- **Automated Winner Selection**: The bot automatically selects winners once the giveaway ends.
- **User-friendly Commands**: Simple and intuitive commands for both admins and participants.
- **Multi-Server Support**: Use the bot across multiple Discord servers.

## Getting Started 🚀

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Discord.js](https://discord.js.org/) (v13.x or later)
- A Discord bot token (create one [here](https://discord.com/developers/applications))

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/discord-giveaways-bot.git
    cd discord-giveaways-bot
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add your Discord bot token:
    ```env
    DISCORD_TOKEN=your_discord_bot_token
    ```

4. Start the bot:
    ```bash
    npm start
    ```

## Usage 📋

### Commands

- **`!startgiveaway`**: Start a new giveaway.
    ```plaintext
    !startgiveaway [duration] [number of winners] [prize]
    ```
    Example:
    ```plaintext
    !startgiveaway 1d 1 Free Nitro
    ```

- **`!endgiveaway`**: End an ongoing giveaway immediately.
    ```plaintext
    !endgiveaway [giveawayID]
    ```

- **`!reroll`**: Reroll the winners of a giveaway.
    ```plaintext
    !reroll [giveawayID]
    ```

### Configuration

You can customize the bot settings in the `config.json` file. Adjust parameters like the default giveaway duration, prefix for commands, etc.

## Contributing 🤝

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements 🙏

- [Discord.js](https://discord.js.org/) for providing an excellent library for Discord API.
- [Node.js](https://nodejs.org/) for the powerful runtime environment.
- All contributors and users for their support and feedback.

---

Feel free to reach out if you have any questions or need assistance. Happy giving away! 🎁

---

**Repository**: [GitHub - yourusername/discord-giveaways-bot](https://github.com/yourusername/discord-giveaways-bot)
