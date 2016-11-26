/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This is a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit. Alexa can tell you the TNG stardate
 * This sample supports multiple lauguages. (de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mixmasteru/alexa-startdate
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const onestardate = 34367056.4;
const stardatenull= "July 5, 2318 12:00:00";

const languageStrings = {
    'de-DE': {
        translation: {
            FACTS_START: [
                'Die aktuelle Sternzeit ist: ',
                'Die aktuelle Sternzeit lautet: ',
                'Es ist: ',
                'Sternzeit: ',
            ],
            DEC_SEP: 'Komma',
            SKILL_NAME: 'Sternzeit',
            HELP_MESSAGE: 'Du kannst sagen, „Sage mir die aktuelle Sternzeit“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        const factArr = this.t('FACTS_START');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const sternzeit = alexafy(stardate(),this.t('DEC_SEP'));

        // Create speech output
        const speechOutput = randomFact+sternzeit;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), sternzeit);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// startdate calcucation TNG style
function stardate(dateIn){
	var StardateOrigin = new Date(stardatenull);
	var StardateInput = new Date();

	if(typeof dateIn !== "undefined" && typeof dateIn === "string"){
		StardateInput = new Date(dateIn);
	}

	var findMilliseconds = StardateInput.getTime() - StardateOrigin.getTime();
	var findStarYear = findMilliseconds / (onestardate);

	findStarYear = Math.floor(findStarYear * 100);
	findStarYear = findStarYear / 100

	return findStarYear;
}

// inserts spaces to startdate to get alexa say single digets
function alexafy(stardate, dec_sep) {
	var sNumber = stardate.toString();
	var output = "";

	for (var i = 0, len = sNumber.length; i < len; i += 1) {
		output += sNumber.charAt(i) + " ";
	}
	output = output.replace(".",dec_sep);
	output = output.trim();
	return output;
}
