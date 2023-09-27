const { Scenes, Markup } = require('telegraf');
const test = require('../tests/test0.json');
const { CMD_TEXT } = require('./consts');
const { default: axios } = require('axios');

const testScene = new Scenes.BaseScene('test');

let currentTaskNum = -1;

testScene.enter(async (ctx) => {
    ctx.reply("Это бесплатный тест для испытания бота в нем 10 заданий из нашего курса, Удачи!", Markup.inlineKeyboard([
        [Markup.button.callback("Начать тест", 'next')],[Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize())
    currentTaskNum = -1;
});

testScene.action('next', async (ctx) => {
    
    currentTaskNum++;
    await sendNextTask(ctx);
});

async function sendNextTask(ctx) {
    const currentTask = test[currentTaskNum];
    const taskUrl = currentTask.task;
    const answer = currentTask.answer;

    try{
        console.log(taskUrl);
        
        const response = await axios.get(taskUrl, {
            responseType: "arraybuffer",
        });
        console.log("response",response);
        const photo = Buffer.from(response.data, "binary");

        ctx.replyWithPhoto(
            { source: photo },
            {
              caption: `Задание ${currentTaskNum}`,
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Ответить ✅", callback_data: "answer" }],
                  [
                    { text: "⬅️", callback_data: "back" },
                    { text: "📌", callback_data: "pin" },
                    { text: "➡️", callback_data: "next" },
                  ],
                ],
              },
            },
        );
    }catch(error){
        console.error();
    }
}

module.exports = {testScene};
