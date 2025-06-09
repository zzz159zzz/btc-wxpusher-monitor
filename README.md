
# BTC WxPusher Monitor

监控 BTC 区块高度，并将通知推送到你的微信（WxPusher）上。

## 🛠 使用方法

1. 注册并配置 WxPusher（https://wxpusher.zjiecode.com/）
2. 替换 `api/notify.js` 中的：

   ```js
   const WXPUSHER_APP_TOKEN = '你的WxPusher_appToken';
   const UID = '你的UID';
   ```

3. 将代码上传至 GitHub。
4. 登录 [Vercel](https://vercel.com)，连接此仓库部署。
5. 使用定时触发器（如 cron-job.org）访问：
   ```
   https://你的-vercel-url/api/notify
   ```

## 🧱 说明

- 初次触发为高度 ≥ 900436。
- 之后每过 144 个区块再触发一次通知（≈ 一天）。
