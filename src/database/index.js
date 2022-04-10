import mongoose from 'mongoose';
import config from '../../config/config';
import User from './Model/user';

const {
  db: { host, port, name, database_url },
} = config;
export const url = name
  ? `mongodb://${host}:${port}/${name}`
  : database_url;

const options = {
  useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
};

(async () => {
  await mongoose.connect(url, options);
})();
// .then(() => {
//   // console.log('Connected to database');
// })
// .catch((err) => {
//   throw new Error(err);
// });

export default { User };
