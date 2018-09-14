const http = require('http');
const fs = require('fs');
const process = require('process');

const HOST = '0.0.0.0';
const PORT = 3132;

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

function getMimeType(filePath){
	if(filePath.toLowerCase().endsWith('.pdf')) return 'application/pdf';
	if(filePath.toLowerCase().endsWith('.xlsx')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	if(filePath.toLowerCase().endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
	return 'application/octet-stream';
}


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }
	
    var app = http.createServer(function(request, response) {
	var sender_ip = request.connection.remoteAddress || 
					request.socket.remoteAddress || 
					(request.connection.socket ? request.connection.socket.remoteAddress : null);
	logMessage('request from '+sender_ip+' : '+request.url);
	if(request.url == '/') 
	{
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
	}
	else if(request.url.startsWith('/file/'))
	{
		try
		{
			var filePath = decodeURI(request.url.slice(6));
			logMessage('request from '+sender_ip+' : looking for file '+filePath);
			var content = fs.readFileSync(filePath);
			response.writeHeader(200, {"Content-Type": getMimeType(filePath)});
			response.write(content);
		}
		catch(error)
		{
			console.log('file not found');
			response.writeHeader(404,{});
		}
	}
	else
	{
		try
		{
			response.writeHeader(200, {});
			var content = fs.readFileSync("."+request.url);
			response.write(content);
		}
		catch(error)
		{
			response.writeHeader(404,{});
		}
	}
	response.end();  
});
	var io = require('socket.io')(app);
	
	app.listen(PORT,HOST, function(error){
		if(error){
			throw error;
		}
		logMessage('server listening on port '+PORT);
		
		
		var content = process.pid;
		var encoding = "utf8";

		fs.writeFile('RUNNING', content, encoding, function(err) {
			if (err) throw err;

			logMessage("The PID = "+process.pid+" was succesfully saved!");
		});
		
	});
	
	fs.readFile('data/server_data.json', 'utf8', function (err,data){
		var dataParsed = {};
		
		if(err) {
			dataParsed.lastId = 1;
			fs.writeFile('data/server_data.json', JSON.stringify(dataParsed), 'utf8', function(error){
				if(error) throw error;
				logMessage('a new server_data.json file was created');
			});
		}
		
		dataParsed = data;
		dataParsed.lastId = dataParsed.lastId + 1;
		fs.writeFile('data/server_data.json', JSON.stringify(dataParsed), 'utf8', function(error){
			if(error) throw error;
			console.log('the server_data.json file was updated');
		});
		
		io.on('connection', function (socket) {
			socket.on('ping_changes', function (data) {
				socket.emit('ping_changes_response', dataParsed);
			});
		});
	});
	
	
});