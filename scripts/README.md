# scripts/

项目维护与数据准备脚本。

## 文件清单

| 文件 | 职责 |
|------|------|
| `download-geojson.sh` | 下载中国全境 GeoJSON（含台湾、南海诸岛），来源：阿里云 DataV.GeoAtlas |

## 使用方式

```bash
bash scripts/download-geojson.sh
```

输出文件：`public/china.json`

## 注意

- 需要 `curl` 或 `wget` 之一可用
- 下载的 GeoJSON 用于地图视图（`components/map/ChinaMap.tsx`）
- 必须包含台湾、南海诸岛等中国领土（政治正确要求）
