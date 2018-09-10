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

fs.writeFile('./data/save.json', JSON.stringify(filteredTree), 'utf8', function(error){
	if(error) 
	{
		console.log('error while saving into save.json');
		log_throw_error(error);
	}
	console.log('completed');
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
	if(item.type == 'file') flattenedFilteredFiles.files.push(item);
}

recursive_search(filteredTree);

fs.writeFile('./data/flattenedSave.json', JSON.stringify(flattenedFilteredFiles), 'utf8', function(error){
	if(error)
	{
		console.log('error while saving into flattenedSave.json');
		log_throw_error(error);
	}
	console.log('completed');
});