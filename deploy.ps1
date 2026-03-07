# 妙笔科技 - 自动化部署脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  妙笔科技 AI 营销平台 - 部署工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Node.js
Write-Host "[1/5] 检查环境..." -ForegroundColor Yellow
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 请先安装 Node.js: https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js 已安装" -ForegroundColor Green

# 2. 安装依赖
Write-Host ""
Write-Host "[2/5] 安装依赖..." -ForegroundColor Yellow
npm install
Write-Host "✅ 依赖安装完成" -ForegroundColor Green

# 3. 构建项目
Write-Host ""
Write-Host "[3/5] 构建项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 构建完成" -ForegroundColor Green

# 4. 部署选项
Write-Host ""
Write-Host "[4/5] 选择部署方式:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. Vercel (推荐, 免费)" -ForegroundColor White
Write-Host "  2. Cloudflare Pages (免费, 中国访问快)" -ForegroundColor White
Write-Host "  3. Netlify (免费)" -ForegroundColor White
Write-Host "  4. 仅本地运行" -ForegroundColor White
Write-Host ""

$choice = Read-Host "请选择 (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📋 Vercel 部署步骤:" -ForegroundColor Cyan
        Write-Host "   1. 访问 https://vercel.com 注册账号" -ForegroundColor White
        Write-Host "   2. 将此文件夹推送到 GitHub/GitLab" -ForegroundColor White
        Write-Host "   3. 在 Vercel 中导入仓库" -ForegroundColor White
        Write-Host "   4. 点击 Deploy，等待完成" -ForegroundColor White
        Write-Host ""
        Write-Host "💡 提示: Vercel 会自动检测 Next.js 项目" -ForegroundColor Yellow
    }
    "2" {
        Write-Host ""
        Write-Host "📋 Cloudflare Pages 部署步骤:" -ForegroundColor Cyan
        Write-Host "   1. 访问 https://pages.cloudflare.com 注册账号" -ForegroundColor White
        Write-Host "   2. 创建新项目，连接 GitHub" -ForegroundColor White
        Write-Host "   3. 配置: 构建命令 = npm run build" -ForegroundColor White
        Write-Host "   4. 配置: 输出目录 = .next" -ForegroundColor White
        Write-Host "   5. 点击 Save and Deploy" -ForegroundColor White
    }
    "3" {
        Write-Host ""
        Write-Host "📋 Netlify 部署步骤:" -ForegroundColor Cyan
        Write-Host "   1. 访问 https://netlify.com 注册账号" -ForegroundColor White
        Write-Host "   2. 连接 GitHub 仓库" -ForegroundColor White
        Write-Host "   3. 配置: 构建命令 = npm run build" -ForegroundColor White
        Write-Host "   4. 配置: 发布目录 = .next" -ForegroundColor White
        Write-Host "   5. 点击 Deploy site" -ForegroundColor White
    }
    "4" {
        Write-Host ""
        Write-Host "🚀 启动本地服务器..." -ForegroundColor Green
        npm start
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
