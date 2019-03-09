const fs = require('fs');

const saveConfig = (config) => {
    let subscriber_ids_arr = [];
    let subscriber_ids_set = config.subscriber_ids;    // set 임시 저장
    config.subscriber_ids.forEach(v => subscriber_ids_arr.push(v));
    config.subscriber_ids = subscriber_ids_arr;

    fs.writeFile('config.json', JSON.stringify(config), (err, data) => {
        if (err)
            throw err;
        config.subscriber_ids = subscriber_ids_set; // set 객체 원복
    });
}

const loadConfig = (config) => {
    let subscriber_ids_set = new Set();
    config.subscriber_ids.forEach((v) => subscriber_ids_set.add(v));
    config.subscriber_ids = subscriber_ids_set;
}

module.exports = {
    saveConfig: saveConfig,
    loadConfig: loadConfig
}