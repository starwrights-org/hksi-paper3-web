import { chapters, mockExams } from './questions';

export function generateChapterParams() {
  const chapterParams = chapters.map(ch => ({ chapterId: ch.id }));
  const mockParams = mockExams.map(exam => ({ chapterId: exam.id }));
  return [...chapterParams, ...mockParams];
}
