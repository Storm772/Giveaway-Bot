# Discord Giveaway Bot 🎉

This bot is built using **Node.js** and is designed to facilitate giveaways on your Discord server effortlessly. Whether you want to reward your community or engage your server members, this bot has you covered.

## Features ✨

- **Easy Setup**: Quickly configure and start using the bot with minimal effort.
- **Customizable Giveaways**: Set up giveaways with various customization options like duration, number of winners, and more.
- **Automated Winner Selection**: The bot automatically selects winners once the giveaway ends.
- **User-friendly Commands**: Simple and intuitive commands for both admins and participants.

## Getting Started 🚀

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or later)
- [Discord.js](https://discord.js.org/) (v14.x or later)
- A Discord bot token (create one [here](https://discord.com/developers/applications))

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/storm_772/giveaway-bot.git
    cd giveaway-bot
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the following:
    ```env
    DISCORD_BOT_TOKEN=your_discord_bot_token
    CLIENT_ID=your_bot_client_id
    ```

4. Start the bot:
    ```bash
    npm start
    ```

## Usage 📋

### Commands

- **`/gcreate`**: Create a new giveaway.
    ```plaintext
    /gcreate
    ```

- **`/gend`**: End an ongoing giveaway immediately.
    ```plaintext
    /gend [giveawayID]
    ```

- **`/greroll`**: Reroll the winners of a giveaway.
    ```plaintext
    /greroll [giveawayID]
    ```

 - **`/glist`**: List all active giveaways.
    ```plaintext
    /glist
    ```

 - **`/gping`**: Display the ping of the bot.
   ```plaintext
    /gping
    ```


## Contributing 🤝

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements 🙏

- [Discord.js](https://discord.js.org/) for providing an excellent library for Discord API.
- [Node.js](https://nodejs.org/) for the powerful runtime environment.

---

Feel free to reach out if you have any questions or need assistance. Happy giving away! 🎁

---

**Repository**: [GitHub - Giveaway-Bot](https://github.com/storm772/giveaway-bot)
