import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const whitelist = [
    "127.0.0.1",
    "::1",
    "YOUR_IP_HERE"
  ];

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const clientIp = ip.split(',')[0].trim();

  if (!whitelist.includes(clientIp)) {
    return res.status(403).send("-- Access Denied: Your IP is not whitelisted.");
  }

  try {
    // Wir lesen das Script aus einem geschützten Pfad
    const filePath = path.join(process.cwd(), 'data', 'sky_menu.lua.txt');
    const scriptContent = fs.readFileSync(filePath, 'utf8');
    
    // Wir senden das Script als Plaintext zurück
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(scriptContent);
  } catch (error) {
    res.status(500).send("-- Error: Script file not found on server.");
  }
}
