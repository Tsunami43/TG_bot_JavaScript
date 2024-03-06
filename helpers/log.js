module.exports = async function (
  ctx,
  action,
  extra = {
    disable_web_page_preview: true,
  }
) {
  return ctx.telegram
    .sendMessage(
      ctx.state.bot.loggingGroupId,
      `Пользователь <b><a href="tg://user?id=${ctx.from.id}">${ctx.state.user.username}</a></b> <code>(ID: ${ctx.from.id})</code>: ${action}`,
      {
        parse_mode: "HTML",
        ...extra,
      }
    )
    .catch((err) => err);
};
