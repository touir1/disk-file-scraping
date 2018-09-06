const fs = require('fs');
const _ = require('lodash');

var data = JSON.parse(fs.readFileSync('data/save.json', 'utf8'));

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

recursive_search(data);

fs.writeFile('data/flattenedSave.json', JSON.stringify(flattenedFilteredFiles), 'utf8', function(error){
	if(error) throw error;
	console.log('completed');
});