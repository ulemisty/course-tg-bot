const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const dotenv = require('dotenv');

dotenv.config();

const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
];

const jwt = new JWT({
    email: process.env.SERVICE_ACCOUNT_EMAIL,
    key: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    scopes: SCOPES,
});
  
const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SPREADSHEET_ID,
    jwt,
);

async function saveId(id) {
    try {
        await doc.loadInfo();
        console.log(`opened: ${doc.title} Google Sheet`);

        const sheet = doc.sheetsByIndex[0];

        await sheet.addRow({ tgid: id });
  
        console.log(`ID: ${id} saved in Google Sheets`);
    } catch (error) {
        console.error(`Error while saving ID: ${id}, error`);
    }
}

async function checkId(id) {
    try {
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
  
      for (let i = 0; i < rows.length; i++) {
        console.log(rows[i].get('tgid') == id);
        if (rows[i].get('tgid') == id) return true;
      }
  
      return false;
    } catch (error) {
      console.error(`Error while checking ID: ${id}, error`);
      return false;
    }
}

async function checkUsername(username) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].get('username') === username) return true;
        }

        return false;
    } catch (error) {
        console.error(`Error while checking Username: ${username}, error`);
        return false;
    }
}

async function initByUsername(username, id) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].get('username') === username) {
                rows[i].set('tgid', id);
                rows[i].set('correct_answers', 0);
                rows[i].set('answers', 0);
                await rows[i].save();
                console.log(`ID: ${id} saved for Username: ${username}`);
                return;
            }
        }

        console.log(`No matching Username found for saving ID: ${id}`);
    } catch (error) {
        console.error(`Error while saving ID: ${id} for Username: ${username}, error`);
    }
}

async function statsUpdate(id, is_correct) {
    //saveId(id)
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i].get('tgid'));
            if (rows[i].get('tgid') == id){
                rows[i].set('answers', Number(rows[i].get('answers'))+1);
                await rows[i].save()
                if(is_correct){
                    rows[i].set('correct_answers', Number(rows[i].get('correct_answers'))+1);
                    await rows[i].save();

                }else{
                    rows[i].set('mistakes', Number(rows[i].get('mistakes'))+1);
                    await rows[i].save()
                }
            }
        }
        
        console.log(`Stats updated for ID: ${id}`);
    } catch (error) {
        console.error(`Error while updating stats for ID: ${id}, error`);
    }
}


async function getStats(id) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        for (let i = 0; i < rows.length; i++) {
            
            if (rows[i].get('tgid') == id) {
                const correctAnswers = rows[i].get('correct_answers');
                const totalAnswers = rows[i].get('answers');
                console.log(correctAnswers, totalAnswers);
                return { correctAnswers, totalAnswers };
            }
        }

        return null;
    } catch (error) {
        console.error(`Error while retrieving stats for ID: ${id}`, error);
        return null;
    }
}

module.exports = { saveId, statsUpdate, checkId, getStats, checkUsername, initByUsername };