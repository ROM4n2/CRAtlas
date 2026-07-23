# components/comments/

评论区组件，基于 Giscus（GitHub Discussions）。

## 组件

- `GiscusComments.tsx` — 评论区主体，客户端组件，以 pathname 作为 discussion 匹配键。

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `NEXT_PUBLIC_GISCUS_REPO` | GitHub 仓库（格式：`owner/repo`） |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | 仓库 ID（Giscus 配置页获取） |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | Discussion 分类名 |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Discussion 分类 ID |

配置缺失时组件静默隐藏，不影响页面渲染。

## 使用方式

在任意详情页末尾引入：

```tsx
import GiscusComments from '@/components/comments/GiscusComments';

// 在页面 JSX 末尾
<GiscusComments />
```
