const { Scenes, session } = require('telegraf');
const { mainMenuScene } = require('./mainMenuScene');
const { answerScene } = require('./answerScene');
const { statsScene } = require('./statsScene');
const { testResultsScene } = require('./testResultsScene');
const { testSelectionScene } = require('./testSelectionScene');
const { testSlovingScene } = require('./testSlovingScene');


const stage = new Scenes.Stage().register(mainMenuScene, answerScene, statsScene, testResultsScene, testSelectionScene, testSlovingScene)

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
