# 妙笔科技 - 部署指南

## 方案一：Vercel 部署（推荐，免费）

1. 注册 Vercel 账号：https://vercel.com
2. 将代码推送到 GitHub/GitLab 仓库
3. 在 Vercel 中导入仓库
4. 点击部署，等待完成

## 方案二：Cloudflare Pages 部署（免费，中国访问更快）

1. 注册 Cloudflare 账号：https://pages.cloudflare.com
2. 创建新项目，连接 GitHub 仓库
3. 配置构建命令：`npm run build`
4. 配置输出目录：`.next`
5. 点击部署

## 方案三：Netlify 部署（免费）

1. 注册 Netlify 账号：https://netlify.com
2. 连接 GitHub 仓库
3. 配置构建命令：`npm run build`
4. 配置发布目录：`.next`
5. 点击部署

## 本地临时外网访问（使用 ngrok）

```bash
# 1. 启动开发服务器
npm run dev

# 2. 在另一个终端启动 ngrok
ngrok http 3000
```

## 项目信息

- 项目名称：妙笔科技 AI 营销平台
- 技术栈：Next.js 14 + React 18 + Tailwind CSS
- 设计风格：苹果式极简 + 赛博深邃元素
