import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">📚 HKSI Paper 3 学习平台</h1>
          <p className="text-gray-600 mt-2">香港证券及投资学会 卷三（衍生工具）</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600">1,108</div>
            <div className="text-gray-600 text-sm">总题目数</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">8</div>
            <div className="text-gray-600 text-sm">章节</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600">9</div>
            <div className="text-gray-600 text-sm">模拟卷</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-orange-600">7</div>
            <div className="text-gray-600 text-sm">讲义PDF</div>
          </div>
        </div>

        {/* Main Modules */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 模拟做题 */}
          <Link href="/practice" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">模拟做题</h2>
              <p className="text-gray-600 mt-2">分章练习 748 题 + 模拟考试 360 题</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">分章练习</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">模拟考试</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">答案解析</span>
              </div>
              <div className="mt-6 text-blue-600 font-medium flex items-center">
                开始做题 
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* 复习讲义 */}
          <Link href="/materials" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500">
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">复习讲义</h2>
              <p className="text-gray-600 mt-2">7 份章节温习手册 PDF</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">第1-7章</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">PDF下载</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">在线阅读</span>
              </div>
              <div className="mt-6 text-green-600 font-medium flex items-center">
                查看讲义 
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Chapter Overview */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📊 章节题目分布</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { ch: '第1章', title: '监管架构', count: 52, color: 'blue' },
              { ch: '第2章', title: '衍生工具基础', count: 112, color: 'green' },
              { ch: '第3章', title: '期货合约', count: 38, color: 'yellow' },
              { ch: '第4章', title: '期权', count: 290, color: 'red' },
              { ch: '第5章', title: '结构性产品', count: 54, color: 'purple' },
              { ch: '第6章', title: '风险管理', count: 102, color: 'pink' },
              { ch: '第7章', title: '交易及结算', count: 82, color: 'indigo' },
              { ch: '第8章', title: '操守准则', count: 18, color: 'gray' },
            ].map((item) => (
              <div key={item.ch} className={`p-4 rounded-xl bg-${item.color}-50 border border-${item.color}-200`}>
                <div className="font-bold text-gray-900">{item.ch}</div>
                <div className="text-sm text-gray-600">{item.title}</div>
                <div className={`text-lg font-bold text-${item.color}-600 mt-1`}>{item.count} 题</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          题库来源：30hourspass.com | 仅供学习参考
        </div>
      </div>
    </main>
  );
}
