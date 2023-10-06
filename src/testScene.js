const { Scenes, Markup, session } = require('telegraf');
const test = require('../tests/test0.json');
const { CMD_TEXT } = require('./consts');
const { default: axios } = require('axios');


const testScene = new Scenes.BaseScene('test');

testScene.enter(async (ctx) => {
    if(ctx.session.current_task <= 1){
        ctx.reply("Это бесплатный тест для испытания бота в нем 10 заданий из нашего курса, Удачи!", Markup.inlineKeyboard([
            [Markup.button.callback("Начать тест", 'next')],[Markup.button.callback(CMD_TEXT.menu, 'menu')],
        ]).resize())
    }else{
        
        await sendNextTask(ctx, ctx.session.current_task);
    }
    
    
});

testScene.action('next', async (ctx) => {
    
    await sendNextTask(ctx, ctx.session.current_task);
});

testScene.action('prev', async (ctx) => {
    ctx.session.current_task -= 1;
    await sendNextTask(ctx, ctx.session.current_task);
});

testScene.action('answer', async (ctx) => {
    ctx.scene.enter('answer');
    

    //await statsUpdate(id, isCorrect);

    //ctx.session.current_task++;
    //await sendNextTask(ctx, ctx.session.current_task);
});

async function sendNextTask(ctx, currentTaskNum) {
    ctx.session.current_task++;
    const currentTask = test[currentTaskNum];
    const taskUrl = currentTask.task;
    const answer = currentTask.answer;
    console.log(currentTask);
    try {
        const response = await axios.get(taskUrl, {
            responseType: "arraybuffer",
        });

        const photo = Buffer.from(response.data, "binary");

        ctx.replyWithPhoto(
            { source: photo },
            {
                caption: `Задание ${currentTaskNum}`,
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
        console.error();
    }
}


module.exports = {testScene};
