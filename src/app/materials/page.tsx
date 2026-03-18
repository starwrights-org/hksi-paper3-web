import Link from 'next/link';
import { pdfs } from '@/lib/questions';

export default function MaterialsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="text-green-600 hover:text-green-800 mb-2 inline-block">← 返回首页</Link>
          <h1 className="text-3xl font-bold text-gray-900">📖 复习讲义</h1>
          <p className="text-gray-600 mt-2">第1-7章温习手册 PDF</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* PDF List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl mb-4">📕</div>
              <h2 className="text-xl font-bold text-gray-900">{pdf.name}</h2>
              <p className="text-gray-500 text-sm mt-2">详细知识点讲解</p>
              
              <div className="mt-6 flex gap-3">
                <a
                  href={`/course_pdfs/${pdf.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                >
                  📖 在线阅读
                </a>
                <a
                  href={`/course_pdfs/${pdf.file}`}
                  download
                  className="flex-1 py-2 border border-green-600 text-green-600 rounded-lg text-center font-medium hover:bg-green-50 transition-colors"
                >
                  ⬇️ 下载
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📌 学习建议</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="font-bold text-blue-800 mb-2">🎯 重点章节</div>
              <p className="text-blue-700 text-sm">第4章（期权）题目最多，占290题，是考试重点！</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="font-bold text-green-800 mb-2">📚 学习顺序</div>
              <p className="text-green-700 text-sm">建议先看讲义理解概念，再做对应章节题目巩固</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="font-bold text-purple-800 mb-2">⏰ 模拟考试</div>
              <p className="text-purple-700 text-sm">考前用模拟卷计时练习，每卷40题，模拟真实考试</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="font-bold text-orange-800 mb-2">📝 错题回顾</div>
              <p className="text-orange-700 text-sm">注意每道题的「温习册出处」，方便针对性复习</p>
            </div>
          </div>
        </div>

        {/* Chapter Topics */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 各章节主题</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-900">章节</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">主题</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900">题目数</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">第1章</td>
                  <td className="py-3 px-4">监管架构（证监会、港交所、金管局）</td>
                  <td className="py-3 px-4">52</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">第2章</td>
                  <td className="py-3 px-4">衍生工具基础概念</td>
                  <td className="py-3 px-4">112</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">第3章</td>
                  <td className="py-3 px-4">期货合约</td>
                  <td className="py-3 px-4">38</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 bg-yellow-50">
                  <td className="py-3 px-4 font-bold">第4章 ⭐</td>
                  <td className="py-3 px-4 font-bold">期权（重点章节）</td>
                  <td className="py-3 px-4 font-bold text-red-600">290</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">第5章</td>
                  <td className="py-3 px-4">结构性产品</td>
                  <td className="py-3 px-4">54</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">第6章</td>
                  <td className="py-3 px-4">风险管理</td>
                  <td className="py-3 px-4">102</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">第7章</td>
                  <td className="py-3 px-4">交易及结算</td>
                  <td className="py-3 px-4">82</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">第8章</td>
                  <td className="py-3 px-4">操守准则</td>
                  <td className="py-3 px-4">18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
