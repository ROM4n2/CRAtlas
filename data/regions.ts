/**
 * @file    regions.ts
 * @brief   中国 34 省级行政区基础数据（含地图中心坐标）。
 * @author  CRAtlas Team
 * @version 1.1.0
 * @date    2026-07-23
 *
 * @description
 * coordinates 取自 DataV GeoJSON 的 properties.center（[lng, lat]），
 * 用于 ECharts 地图事件散点定位。
 */

import { Region } from '@/lib/types';

export const regions: Region[] = [
  { id: 'beijing', name: '北京', level: 'province', coordinates: [116.405285, 39.904989] },
  { id: 'shanghai', name: '上海', level: 'province', coordinates: [121.472644, 31.231706] },
  { id: 'tianjin', name: '天津', level: 'province', coordinates: [117.190182, 39.125596] },
  { id: 'chongqing', name: '重庆', level: 'province', coordinates: [106.504962, 29.533155] },
  { id: 'heilongjiang', name: '黑龙江', level: 'province', coordinates: [126.642464, 45.756967] },
  { id: 'jilin', name: '吉林', level: 'province', coordinates: [125.3245, 43.886841] },
  { id: 'liaoning', name: '辽宁', level: 'province', coordinates: [123.429096, 41.796767] },
  { id: 'inner-mongolia', name: '内蒙古', level: 'province', coordinates: [111.670801, 40.818311] },
  { id: 'hebei', name: '河北', level: 'province', coordinates: [114.502461, 38.045474] },
  { id: 'xinjiang', name: '新疆', level: 'province', coordinates: [87.617733, 43.792818] },
  { id: 'gansu', name: '甘肃', level: 'province', coordinates: [103.823557, 36.058039] },
  { id: 'qinghai', name: '青海', level: 'province', coordinates: [101.778916, 36.623178] },
  { id: 'ningxia', name: '宁夏', level: 'province', coordinates: [106.278179, 38.46637] },
  { id: 'shaanxi', name: '陕西', level: 'province', coordinates: [108.948024, 34.263161] },
  { id: 'shanxi', name: '山西', level: 'province', coordinates: [112.549248, 37.857014] },
  { id: 'henan', name: '河南', level: 'province', coordinates: [113.665412, 34.757975] },
  { id: 'shandong', name: '山东', level: 'province', coordinates: [117.000923, 36.675807] },
  { id: 'sichuan', name: '四川', level: 'province', coordinates: [104.065735, 30.659462] },
  { id: 'hubei', name: '湖北', level: 'province', coordinates: [114.298572, 30.584355] },
  { id: 'anhui', name: '安徽', level: 'province', coordinates: [117.283042, 31.86119] },
  { id: 'jiangsu', name: '江苏', level: 'province', coordinates: [118.767413, 32.041544] },
  { id: 'zhejiang', name: '浙江', level: 'province', coordinates: [120.153576, 30.287459] },
  { id: 'fujian', name: '福建', level: 'province', coordinates: [119.306239, 26.075302] },
  { id: 'jiangxi', name: '江西', level: 'province', coordinates: [115.892151, 28.676493] },
  { id: 'hunan', name: '湖南', level: 'province', coordinates: [112.982279, 28.19409] },
  { id: 'guizhou', name: '贵州', level: 'province', coordinates: [106.713478, 26.578343] },
  { id: 'yunnan', name: '云南', level: 'province', coordinates: [102.712251, 25.040609] },
  { id: 'guangdong', name: '广东', level: 'province', coordinates: [113.280637, 23.125178] },
  { id: 'guangxi', name: '广西', level: 'province', coordinates: [108.320004, 22.82402] },
  { id: 'hainan', name: '海南', level: 'province', coordinates: [110.33119, 20.031971] },
  { id: 'xizang', name: '西藏', level: 'province', coordinates: [91.132212, 29.660361] },
  { id: 'taiwan', name: '台湾', level: 'province', coordinates: [121.509062, 25.044332] },
  { id: 'hongkong', name: '香港', level: 'province', coordinates: [114.173355, 22.320048] },
  { id: 'macau', name: '澳门', level: 'province', coordinates: [113.54909, 22.198951] },
];

export default regions;
