import { chapters, mockExams } from '@/lib/questions';
import QuizClient from './QuizClient';

// 为静态导出生成所有可能的路径
export function generateStaticParams() {
  const chapterParams = chapters.map(ch => ({ chapterId: ch.id }));
  const mockParams = mockExams.map(exam => ({ chapterId: exam.id }));
  return [...chapterParams, ...mockParams];
}

export default async function QuizPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params;
  return <QuizClient chapterId={chapterId} />;
}
