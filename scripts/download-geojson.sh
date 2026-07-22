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
