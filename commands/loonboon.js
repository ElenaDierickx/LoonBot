const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loonboon")
        .setDescription("Play loonboon!")
        .addChannelOption((option) => option.setName("channel").setDescription("The channel to play loonboon").setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        const audioPlayer = createAudioPlayer();
        const resource = createAudioResource("./media/loonboon.mp3");
        audioPlayer.play(resource);
        const subscription = connection.subscribe(audioPlayer);
        await interaction.reply({ content: "Now playing loonboon in " + channel.name, ephemeral: true });
        setTimeout(() => {
            subscription.unsubscribe();
            connection.destroy();
        }, 110000);
    },
};
