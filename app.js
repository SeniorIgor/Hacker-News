const express = require('express');
const config = require('config');
const path = require('path');
// const cors = require('cors');

const app = express();

app.use(express.json({ exended: true }));
// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use(cors({ origin: "http://localhost:3000" }));
app.use('/api/news', require('./routes/news.routes'));
app.use('/api/comments', require('./routes/comments.routes'));


const PORT = config.get('port') || 5000;

async function start() {
	try {
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

	} catch (err) {
		console.log('Server error', err.message);
		process.exit(1);
	}
}

start();