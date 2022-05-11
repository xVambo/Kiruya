import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "mods",
      description: "Displays the Moderators' contact info",
      category: "general",
      usage: `${client.config.prefix}mods`,
      aliases: ["moderators", "mod", "owner"],
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const filteredMap = this.client.config.mods
      .map((mod) => this.client.getContact(mod))
      .filter((user) => user);
    let text = " Celestial Mods\n\n";
    filteredMap.forEach(
      (user, index) =>
        (text += `#${index + 1}\n🎉 *Username: ${
          user.notify || user.vname || user.name || "null"
        }*\n *Contact: https://wa.me/+${user?.jid?.split("@")[0]}*\n\n`)
    );
    text += `\n ©Celestial 2022`;
    return void M.reply(text);
  };
}
