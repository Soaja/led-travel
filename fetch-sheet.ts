import fs from 'fs';

async function fetchSheet() {
  const url = 'https://docs.google.com/spreadsheets/d/1ud-VcJwwAeo9cNkUD_NWihcd8cHueRvw8K9EVKl78a8/export?format=csv';
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(text.substring(0, 1000)); // Print first 1000 chars to see structure
  } catch (e) {
    console.error(e);
  }
}

fetchSheet();
