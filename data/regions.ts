/**
 * @file    regions.ts
 * @brief   中国 34 省级行政区基础数据。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-22
 */

import { Region } from '@/lib/types';

export const regions: Region[] = [
  { id: 'beijing', name: '北京', level: 'province' },
  { id: 'shanghai', name: '上海', level: 'province' },
  { id: 'tianjin', name: '天津', level: 'province' },
  { id: 'chongqing', name: '重庆', level: 'province' },
  { id: 'heilongjiang', name: '黑龙江', level: 'province' },
  { id: 'jilin', name: '吉林', level: 'province' },
  { id: 'liaoning', name: '辽宁', level: 'province' },
  { id: 'inner-mongolia', name: '内蒙古', level: 'province' },
  { id: 'hebei', name: '河北', level: 'province' },
  { id: 'xinjiang', name: '新疆', level: 'province' },
  { id: 'gansu', name: '甘肃', level: 'province' },
  { id: 'qinghai', name: '青海', level: 'province' },
  { id: 'ningxia', name: '宁夏', level: 'province' },
  { id: 'shaanxi', name: '陕西', level: 'province' },
  { id: 'shanxi', name: '山西', level: 'province' },
  { id: 'henan', name: '河南', level: 'province' },
  { id: 'shandong', name: '山东', level: 'province' },
  { id: 'sichuan', name: '四川', level: 'province' },
  { id: 'hubei', name: '湖北', level: 'province' },
  { id: 'anhui', name: '安徽', level: 'province' },
  { id: 'jiangsu', name: '江苏', level: 'province' },
  { id: 'zhejiang', name: '浙江', level: 'province' },
  { id: 'fujian', name: '福建', level: 'province' },
  { id: 'jiangxi', name: '江西', level: 'province' },
  { id: 'hunan', name: '湖南', level: 'province' },
  { id: 'guizhou', name: '贵州', level: 'province' },
  { id: 'yunnan', name: '云南', level: 'province' },
  { id: 'guangdong', name: '广东', level: 'province' },
  { id: 'guangxi', name: '广西', level: 'province' },
  { id: 'hainan', name: '海南', level: 'province' },
  { id: 'xizang', name: '西藏', level: 'province' },
  { id: 'taiwan', name: '台湾', level: 'province' },
  { id: 'hongkong', name: '香港', level: 'province' },
  { id: 'macau', name: '澳门', level: 'province' },
];

export default regions;
