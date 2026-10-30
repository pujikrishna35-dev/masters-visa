const fs = require('fs');
const path = require('path');
const https = require('https');

const DIR = path.resolve(__dirname, '../public/images/universities');
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log('Failed:', res.statusCode, url);
        return resolve(false);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log('Saved:', dest);
        resolve(true);
      });
    }).on('error', (err) => {
      console.log('Error:', err.message);
      resolve(false);
    });
  });
}

// Five Element Acupuncture SVG
const afeaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="95" fill="#00A896"/>
  <circle cx="65" cy="72" r="6" fill="#ffffff"/>
  <circle cx="100" cy="56" r="7" fill="#ffffff"/>
  <circle cx="135" cy="72" r="6" fill="#ffffff"/>
  <path d="M 40 102 C 65 125, 85 130, 95 162 L 105 162 C 115 130, 135 125, 160 102 C 145 106, 125 110, 100 88 C 75 110, 55 106, 40 102 Z" fill="#ffffff"/>
</svg>`;

fs.writeFileSync(path.join(DIR, 'afea_logo.svg'), afeaSvg, 'utf8');
console.log('Written afea_logo.svg');

async function run() {
  const list = [
    { name: 'anc_logo.png', url: 'https://static.wixstatic.com/media/8f3705_2f57e6eee74c41778c442b847f37d700~mv2.png' },
    { name: 'abac_logo.png', url: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Abraham_Baldwin_Agricultural_College_Logo.png' },
    { name: 'alu_logo.png', url: 'https://alu.edu/wp-content/uploads/2018/11/alu-logo3.png' },
    { name: 'academy_college_logo.svg', url: 'https://www.academycollege.edu/wp-content/uploads/AcademyCollege-logo2.svg' },
    { name: 'ajr_logo.png', url: 'https://ajr.edu/wp-content/uploads/AJR_AnniversaryLogo__option1B-1.png' },
    { name: 'ajrca_logo.png', url: 'https://ajrca.edu/wp-content/uploads/2026/03/logo.png' },
    { name: 'academy_art_logo.png', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/AcademyArtUnivLogo.png' },
    { name: 'acchs_logo.png', url: 'https://acchs.edu/wp-content/uploads/2021/05/ACCHS_Logo_Centered-01-ociryeisqcgiyzku7hrlloiy7jt1mxxs4zjqgt1as0.png' },
    { name: 'aimc_logo.png', url: 'https://static.wixstatic.com/media/a7df6f_9109dfc594d145dead098fe3378616c4~mv2.png' }
  ];

  for (const item of list) {
    await downloadFile(item.url, path.join(DIR, item.name));
  }
}

run();
