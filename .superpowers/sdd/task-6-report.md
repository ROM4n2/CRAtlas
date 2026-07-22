# Task 6 Report: 中国地图 GeoJSON 下载

## Status: DONE

## Commits Created
- `fb1b86c` — [Phase 0] chore(geojson): 中国地图 GeoJSON 下载（含台湾、南海诸岛）

## Files
- Created: `scripts/download-geojson.sh` (24 lines, bash downloader with curl/wget fallback)
- Created: `public/china.json` (downloaded)

## File Size
- `public/china.json`: **582,522 bytes** (~569 KB)

## Verification
- Type: `FeatureCollection`
- Features: **35** (34 省级行政区 + 台湾)
- Source: DataV.GeoAtlas `100000_full.json` (中国全境含台湾、南海诸岛)

## Concerns
- None. Download succeeded via curl without proxy issues. GeoJSON validated successfully.
