const { Scenes, Markup } = require('telegraf');
const { testScene } = require('./testScene');
const test = require('../tests/test0.json');
const answerScene = new Scenes.BaseScene('answer');
const { statsUpdate } = require('./spreadsheet');

answerScene.enter(async (ctx) => {
    ctx.reply("Введите ваш ответ:");
    
});

answerScene.hears(/.+/, async (ctx) => {
    const currentTask = test[ctx.session.current_task-1];
    const correctAnswer = currentTask.answer;
    const id = ctx.from.id;

    ctx.session.curUserAnswer = ctx.message.text;
    console.log(ctx.session.curUserAnswer, correctAnswer);
    if(ctx.session.curUserAnswer == correctAnswer){
        ctx.reply("Правильно!")
        await statsUpdate(id, 1);
        ctx.scene.enter("test");
    }else{
        ctx.reply("Неправильно!")
        await statsUpdate(id, 0);
        ctx.scene.enter("test");
    }
});



module.exports = { answerScene }; 