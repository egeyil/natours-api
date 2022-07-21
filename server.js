const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB is connected');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
