import * as http from 'http';
import App from './App';
const port = 3000;

App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('listening', onListening);

// function to note that Express is listening
function onListening(): void {
    console.log(`Listening on port ` + port);
}