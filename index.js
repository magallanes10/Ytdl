const express = require('express');
const ytFinder = require('yt-finder-nextgen');

const app = express();
const port = 3000;

class Download {
  constructor(url, option) {
    this.url = url;
    this.option = option;
  }

  async download() {
    try {
      const result = await ytFinder.yt(this.url, this.option);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

app.get('/yt', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const downloadInstance = new Download(url, 'mp3');

  try {
    const result = await downloadInstance.download();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
