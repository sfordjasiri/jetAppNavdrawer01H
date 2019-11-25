const express = require('express');
const app = express();

app.use(express.static("<PATH_TO_YOUR_APP>/web"))
app.listen(process.env.PORT || 3007);
