import app from './app';
import config from '../config/config';

const { port } = config.app;

// Starting server
const server = app.listen(port, () => {
  console.log(`Server running on ${server.address().port}`);
});
