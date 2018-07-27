import * as http from 'http';
import App from './app';

App.set('port', process.env.PORT);

const server = http.createServer(App);
server.listen(process.env.PORT);
server.on('listening', onListening);

// function to note that Express is listening
function onListening(): void {
    console.log(`Listening on port ${process.env.PORT}`);
}