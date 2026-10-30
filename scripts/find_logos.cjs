const https = require('https');

function fetchBody(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const data = await fetchBody('https://web.archive.org/web/20230601000000/https://acupuncturist.edu/');
  const imgs = data.match(/https:\/\/web\.archive\.org\/web\/[0-9]+\/https?:\/\/acupuncturist\.edu\/[^\s"'<>]+\.(?:png|svg|jpg)/gi);
  console.log('Wayback acupuncturist images:', imgs ? imgs.slice(0, 10) : 'none');
}

run();
