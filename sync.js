const dirTree = require("directory-tree");
const _ = require('lodash');
const fs = require("fs");

const directory_path='PATH_TO_FILE';

const filteredTree = dirTree(directory_path, {
  extensions: /\.(xlsx|docx|pdf)$/
});

fs.writeFile('data/save.json', JSON.stringify(filteredTree), 'utf8', function(error){
	if(error) throw error;
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

recursive_search(data);

fs.writeFile('data/flattenedSave.json', JSON.stringify(flattenedFilteredFiles), 'utf8', function(error){
	if(error) throw error;
	console.log('completed');
});