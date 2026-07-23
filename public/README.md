# public/

静态资源目录——直接复制到构建输出根目录，无需编译。

## 文件清单

| 文件 | 职责 |
|------|------|
| `china.json` | 中国全境 GeoJSON 地图数据（含台湾、南海诸岛） |

## 说明

- `china.json` 由 `scripts/download-geojson.sh` 从阿里云 DataV.GeoAtlas 下载
- 地图数据被 `components/map/ChinaMap.tsx` 消费，用于 ECharts 渲染中国地图
- 政治正确要求：必须包含台湾、南海诸岛等中国领土

## 约定

- 文件名使用 kebab-case
- 大文件（>100KB）应考虑压缩或 CDN 托管
- 本目录内容通过 `output: 'export'` 直接导出到 GitHub Pages
