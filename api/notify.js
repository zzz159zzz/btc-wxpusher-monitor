
import fetch from 'node-fetch';
import { getLastNotified, setLastNotified } from '../utils/memory.js';

const TARGET_HEIGHT = 900436;
const INTERVAL = 144;
const WXPUSHER_APP_TOKEN = '你的WxPusher_appToken';
const UID = '你的接收者UID';

export default async function handler(req, res) {
  try {
    const resp = await fetch('https://mempool.space/api/blocks/tip/height');
    const height = parseInt(await resp.text(), 10);

    const lastNotified = await getLastNotified();
    let shouldNotify = false;
    let message = '';

    if (!lastNotified && height >= TARGET_HEIGHT) {
      shouldNotify = true;
      message = `🎯 区块高度已达 ${height}，开始监控任务。`;
    } else if (lastNotified && (height - lastNotified) >= INTERVAL) {
      shouldNotify = true;
      message = `⛏️ 区块高度已过 144（当前：${height}），已达到下一个通知点。`;
    }

    if (shouldNotify) {
      await setLastNotified(height);

      const wxBody = {
        appToken: WXPUSHER_APP_TOKEN,
        content: message,
        summary: "BTC 区块通知",
        contentType: 1,
        uids: [UID]
      };

      await fetch("https://wxpusher.zjiecode.com/api/send/message", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wxBody)
      });
    }

    res.status(200).json({ ok: true, height, notified: shouldNotify });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
}
