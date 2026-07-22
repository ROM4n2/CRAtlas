# Task 3 Report: 示例数据填充

## Status: DONE

## Commits Created

- `45f6c16` — `[Phase 0] feat(data): 示例数据填充（5事件/6人物/4派系/34地区/5关系/3控制记录）`

## Files Created (7)

| File | Lines | Description |
| --- | --- | --- |
| `data/regions.ts` | 67 | 34 省级行政区 |
| `data/factions.ts` | 158 | 4 派系（中央文革小组/首都三司/上海工人造反派/北京老红卫兵） |
| `data/people.ts` | 321 | 6 人物（蒯大富/谭力夫/江青/张春桥/王洪文/陈伯达） |
| `data/events.ts` | 453 | 5 事件（二月提纲/五一六通知/八届十一中全会/一月风暴/二月逆流） |
| `data/relationships.ts` | 538 | 5 关系（2 membership + 1 causality + 2 faction-interaction） |
| `data/regionControls.ts` | 602 | 3 控制记录（北京×2 / 上海×1） |
| `data/README.md` | — | 数据源层文档（文件清单 + 数据规范 + 访问层说明） |

## One-Line Test Summary

`npx tsc --noEmit` → **pass, 0 errors, 0 warnings**（两次运行均通过：创建数据文件后 + 创建 README 后）

## Notes

- 6 个数据文件内容与 brief 完全一致，未做任何修改。
- `data/README.md` 为额外产出（用户要求），覆盖：
  - 目录用途（数据源层）
  - 文件清单 + 记录数
  - 数据规范（ID 命名 / 日期格式 / sources 要求 / 其他约定）
  - `lib/data.ts` 作为访问层的职责与使用说明（标注为"尚未实现，计划中"）
- `lib/data.ts` 当前不存在，README 已明确说明并给出未来接口示例，
  并建议现阶段组件直接 import `data/*` 时标注 TODO。
- Git 对 `.ts` / `.md` 文件发出 LF→CRLF 警告（Windows 环境默认 `core.autocrlf`），
  不影响提交，与 Task 1/2 一致，未改动。

## Concerns

无。
