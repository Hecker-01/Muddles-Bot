const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> Oops an internal error occurred!"
          )
          .setDescription("Please report this to <@766897363050037248>!")
          .setColor(0xff0000);
        interaction.reply({ content: "", embeds: [Error], ephemeral: true });
        console.log(
          `\'${interaction.member.user.tag}\' caused an error! Errorcode: cmd-${interaction.commandName}`
        );
      }

      if (command.developer && interaction.user.id !== client.config.ownerID) {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> You do not have permission to use this command!"
          )
          .setDescription(
            "If you think this is a mistake, please report this to <@766897363050037248>!"
          )
          .setColor(0xff0000);
        interaction.reply({ content: "", embeds: [Error], ephemeral: true });
        return;
      } else {
        command.execute(interaction, client);
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === "verify") {
        if (interaction.member.roles.cache.has("1208342791273586710")) {
          const done = new EmbedBuilder()
            .setTitle(
              "**<:icons_Warning:1208356607214358538> You have already been verified!**"
            )
            .setDescription(
              "**Things you might want to do:**\n• Get some cool roles in <#1208358782812561408>!\n• Go chat in <#1208352943645003776>!\n** **\nIf you have any questions type </help:1208363767159721987>!"
            )
            .setColor(0xffbd2b);
          interaction.reply({ content: "", embeds: [done], ephemeral: true });
        } else if (interaction.member.roles.cache.has("1208354132277067817")) {
          const unable = new EmbedBuilder()
            .setTitle(
              "**<:wrong:1298349564708917320> You could not be verified!**"
            )
            .setDescription(
              "This is because a server administrator has banned you from the server, you can still see <#1203454615941812265> and <#1203456307017949184>."
            )
            .setColor(
              parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
            );
          interaction.reply({ content: "", embeds: [unable], ephemeral: true });
        } else {
          const verified = new EmbedBuilder()
            .setTitle(
              "**<:icons_coloredright:1208356609240338492> You have been successfully verified!**"
            )
            .setDescription(
              "**Things you might want to do:**\n• Link your Minecraft account to your Discord in <#1208359303988248636> to get acces to Linked-exclusive channels!\n• Get some cool roles in <#1208358782812561408>!\n• Go chat in <#1208352943645003776>!\n** **\nIf you have any questions type </help:1208363767159721987>!"
            )
            .setColor(0x01d169);
          interaction.member.roles.add("1208342791273586710");
          interaction.reply({
            content: "",
            embeds: [verified],
            ephemeral: true,
          });
        }
      } else if (interaction.customId === "colorroles") {
        const redRole = new StringSelectMenuOptionBuilder()
          .setLabel("Red")
          .setDescription("Click here to make your name red!")
          .setValue("red")
          .setEmoji("1208356315307704350")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354733710905374")) {
          redRole.setDefault(true);
        }
        const greenRole = new StringSelectMenuOptionBuilder()
          .setLabel("Green")
          .setDescription("Click here to make your name green!")
          .setValue("green")
          .setEmoji("1208356339143942174")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354745056755782")) {
          greenRole.setDefault(true);
        }
        const blueRole = new StringSelectMenuOptionBuilder()
          .setLabel("Blue")
          .setDescription("Click here to make your name blue!")
          .setValue("blue")
          .setEmoji("1208356337088733194")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354765101211648")) {
          blueRole.setDefault(true);
        }
        const whiteRole = new StringSelectMenuOptionBuilder()
          .setLabel("White")
          .setDescription("Click here to make your name white!")
          .setValue("white")
          .setEmoji("1208356278297034794")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354782088003614")) {
          whiteRole.setDefault(true);
        }
        const yellowRole = new StringSelectMenuOptionBuilder()
          .setLabel("Yellow")
          .setDescription("Click here to make your name yellow!")
          .setValue("yellow")
          .setEmoji("1208356279647477820")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354798584467476")) {
          yellowRole.setDefault(true);
        }
        const magentaRole = new StringSelectMenuOptionBuilder()
          .setLabel("Magenta")
          .setDescription("Click here to make your name magenta!")
          .setValue("magenta")
          .setEmoji("1208356313197842443")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354815483052042")) {
          magentaRole.setDefault(true);
        }

        const colorChoice = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("setcolor")
            .setPlaceholder("Select a color!")
            .setMinValues(1)
            .setMaxValues(1)
            .setDisabled(false)
            .addOptions(
              redRole,
              greenRole,
              blueRole,
              whiteRole,
              yellowRole,
              magentaRole
            )
        );

        const removeColorButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Remove your color")
            .setCustomId("colorless")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(false)
        );

        const colorEmbed = new EmbedBuilder()
          .setTitle("Give your name a cool color!")
          .setDescription(
            "Click on one of the options to give your name a cool color, \nOr click the big red button to remove your color!"
          )
          .setColor(0x7291ed);

        interaction.reply({
          embeds: [colorEmbed],
          components: [colorChoice, removeColorButton],
          ephemeral: true,
        });
      } else if (interaction.customId === "pingroles") {
        const announcementsRole = new StringSelectMenuOptionBuilder()
          .setLabel("Announcements")
          .setDescription("Get notified when we post an announcement!")
          .setValue("announce")
          .setEmoji("1208445497522520105")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208353946712674354")) {
          announcementsRole.setDefault(true);
        }
        const mcAnnouncementsRole = new StringSelectMenuOptionBuilder()
          .setLabel("MC Announcements")
          .setDescription("Get notified when we post an mc announcement!")
          .setValue("mcannounce")
          .setEmoji("1208445497522520105")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354260421447680")) {
          mcAnnouncementsRole.setDefault(true);
        }
        const sneakPeaksRole = new StringSelectMenuOptionBuilder()
          .setLabel("Sneak peaks")
          .setDescription("Get notified when we post a sneak peak!")
          .setValue("sneakpeak")
          .setEmoji("1208714244145545216")
          .setDefault(false);
        if (interaction.member.roles.cache.has("1208354313668263946")) {
          sneakPeaksRole.setDefault(true);
        }

        const pingsChoice = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("setpings")
            .setPlaceholder("Select the pingroles you want!")
            .setMinValues(0)
            .setMaxValues(3)
            .setDisabled(false)
            .addOptions(announcementsRole, mcAnnouncementsRole, sneakPeaksRole)
        );

        const removePingsButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Remove your pingroles")
            .setCustomId("noping")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(false)
        );

        const pingsEmbed = new EmbedBuilder()
          .setTitle("Choose when you want to be pinged!")
          .setDescription(
            "Select multiple occasions for when you want to be pinged,\nOr click the big red button to remove all your pingroles!"
          )
          .setColor(0x7291ed);

        interaction.reply({
          embeds: [pingsEmbed],
          components: [pingsChoice, removePingsButton],
          ephemeral: true,
        });
      } else if (interaction.customId === "colorless") {
        interaction.member.roles.remove("1208354733710905374"); // remove red role
        interaction.member.roles.remove("1208354745056755782"); // remove green role
        interaction.member.roles.remove("1208354765101211648"); // remove blue role
        interaction.member.roles.remove("1208354782088003614"); // remove white role
        interaction.member.roles.remove("1208354798584467476"); // remove yellow role
        interaction.member.roles.remove("1208354815483052042"); // remove magenta role
        const Done = new EmbedBuilder()
          .setTitle(
            "<:icons_coloredright:1208356609240338492> Updated your color!"
          )
          .setDescription("Your name is now **Colorless**!")
          .setColor(0x01d169);
        interaction.reply({ content: "", embeds: [Done], ephemeral: true });
      } else if (interaction.customId === "noping") {
        interaction.member.roles.remove("1208353946712674354"); // remove announcements role
        interaction.member.roles.remove("1208354260421447680"); // remove mc announcements role
        interaction.member.roles.remove("1208354313668263946"); // remove sneak peaks role
        const Done = new EmbedBuilder()
          .setTitle(
            "<:icons_coloredright:1208356609240338492> Updated your pingroles!"
          )
          .setDescription("You have successfully removed all your pingroles!")
          .setColor(0x01d169);
        interaction.reply({ content: "", embeds: [Done], ephemeral: true });
      } else {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> Oops an internal error occurred!"
          )
          .setDescription("Please report this to <@766897363050037248>!")
          .setColor(0xff0000);
        interaction.reply({ content: "", embeds: [Error], ephemeral: true });
        console.log(
          `\'${interaction.member.user.tag}\' caused an error! Errorcode: btn-${interaction.customId}`
        );
      }
    } else if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "setcolor") {
        if (interaction.values == "red") {
          interaction.member.roles.add("1208354733710905374"); // add red role
          interaction.member.roles.remove("1208354745056755782"); // remove green role
          interaction.member.roles.remove("1208354765101211648"); // remove blue role
          interaction.member.roles.remove("1208354782088003614"); // remove white role
          interaction.member.roles.remove("1208354798584467476"); // remove yellow role
          interaction.member.roles.remove("1208354815483052042"); // remove magenta role
          const Done = new EmbedBuilder()
            .setTitle(
              "<:icons_coloredright:1208356609240338492> Updated your color!"
            )
            .setDescription("Your name is now **Red**!")
            .setColor(0x01d169);
          interaction.reply({ content: "", embeds: [Done], ephemeral: true });
        } else if (interaction.values == "green") {
          interaction.member.roles.add("1208354745056755782"); // add green role
          interaction.member.roles.remove("1208354733710905374"); // remove red role
          interaction.member.roles.remove("1208354765101211648"); // remove blue role
          interaction.member.roles.remove("1208354782088003614"); // remove white role
          interaction.member.roles.remove("1208354798584467476"); // remove yellow role
          interaction.member.roles.remove("1208354815483052042"); // remove magenta role
          const Done = new EmbedBuilder()
            .setTitle(
              "<:icons_coloredright:1208356609240338492> Updated your color!"
            )
            .setDescription("Your name is now **Green**!")
            .setColor(0x01d169);
          interaction.reply({ content: "", embeds: [Done], ephemeral: true });
        } else if (interaction.values == "blue") {
          interaction.member.roles.add("1208354765101211648"); // add blue role
          interaction.member.roles.remove("1208354733710905374"); // remove red role
          interaction.member.roles.remove("1208354745056755782"); // remove green role
          interaction.member.roles.remove("1208354782088003614"); // remove white role
          interaction.member.roles.remove("1208354798584467476"); // remove yellow role
          interaction.member.roles.remove("1208354815483052042"); // remove magenta role
          const Done = new EmbedBuilder()
            .setTitle(
              "<:icons_coloredright:1208356609240338492> Updated your color!"
            )
            .setDescription("Your name is now **Blue**!")
            .setColor(0x01d169);
          interaction.reply({ content: "", embeds: [Done], ephemeral: true });
        } else if (interaction.values == "white") {
          interaction.member.roles.add("1208354782088003614"); // add white role
          interaction.member.roles.remove("1208354733710905374"); // remove red role
          interaction.member.roles.remove("1208354745056755782"); // remove green role
          interaction.member.roles.remove("1208354765101211648"); // remove blue role
          interaction.member.roles.remove("1208354798584467476"); // remove yellow role
          interaction.member.roles.remove("1208354815483052042"); // remove magenta role
          const Done = new EmbedBuilder()
            .setTitle(
              "<:icons_coloredright:1208356609240338492> Updated your color!"
            )
            .setDescription("Your name is now **White**!")
            .setColor(0x01d169);
          interaction.reply({ content: "", embeds: [Done], ephemeral: true });
        } else if (interaction.values == "yellow") {
          interaction.member.roles.add("1208354798584467476"); // add yellow role
          interaction.member.roles.remove("1208354733710905374"); // remove red role
          interaction.member.roles.remove("1208354745056755782"); // remove green role
          interaction.member.roles.remove("1208354765101211648"); // remove blue role
          interaction.member.roles.remove("1208354782088003614"); // remove white role
          interaction.member.roles.remove("1208354815483052042"); // remove magenta role
          const Done = new EmbedBuilder()
            .setTitle(
              "<:icons_coloredright:1208356609240338492> Updated your color!"
            )
            .setDescription("Your name is now **Yellow**!")
            .setColor(0x01d169);
          interaction.reply({ content: "", embeds: [Done], ephemeral: true });
        } else if (interaction.values == "magenta") {
          interaction.member.roles.add("1208354815483052042"); // add magenta role
          interaction.member.roles.remove("1208354733710905374"); // remove red role
          interaction.member.roles.remove("1208354745056755782"); // remove green role
          interaction.member.roles.remove("1208354765101211648"); // remove blue role
          interaction.member.roles.remove("1208354782088003614"); // remove white role
          interaction.member.roles.remove("1208354798584467476"); // remove yellow role
          const Done = new EmbedBuilder()
            .setTitle(
              "<:icons_coloredright:1208356609240338492> Updated your color!"
            )
            .setDescription("Your name is now **Magenta**!")
            .setColor(0x01d169);
          interaction.reply({ content: "", embeds: [Done], ephemeral: true });
        } else {
          const Error = new EmbedBuilder()
            .setTitle(
              "<:wrong:1298349564708917320> Oops an internal error occurred!"
            )
            .setDescription("Please report this to <@766897363050037248>!")
            .setColor(0xff0000);
          interaction.reply({ content: "", embeds: [Error], ephemeral: true });
          console.log(
            `\'${interaction.member.user.tag}\' caused an error! Errorcode: smnu-${interaction.customId}-[${interaction.values}]`
          );
        }
      } else if (interaction.customId === "setpings") {
        if (interaction.values.includes("announce")) {
          interaction.member.roles.add("1208353946712674354"); // add announcements role
        } else {
          interaction.member.roles.remove("1208353946712674354"); // remove announcements role
        }
        if (interaction.values.includes("mcannounce")) {
          interaction.member.roles.add("1208354260421447680"); // add mc announcements role
        } else {
          interaction.member.roles.remove("1208354260421447680"); // remove mc announcements role
        }
        if (interaction.values.includes("sneakpeak")) {
          interaction.member.roles.add("1208354313668263946"); // add sneak peaks role
        } else {
          interaction.member.roles.remove("1208354313668263946"); // remove sneak peaks role
        }
        const Done = new EmbedBuilder()
          .setTitle(
            "<:icons_coloredright:1208356609240338492> Updated your pingroles!"
          )
          .setDescription("You have successfully updated your pingroles!")
          .setColor(0x01d169);
        interaction.reply({ content: "", embeds: [Done], ephemeral: true });
      } else {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> Oops an internal error occurred!"
          )
          .setDescription("Please report this to <@766897363050037248>!")
          .setColor(0xff0000);
        interaction.reply({ content: "", embeds: [Error], ephemeral: true });
        console.log(
          `\'${interaction.member.user.tag}\' caused an error! Errorcode: smnu-${interaction.customId}-[${interaction.values}]`
        );
      }
    }
  },
};
