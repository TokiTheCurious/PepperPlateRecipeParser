var https = require('https');
var parser = require('./fileparser')
const axios = require('axios')

const path = require('path');
const fs = require('fs');


const dir = "C:\\Users\\Piggy\\Desktop\\pepperplate_recipes\\";

var files = fs.readdirSync(dir).map(element => {
    return path.join(dir,element)
});

files.forEach(file => {
    var content = parser.parseFile(file);
    //fs.writeFileSync("C:\\Users\\Piggy\\Desktop\\output.json",content);
    
    axios
        .post('https://mamamia-recipe-service.now.sh/api/recipe', content, {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.status);
        })
        .catch(error => {
            console.error(file);
        })
        
});
