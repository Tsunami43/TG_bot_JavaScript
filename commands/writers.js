const { Markup } = require("telegraf");
const { Country } = require("../database");
const locale = require("../locale");

module.exports = async (ctx, with_buttons = true) => {
  try {
    const countries = await Country.findAll({
      order: [["id", "asc"]],
      include: [
        {
          association: "writers",
        },
      ],
    });

    var text = `<b>${locale.now_writers}\n</b>`;
    countries.map((v) => {
      text += `\n${v.title} — <b>`;
      if (v.writers.length < 1) text += "никто не вбивает";
      text += v.writers
        .map((d) => `<a href="https://t.me/${d.username}">${d.username}</a>`)
        .join(", ");
      text += "</b>";
    });
    return ctx
      .replyOrEdit(text, {
        parse_mode: "HTML",
        disable_notification: true,
        disable_web_page_preview: true,
        reply_markup: with_buttons
          ? Markup.inlineKeyboard([
              [Markup.callbackButton(locale.go_to_menu, "start")],
            ])
          : {},
      })
      .catch((err) => err);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
};
