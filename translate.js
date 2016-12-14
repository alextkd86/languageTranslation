var express = require('express');
var app = express(); 
var bodyparser  = require('body-parser');
//Application use module bodyparser
app.use(bodyparser.urlencoded({extended: false}));
//Parser JSON -- APIRest
app.use(bodyparser.json());
//https://www.npmjs.com/package/google-translate-api
const translate = require('google-translate-api');

//POST - From automatic language detection to 'X' language
app.post('/automaticTranslator', function(req, res){
    //Text to traduce
    var text = req.body.text || "Enter a text";
    //Language to convert to
    var language = req.body.language || "en";
    //Function call Google API
    translate(text, {to: language}).then(response => {
        var traducedObject = {
                textIn: text,
                languageIn: response.from.language.iso,
                textOut: response.text,
                languageOut: language
            }
        console.log("Original text is: " + text + ". Writteng in the Language: '" + response.from.language.iso + "'. The translated text in the language: '" + language +"' is: " + response.text);
        res.json(traducedObject);
    }).catch(err => {
        console.error(err);
    });
});

//From 'A' language to 'B' language with a typo:
app.post('/nonAutomaticTranslator', function(req, res){
    //Text to traduce
    var text = req.body.text || "Enter a text";
    //Original Language
    var originalLanguage = req.body.originalLanguage || 'en';
    //Final Language
    var finalLanguage = req.body.finalLanguage || 'es';
    //Function call Google API
    translate(text, {from: originalLanguage, to: finalLanguage}).then(response => {
        console.log(response.text);
        console.log(response.from.text.autoCorrected);
        console.log(response.from.text.value);
        console.log(response.from.text.didYouMean);

        //Business Logic
        var traducedObject = {
                textIn: text,
                languageIn: originalLanguage,
                textOut: response.text,
                languageOut: finalLanguage
            }
        console.log("Original text is: " + text + ". Writteng in the Language: '" + originalLanguage + "'. The translated text in the language: '" + finalLanguage +"' is: " + response.text);
        res.json(traducedObject);
    }).catch(err => {
        console.error(err);
    });
});

//Server turned on
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("Server initialized on the port: ", server.address().port);
});