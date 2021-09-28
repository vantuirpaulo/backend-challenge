import dotenv from 'dotenv';
import app from './app';

dotenv.config();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  const env = app.get("env");

  console.log(
    `server is running at http://localhost:${port} in ${env} mode`
  );
});
