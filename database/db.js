var __path = process.cwd(),
      monk = require('monk'),
     { color } = require(__path + '/lib/color.js')
     const { limitCount } = require('../lib/settings');
const { User } = require('./model');

async function addUser(username, password, apikey) {
        let obj = { username, password, apikey, defaultKey: apikey, premium: [], limit: limitCount };
        User.create(obj);
    }
    module.exports.addUser = addUser

    async function checkUsername(username) {
        let users = await User.findOne({username: username});
        if(users !== null) {
            return users.username;
        } else {
            return false;
        }
    }
    module.exports.checkUsername = checkUsername;

    async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username};
    }
    module.exports.getApikey = getApikey;

    async function cekKey(apikey) {
        let db = await User.findOne({apikey: apikey});
        if(db === null) {
            return false;
        } else {
            return db.apikey;
        }
    }
    module.exports.cekKey = cekKey;
// Connection URL
var url = 'https://aruliazmibot-api.herokuapp.com';
try {
if(url == 'https://docs-katashi.herokuapp.com/docs') throw console.log(color('Cek konfigurasi database, var url belum diisi','red'));
} catch (e) {
	return;
	}
var db = monk(url);

db.then(() => {
  console.log(color('Connected correctly to server, ZhirrrGanss','green'))
})
.catch ((e) => {
	console.log(color('Error : '+ e +'\n\nGagal connect ke database, \ncek configurasi database apakah Connection URL sudah benar','red'))
	})


module.exports = db
