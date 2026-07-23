/**
 * @file    page.tsx
 * @brief   关于页——项目说明、立场声明、史料来源说明、使用指南。
 * @author  CRAtlas Team
 * @version 1.0.0
 * @date    2026-07-23
 */

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">关于 CRAtlas</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">项目说明</h2>
        <p className="text-gray-600 mt-2">
          CRAtlas 是 1966-1976 年文化大革命期间造反派与保皇派势力演变、关键事件、人物关系的可视化平台。本项目以马列毛主义为基本编纂立场，旨在为马列毛主义者、进步人士和历史自学者提供可靠的历史参考资料。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">意识形态立场声明</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>以马列毛主义为编纂立场</li>
          <li>区分编纂视角与史料来源</li>
          <li>不声称"价值中立"，但承诺史料准确</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">史料来源说明</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>官方档案/中央文件</li>
          <li>学术研究成果</li>
          <li>媒体报道（如《人民日报》原件）</li>
          <li>当事人回忆录</li>
          <li>地方志</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">使用指南</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>地图视图：按省份查看派系势力分布与事件标注</li>
          <li>时间轴视图：按时间顺序浏览关键事件</li>
          <li>关系图视图：探索人物、派系、事件之间的关系网络</li>
          <li>搜索：按 Cmd+K 打开全局搜索</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">贡献指南</h2>
        <p className="text-gray-600 mt-2">
          本项目欢迎社区贡献。无论是否熟悉 Git，您都可以参与纠错与补充。
        </p>

        <h3 className="text-base font-semibold text-gray-700 mt-4">低门槛入口（推荐）</h3>
        <p className="text-gray-600 mt-1">
          在每个详情页底部点击"建议修正"按钮，将跳转至 GitHub Issues 并自动预填模板。您只需填写文字描述，无需了解 Git 操作。
          也可以直接
          <a
            href="https://github.com/ROM4n2/CRAtlas/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mx-1"
          >
            创建新 Issue
          </a>
          提交建议。
        </p>

        <h3 className="text-base font-semibold text-gray-700 mt-4">正式入口</h3>
        <p className="text-gray-600 mt-1">
          熟悉 Git 的贡献者可通过
          <a
            href="https://github.com/ROM4n2/CRAtlas/pulls"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mx-1"
          >
            Pull Request
          </a>
          提交修改。请在 PR 描述中注明修改内容与史料来源。
        </p>

        <h3 className="text-base font-semibold text-gray-700 mt-4">Issue 模板说明</h3>
        <p className="text-gray-600 mt-1">提交 Issue 时，请尽量包含以下信息：</p>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          <li>问题类型：修正 / 补充 / 新增</li>
          <li>涉及实体 ID（如人物、派系、事件标识）</li>
          <li>建议内容：具体描述您期望的修改</li>
          <li>史料来源：支持您建议的文献、档案或其他出处</li>
        </ul>
      </section>
    </div>
  );
}
