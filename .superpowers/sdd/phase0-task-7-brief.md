### Task 7: GitHub Actions 自动部署

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: GitHub 仓库 + GitHub Pages
- Produces: 推送到 main 分支时自动构建并部署到 GitHub Pages

- [ ] **Step 1: 创建 GitHub Actions 工作流**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Download GeoJSON
        run: npm run download-geojson

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /CRAtlas

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 提交**

```bash
cd D:\Code\CRAtlas && git add .github/workflows/deploy.yml
git commit -m "[Phase 0] ci(deploy): GitHub Actions 自动部署到 Pages"
```

---

