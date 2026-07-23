### Task 1: 项目脚手架与依赖安装

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `.env.example`

**Interfaces:**
- Consumes: nothing
- Produces: 可运行的 Next.js 项目骨架，`npm run dev` 启动开发服务器

- [ ] **Step 1: 初始化 package.json 并安装依赖**

Run: `cd D:\Code\CRAtlas && npm init -y`
Expected: 创建 package.json

手动编辑 `package.json`，设置：
```json
{
  "name": "crmap",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "download-geojson": "bash scripts/download-geojson.sh"
  }
}
```

- [ ] **Step 2: 安装核心依赖**

Run: `cd D:\Code\CRAtlas && npm install next@^14.2.0 react@^18.3.0 react-dom@^18.3.0`
Expected: 安装成功，node_modules 创建

- [ ] **Step 3: 安装开发依赖**

Run: `cd D:\Code\CRAtlas && npm install -D typescript@^5.4.0 @types/node@^20.11.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0 eslint@^8.57.0 eslint-config-next@^14.2.0`
Expected: 安装成功

- [ ] **Step 4: 安装运行时依赖**

Run: `cd D:\Code\CRAtlas && npm install echarts@^5.5.0 echarts-for-react@^3.0.2 cytoscape@^3.29.0 react-cytoscapejs@^2.0.0 zustand@^4.5.0`
Expected: 安装成功

- [ ] **Step 5: 安装测试依赖**

Run: `cd D:\Code\CRAtlas && npm install -D jest@^29.7.0 @types/jest@^29.5.0 ts-jest@^29.1.0`
Expected: 安装成功

- [ ] **Step 6: 创建 tsconfig.json**

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: 创建 next.config.js**

Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
```

> `output: 'export'` 是静态导出的关键配置。`trailingSlash: true` 让 GitHub Pages 路由兼容。

- [ ] **Step 8: 创建 tailwind.config.ts**

Create `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rebel: '#DC2626',
        conservative: '#2563EB',
        military: '#CA8A04',
        contested: '#9333EA',
        nodata: '#9CA3AF',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 9: 创建 postcss.config.js**

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 10: 创建 .gitignore**

Create `.gitignore`:
```
node_modules/
.next/
out/
build/
.env
.env.local
*.log
.DS_Store
coverage/
```

- [ ] **Step 11: 创建 .env.example**

Create `.env.example`:
```bash
# GitHub Pages 部署配置（仓库名，用于静态资源路径）
NEXT_PUBLIC_BASE_PATH=/CRAtlas

# Giscus 评论配置（Phase 4 使用，https://giscus.app 获取）
NEXT_PUBLIC_GISCUS_REPO=your-org/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Discussions
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

- [ ] **Step 12: 验证项目启动**

Run: `cd D:\Code\CRAtlas && npm run dev`
Expected: 启动成功（即使页面报 404 也可接受，因为页面文件尚未创建）

- [ ] **Step 13: 提交**

```bash
cd D:\Code/CRMap && git add .
git commit -m "[Phase 0] chore(project): Next.js + TypeScript + Tailwind 项目初始化"
```

---

