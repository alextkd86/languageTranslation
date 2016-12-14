# languageTranslation
Programming languages, Technologies and frameworks: Javascript, NodeJS, ExpressJS and API Google Translate
Simple API Rest that translates texts to a specific language through a POST request.
There are two ways:
A) It detects the language with which we write automatically.
      eg: 
        POST  -->  localhost:3000/automaticTranslator
        RAW   -->  {
                      "text": "¿Qué tal te va la vida?",  //Text to translate
                      "language": "en"                    //Language to translate
                    }   
B) We explicitly introduce the language with which we write.
      eg: 
        POST  -->  localhost:3000/nonAutomaticTranslator
        RAW   -->  {
                      "text": "Qúe tal te va la vida?", //Text to translate
                      "originalLanguage": "es",         //Language written "text"
                      "finalLanguage": "en"             //Language to translate
                    }   
