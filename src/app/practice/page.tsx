'use client';

import Link from 'next/link';
import { useState } from 'react';
import { chapters, mockExams } from '@/lib/questions';

export default function PracticePage() {
  const [mode, setMode] = useState<'chapter' | 'mock'>('chapter');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">← 返回首页</Link>
          <h1 className="text-3xl font-bold text-gray-900">📝 模拟做题</h1>
          <p className="text-gray-600 mt-2">选择章节或模拟卷开始练习</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode('chapter')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'chapter'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📚 分章练习 (748题)
          </button>
          <button
            onClick={() => setMode('mock')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'mock'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📋 模拟考试 (360题)
          </button>
        </div>

        {/* Chapter Practice */}
        {mode === 'chapter' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {chapters.map((ch) => (
              <Link
                key={ch.id}
                href={`/practice/${ch.id}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-2xl font-bold text-blue-600">{ch.name}</div>
                <div className="text-gray-700 font-medium mt-1">{ch.title}</div>
                <div className="text-gray-500 text-sm mt-2">{ch.count} 道题目</div>
                <div className="mt-4 text-blue-600 text-sm font-medium">开始练习 →</div>
              </Link>
            ))}
          </div>
        )}

        {/* Mock Exams */}
        {mode === 'mock' && (
          <div className="grid md:grid-cols-3 gap-4">
            {mockExams.map((exam) => (
              <Link
                key={exam.id}
                href={`/practice/${exam.id}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-green-500"
              >
                <div className="text-2xl font-bold text-green-600">{exam.name}</div>
                <div className="text-gray-500 text-sm mt-2">{exam.count} 道题目</div>
                <div className="mt-4 text-green-600 text-sm font-medium">开始考试 →</div>
              </Link>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-2">💡 做题提示</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• 每道题都有中英文对照</li>
            <li>• 选择答案后会显示正确答案和详细解析</li>
            <li>• 部分题目附有温习册出处，方便复习</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
