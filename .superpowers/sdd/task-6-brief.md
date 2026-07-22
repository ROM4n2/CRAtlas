### Task 6: 中国地图 GeoJSON 下载

**Files:**
- Create: `scripts/download-geojson.sh`
- Create: `public/china.json`（运行脚本后生成）

**Interfaces:**
- Consumes: nothing
- Produces: `public/china.json`（中国全境 GeoJSON，含台湾、南海诸岛）

- [ ] **Step 1: 创建下载脚本**

Create `scripts/download-geojson.sh`:
```bash
#!/bin/bash
# 下载中国全境 GeoJSON（含台湾、南海诸岛）
# 来源：阿里云 DataV.GeoAtlas

set -e

OUTPUT="public/china.json"
URL="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"

echo "正在下载中国地图 GeoJSON..."
mkdir -p public

if command -v curl &> /dev/null; then
  curl -L -o "$OUTPUT" "$URL"
elif command -v wget &> /dev/null; then
  wget -O "$OUTPUT" "$URL"
else
  echo "错误：需要 curl 或 wget"
  exit 1
fi

echo "下载完成：$OUTPUT"
echo "文件大小：$(wc -c < "$OUTPUT") bytes"
```

- [ ] **Step 2: 运行下载脚本**

Run: `cd D:\Code\CRAtlas && bash scripts/download-geojson.sh`
Expected: 下载成功，`public/china.json` 创建

- [ ] **Step 3: 验证 GeoJSON 有效性**

Run: `cd D:\Code\CRAtlas && node -e "const d=require('./public/china.json'); console.log('类型:', d.type, '特征数:', d.features.length)"`
Expected: 输出类似 "类型: FeatureCollection 特征数: 34+"

- [ ] **Step 4: 提交**

```bash
cd D:\Code\CRAtlas && git add scripts/download-geojson.sh public/china.json
git commit -m "[Phase 0] chore(geojson): 中国地图 GeoJSON 下载（含台湾、南海诸岛）"
```

---

