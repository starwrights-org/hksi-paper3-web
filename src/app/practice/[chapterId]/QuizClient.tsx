'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { chapters, mockExams } from '@/lib/questions';

interface Question {
  id: string;
  questionCn: string;
  questionEn: string;
  answer: string;
  explanationCn: string;
  explanationEn: string;
  reference?: string;
}

function parseMarkdown(content: string): Question[] {
  const questions: Question[] = [];
  const blocks = content.split(/\n---\n\n## 第\d+题/);
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    
    const idMatch = block.match(/\(ID:\s*(\d+)\)/);
    const id = idMatch ? idMatch[1] : `q-${i}`;
    
    const cnMatch = block.match(/### 中文题目\n\n([\s\S]*?)(?=\n\n### English)/);
    const questionCn = cnMatch ? cnMatch[1].trim() : '';
    
    const enMatch = block.match(/### English\n\n([\s\S]*?)(?=\n\n\*\*正确答案)/);
    const questionEn = enMatch ? enMatch[1].trim() : '';
    
    const answerMatch = block.match(/\*\*正确答案：([ABCD])\*\*/);
    const answer = answerMatch ? answerMatch[1] : 'A';
    
    const explanationCnMatch = block.match(/### 答案解析\n\n([\s\S]*?)(?=\n\n### Explanation|$)/);
    const explanationCn = explanationCnMatch ? explanationCnMatch[1].trim() : '';
    
    const explanationEnMatch = block.match(/### Explanation\n\n([\s\S]*?)(?=\n\n### 温习册出处|\n\n---|$)/);
    const explanationEn = explanationEnMatch ? explanationEnMatch[1].trim() : '';
    
    const referenceMatch = block.match(/### 温习册出处\n\n([\s\S]*?)(?=\n\n---|$)/);
    const reference = referenceMatch ? referenceMatch[1].trim() : undefined;
    
    if (questionCn) {
      questions.push({ id, questionCn, questionEn, answer, explanationCn, explanationEn, reference });
    }
  }
  
  return questions;
}

export default function QuizClient({ chapterId }: { chapterId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [showChinese, setShowChinese] = useState(true);

  const chapterInfo = [...chapters, ...mockExams].find(c => c.id === chapterId);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch(`/data/${chapterId}.md`);
        const content = await res.text();
        const parsed = parseMarkdown(content);
        setQuestions(parsed);
      } catch (e) {
        console.error('Failed to load questions:', e);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [chapterId]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (showAnswer) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowAnswer(true);
    if (selectedAnswer === currentQuestion.answer) {
      setScore(s => ({ ...s, correct: s.correct + 1 }));
    }
    setScore(s => ({ ...s, total: s.total + 1 }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">没有找到题目</div>
      </div>
    );
  }

  const questionText = showChinese ? currentQuestion.questionCn : currentQuestion.questionEn;
  const lines = questionText.split('\n');
  const questionTitle = lines[0];
  const optionsText = lines.slice(1).join('\n');
  
  const optionMatches = optionsText.match(/([ABCD])[.．。]\s*([^\n]*)/g) || [];
  const options = optionMatches.map(opt => {
    const match = opt.match(/([ABCD])[.．。]\s*(.*)/);
    return match ? { letter: match[1], text: match[2] } : null;
  }).filter(Boolean) as { letter: string; text: string }[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/practice/" className="text-blue-600 hover:text-blue-800 text-sm">← 返回选择</Link>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-xl font-bold text-gray-900">{chapterInfo?.name || chapterId}</h1>
            <div className="text-sm text-gray-600">
              正确率: {score.total > 0 ? Math.round(score.correct / score.total * 100) : 0}% ({score.correct}/{score.total})
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>第 {currentIndex + 1} / {questions.length} 题</span>
            <button onClick={() => setShowChinese(!showChinese)} className="text-blue-600 hover:text-blue-800">
              {showChinese ? '切换英文' : '切换中文'}
            </button>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-lg text-gray-900 mb-6 leading-relaxed whitespace-pre-wrap">{questionTitle}</div>

          <div className="space-y-3">
            {options.map((opt) => {
              const isSelected = selectedAnswer === opt.letter;
              const isCorrect = opt.letter === currentQuestion.answer;
              let bgColor = 'bg-gray-50 hover:bg-gray-100';
              let borderColor = 'border-gray-200';
              
              if (showAnswer) {
                if (isCorrect) { bgColor = 'bg-green-50'; borderColor = 'border-green-500'; }
                else if (isSelected && !isCorrect) { bgColor = 'bg-red-50'; borderColor = 'border-red-500'; }
              } else if (isSelected) { bgColor = 'bg-blue-50'; borderColor = 'border-blue-500'; }

              return (
                <button key={opt.letter} onClick={() => handleSelect(opt.letter)} disabled={showAnswer}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${bgColor} ${borderColor}`}>
                  <span className="font-bold mr-2">{opt.letter}.</span>
                  {opt.text}
                  {showAnswer && isCorrect && <span className="ml-2 text-green-600">✓</span>}
                  {showAnswer && isSelected && !isCorrect && <span className="ml-2 text-red-600">✗</span>}
                </button>
              );
            })}
          </div>

          {!showAnswer ? (
            <button onClick={handleSubmit} disabled={!selectedAnswer}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
              确认答案
            </button>
          ) : (
            <div className="mt-6">
              <div className={`p-4 rounded-xl ${selectedAnswer === currentQuestion.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="font-bold mb-2">
                  {selectedAnswer === currentQuestion.answer ? '✅ 回答正确！' : `❌ 回答错误，正确答案是 ${currentQuestion.answer}`}
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-gray-900 mb-2">📖 答案解析</div>
                <div className="text-gray-700 text-sm whitespace-pre-wrap">
                  {showChinese ? currentQuestion.explanationCn : currentQuestion.explanationEn}
                </div>
              </div>

              {currentQuestion.reference && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="font-bold text-yellow-800 mb-2">📚 温习册出处</div>
                  <div className="text-yellow-700 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {currentQuestion.reference}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={handlePrev} disabled={currentIndex === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50">
              ← 上一题
            </button>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700">
              下一题 →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
