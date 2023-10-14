const { Scenes, Markup } = require('telegraf');
let test = require('../tests/t0.json');
const answerScene = new Scenes.BaseScene('answer');
const { statsUpdate } = require('./spreadsheet');

answerScene.enter(async (ctx) => {
    const currentTestNum = ctx.session.cur_test; 
    const testPath = `../tests/t${currentTestNum}.json`; 
    if(currentTestNum){
        test = require(testPath); 
    }
    
    ctx.reply("Введите ваш ответ:");
    
});

answerScene.hears(/.+/, async (ctx) => {
    const correctAnswer = test[ctx.session.current_task].answer;
    const id = ctx.from.id;

    ctx.session.curUserAnswer = ctx.message.text;
    console.log(ctx.session.curUserAnswer, correctAnswer);
    if(ctx.session.curUserAnswer == correctAnswer){
        ctx.reply("Правильно!")
        ctx.session.testCorrects += 1;
        await statsUpdate(id, 1);
        ctx.scene.enter("testsloving");
    }else{
        ctx.reply("Неправильно!")
        await statsUpdate(id, 0);
        ctx.scene.enter("testsloving");
    }
});



module.exports = { answerScene }; 