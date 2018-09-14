const dirTree = require("directory-tree");
const _ = require('lodash');
const fs = require("fs");

const directory_path='PATH_TO_FILE';

const filteredTree = dirTree(directory_path, {
  extensions: /\.(xlsx|docx|pdf)$/
});

function log_throw_error(error){
	console.log("Error:", error.stack);
	console.log("Error:", error.name);
	console.log("Error:", error.message);
	throw error;
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + '-' + month + "-" + year + " " + hour + ":" + min + ":" + sec;

}

function logMessage(message){
	console.log('['+getDateTime()+']: '+message);
}

fs.writeFile('./data/save.json', JSON.stringify(filteredTree), 'utf8', function(error){
	if(error) 
	{
		logMessage('error while saving into save.json');
		log_throw_error(error);
	}
	logMessage('sync and save into save.json completed');
});

var flattenedFilteredFiles = {'files' : []};

function isDefined(item){
	return (item != null && typeof item !== 'undefined');
}

function isFilled(item){
	return isDefined(item) && item != [] && item != {};
}

function recursive_search(item){
	if (!isDefined(item)) return;
	if(item.type != 'file' && isFilled(item.children)){
		for(var i=0;i<item.children.length;i++){
			recursive_search(item.children[i]);
		}
	}
	if(item.type == 'file' && !item.name.startsWith('~$')) flattenedFilteredFiles.files.push(item);
}

recursive_search(filteredTree);

fs.writeFile('./data/flattenedSave.json', JSON.stringify(flattenedFilteredFiles), 'utf8', function(error){
	if(error)
	{
		logMessage('error while saving into flattenedSave.json');
		log_throw_error(error);
	}
	logMessage('filtering and save into flattenedSave.json completed');
});