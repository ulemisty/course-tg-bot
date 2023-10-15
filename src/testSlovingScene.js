const { Scenes, Markup, session } = require('telegraf');
const { CMD_TEXT } = require('./consts');
const { default: axios } = require('axios');

const testSlovingScene = new Scenes.BaseScene('testsloving');

let test = require('../tests/t0.json');

testSlovingScene.enter(async (ctx) => {
    const currentTestNum = ctx.session.cur_test; 
    const testPath = `../tests/t${currentTestNum}.json`; 
    test = require(testPath); 

    if (ctx.session.current_task < 0) {
        ctx.reply(`📝 Начинаем тест! Всего заданий: ${test.length}. Удачи!`, Markup.inlineKeyboard([
            [Markup.button.callback("Начать тест", 'next')], [Markup.button.callback(CMD_TEXT.menu, 'menu')],
        ]).resize());
        ctx.session.testCorrects = 0;
    } else if (ctx.session.current_task > test.length-2) {
        ctx.scene.enter('result');
    } else {
        await sendNextTask(ctx);
    }
});

testSlovingScene.action('next', async (ctx) => {
    if (ctx.session.current_task > test.length-2) {
        ctx.scene.enter('result');
    } else {
        await sendNextTask(ctx);
    }
});

testSlovingScene.action('prev', async (ctx) => {
    if (ctx.session.current_task >= 3) {
        ctx.session.current_task -= 2;
        await sendNextTask(ctx);
    } else {
        ctx.scene.enter("mainMenu");
    }
});

testSlovingScene.action('pin', async (ctx) => {
    ctx.reply("⚠️ Пока что нельзя закрепить задание");
});

testSlovingScene.action('answer', async (ctx) => {
    ctx.scene.enter('answer');
});

async function sendNextTask(ctx) {
    ctx.session.current_task++;
    const currentTask = test[ctx.session.current_task];
    const taskUrl = currentTask.task[0];
    const answer = currentTask.answer;
    
    try {
        const response = await axios.get(taskUrl, { 
            responseType: "arraybuffer",
        });

        const photo = Buffer.from(response.data, "binary");

        ctx.replyWithPhoto(
            { source: photo },
            {
                caption: `📝 Задание ${ctx.session.current_task + 1}`,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Ответить ✅", callback_data: "answer" }],
                        [
                            { text: "⬅️", callback_data: "prev" },
                            { text: "📌", callback_data: "pin" },
                            { text: "➡️", callback_data: "next" },
                        ],
                    ],
                },
            },
        );
    } catch (error) {
        console.error(error);
    }
}

module.exports = { testSlovingScene };
