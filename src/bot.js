const { Markup, Scenes, session } = require('telegraf');
const { saveId } = require('./spreadsheet');
const { log } = require('console');
const { CMD_TEXT } = require('./consts');
const { mainMenuScene } = require('./mainMenuScene');
const { testScene } = require('./testScene');
const { answerScene } = require('./answerScene');
const { statsScene } = require('./statsScene');
const { testResultsScene } = require('./testResultsScene');


const stage = new Scenes.Stage().register(mainMenuScene, testScene, answerScene, statsScene, testResultsScene)

function setupBot(bot) {
    bot.use(session({ collectionName: "sessions" }));
    bot.use(stage.middleware());

    bot.start(async (ctx) => {
        ctx.scene.enter('mainMenu');
    });

    bot.on('text', async (ctx) => {
        
        
    });
}

module.exports = setupBot;
