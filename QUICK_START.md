# 妙笔科技 - 快速启动指南

## 🎉 当前状态

✅ 网站已成功升级为苹果式设计风格  
✅ 开发服务器正在运行: **http://localhost:3001**  
✅ 所有页面已完成视觉升级  

## 🚀 方案一：临时外网访问（立即可用）

### 使用 LocalXpose（免费，无需注册）

1. 下载 LocalXpose: https://localxpose.io/download
2. 解压后运行:
   ```bash
   loclx tunnel http --to localhost:3001
   ```
3. 你会获得一个公网网址，分享给任何人即可访问！

### 使用 Serveo（免费，无需注册）

```bash
ssh -R 80:localhost:3001 serveo.net
```

### 使用 ngrok（需要注册）

1. 注册 ngrok: https://ngrok.com
2. 下载并安装
3. 运行:
   ```bash
   ngrok http 3001
   ```

## 🌐 方案二：永久免费部署（推荐）

### Vercel 部署（最简单）

1. 注册 Vercel: https://vercel.com
2. 将 `AI营销平台` 文件夹推送到 GitHub
3. 在 Vercel 点击 "New Project"
4. 选择你的仓库，点击 "Deploy"
5. 等待 1-2 分钟，获得永久免费网址！

### Cloudflare Pages（中国访问更快）

1. 注册 Cloudflare: https://pages.cloudflare.com
2. 创建新项目，连接 GitHub
3. 配置：
   - 构建命令: `npm run build`
   - 输出目录: `.next`
4. 点击 "Save and Deploy"

## 📁 项目文件说明

```
AI营销平台/
├── app/                    # 页面文件
│   ├── page.tsx           # 首页（赛博深邃风格）
│   ├── project/page.tsx   # 立项页面（苹果式极简）
│   ├── topics/page.tsx    # 选题页面（Bento布局）
│   ├── editor/page.tsx    # 编辑页面（苹果式极简）
│   ├── shoot/page.tsx     # 拍摄页面（沉浸式）
│   ├── clip/page.tsx      # 剪辑页面（沉浸式）
│   ├── manage/page.tsx    # 管理页面（数据流）
│   └── login/page.tsx     # 登录页面（苹果式极简）
├── components/
│   └── Nav.tsx            # 导航栏
├── lib/
│   ├── AppContext.tsx      # 全局状态
│   └── types.ts           # 类型定义
├── deploy.ps1            # 自动化部署脚本
├── DEPLOY.md             # 详细部署指南
└── package.json          # 项目配置
```

## 🎨 设计特点

- **呼吸感**: 大面积留白、超大间距
- **层级感**: 渐变色彩、深浅对比
- **未来感**: 毛玻璃效果、流畅动画
- **大圆角**: 20-30px 圆角设计
- **品牌名**: 妙笔科技

## 💡 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📞 需要帮助？

查看 `DEPLOY.md` 获取更详细的部署说明！
