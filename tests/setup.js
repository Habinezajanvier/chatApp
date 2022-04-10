import mongoose from 'mongoose';

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.connection.close();
});
