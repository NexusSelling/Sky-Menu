export default function handler(req, res) {
  const whitelist = [
    "127.0.0.1",
    "::1",
    // Füge hier die IPs deiner Kunden/Freunde hinzu
    "YOUR_IP_HERE" 
  ];

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const clientIp = ip.split(',')[0].trim();

  if (whitelist.includes(clientIp)) {
    res.status(200).json({ authorized: true, ip: clientIp });
  } else {
    res.status(403).json({ authorized: false, ip: clientIp, message: "IP not whitelisted" });
  }
}
