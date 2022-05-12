/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "everyone",
      description: "Tags all users in group chat",
      aliases: ["all", "tagall", "ping"],
      category: "moderation",
      usage: `${client.config.prefix}everyone`,
      adminOnly: true,
      baseXp: 20,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined, flags }: IParsedArgs
  ): Promise<void> => {
    flags.forEach((flag) => (joined = joined.replace(flag, "")));
    const members = await (
      await this.client.groupMetadata(M.from)
    ).participants;
    const stickers = [
      "https://www.linkpicture.com/q/wp8334013-shuna-wallpapers.png",
      "https://www.linkpicture.com/q/6204603a9df7e-cropped.png",
      "https://www.linkpicture.com/q/0941f3892f8428adad230dac75ff09b0_1.jpg",
      "https://www.linkpicture.com/q/210043925_972632576832816_9183713240879967485_n.jpg",
      "https://www.linkpicture.com/q/208020079_187049836697786_5756036370930689631_n.jpg",
      "https://www.linkpicture.com/q/shuna_tensei_shitara_slime_datta_ken_by_dingier_cropped.png",
    ];
    const random = stickers[Math.floor(Math.random() * stickers.length)];
    if (flags.includes("--s") || flags.includes("--sticker")) {
      const sticker: any = await new Sticker(random, {
        pack: "READ QUOTED MESSAGE",
        author: "Celestial",
        quality: 90,
        type: "default",
        categories: ["🎊"],
      });
      return void (await M.reply(
        await sticker.build(),
        MessageType.sticker,
        Mimetype.webp,
        M.groupMetadata?.participants.map((user) => user.jid)
      ));
    } else if (flags.includes("--h") || flags.includes("--hide")) {
      return void (await M.reply(
        `*🌺 Group: ${M.groupMetadata?.subject}*\n🌸 *Members: ${
          members.length
        }*\n🌼 *Announcer: @${M.sender.jid.split("@")[0]}*\n🌹 *Tags: HIDDEN*`,
        undefined,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).catch((reason: any) =>
        M.reply(`✖️ An error occurred, Reason: ${reason}`)
      ));
    } else {
      interface metadata {
        mods: string[];
        admins: string[];
        others: string[];
      }
      const metadata: metadata = {
        mods: [],
        admins: [],
        others: [],
      };
      for (const i of members) {
        if (i.jid === M.sender.jid) continue;
        if (!this.client.config.mods?.includes(i.jid)) continue;
        metadata.mods.push(i.jid);
      }
      for (const a of members) {
        if (a.jid === M.sender.jid) continue;
        if (this.client.config.mods?.includes(a.jid)) continue;
        if (!a.isAdmin) continue;
        metadata.admins.push(a.jid);
      }
      for (const k of members) {
        if (k.jid === M.sender.jid) continue;
        if (this.client.config.mods?.includes(k.jid)) continue;
        if (k.isAdmin) continue;
        metadata.others.push(k.jid);
      }
      let text = `*🌺 Group: ${M.groupMetadata?.subject}*\n🌸 *Members: ${
        members.length
      }*\n🌼 *Announcer: @${M.sender.jid.split("@")[0]}*\n🌹 *Tags:*`;
      if (metadata.mods.length > 0) {
        for (const Mods of metadata.mods) {
          text += `\n🏅 *@${Mods.split("@")[0]}*`;
        }
      }
     // text += `\n`;
      if (metadata.admins.length > 0) {
        text += `\n`;
        for (const admins of metadata.admins) {
          text += `\n👑 *@${admins.split("@")[0]}*`;
        }
      }
     // text += `\n`;
      if (metadata.others.length > 0) {
        text += `\n`;
        for (const others of metadata.others) {
          text += `\n♦️ *@${others.split("@")[0]}*`;
        }
      }
      return void M.reply(
        text,
        MessageType.text,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
      );
    }
  };
}
