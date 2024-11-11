const app = require('./App'); // Import the Express application
require('dotenv').config();

const port = process.env.PORT || 5001; // Set port

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
