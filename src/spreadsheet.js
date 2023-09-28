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
        console.error(`Error while saving ID: ${id}`, error);
    }
}

async function statsUpdate(id, is_correct) {
    saveId(id)
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            console.log(id, row.tgid);
            if (row.tgid === id) {
                if (is_correct) {
                    row.correct_answers += 1;
                }
                row.answers += 1;
                await row.save();
                break;
            }
        }

        console.log(`Stats updated for ID: ${id}`);
    } catch (error) {
        console.error(`Error while updating stats for ID: ${id}, error`);
    }
}

module.exports = { saveId, statsUpdate };


