import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "support",
      aliases: ["support"],
      description: "Gets the support group links",
      category: "general",
      usage: `${client.config.prefix}Support`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    await this.client.sendMessage(
      M.sender.jid,
      ` _*I'M FROM CELESTIAL 🌌*\n\n
        _*CELESTIAL NEWS*_:https://chat.whatsapp.com/KcjW4C4Zl46L1ECpot1FeO\n\n 
        _*🌌 CELESTIAL 🌌*_:https://chat.whatsapp.com/HGH0SFq4w0B6IgSWJkgtt5\n\n
        _*CELESTIAL CASINO*_:https://chat.whatsapp.com/EmfhxmgQhNfIUxiE8NHCvq\n\n 
        _*CELESTIAL QUIZ*_:https://chat.whatsapp.com/F6gqHxiHImD1vi5oc3ExBf`,

      MessageType.text
    );

    return void M.reply("Sent you the Group Links in personal message");
  };
}
