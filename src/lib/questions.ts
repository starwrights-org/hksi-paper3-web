// 题目数据类型
export interface Question {
  id: string;
  chapter: string;
  questionCn: string;
  questionEn: string;
  options: {
    A: { cn: string; en: string };
    B: { cn: string; en: string };
    C: { cn: string; en: string };
    D: { cn: string; en: string };
  };
  answer: 'A' | 'B' | 'C' | 'D';
  explanationCn: string;
  explanationEn: string;
  reference?: string;
}

// 解析 Markdown 文件中的题目
export function parseQuestions(markdown: string, source: string): Question[] {
  const questions: Question[] = [];
  
  // 分割每道题
  const questionBlocks = markdown.split(/---\n\n## 第\d+题/).slice(1);
  
  for (let i = 0; i < questionBlocks.length; i++) {
    const block = questionBlocks[i];
    
    try {
      // 提取题目ID
      const idMatch = block.match(/\(ID:\s*(\d+)\)/);
      const id = idMatch ? idMatch[1] : `${source}-${i + 1}`;
      
      // 提取中文题目
      const cnMatch = block.match(/### 中文题目\n\n([\s\S]*?)(?=\n\n### English|\n\n\*\*正确答案)/);
      const questionCn = cnMatch ? cnMatch[1].trim() : '';
      
      // 提取英文题目
      const enMatch = block.match(/### English\n\n([\s\S]*?)(?=\n\n\*\*正确答案)/);
      const questionEn = enMatch ? enMatch[1].trim() : '';
      
      // 提取答案
      const answerMatch = block.match(/\*\*正确答案：([ABCD])\*\*/);
      const answer = answerMatch ? answerMatch[1] as 'A' | 'B' | 'C' | 'D' : 'A';
      
      // 提取中文解析
      const explanationCnMatch = block.match(/### 答案解析\n\n([\s\S]*?)(?=\n\n### Explanation|\n\n### 温习册出处|$)/);
      const explanationCn = explanationCnMatch ? explanationCnMatch[1].trim() : '';
      
      // 提取英文解析
      const explanationEnMatch = block.match(/### Explanation\n\n([\s\S]*?)(?=\n\n### 温习册出处|---\n|$)/);
      const explanationEn = explanationEnMatch ? explanationEnMatch[1].trim() : '';
      
      // 提取温习册出处
      const referenceMatch = block.match(/### 温习册出处\n\n([\s\S]*?)(?=\n\n---|$)/);
      const reference = referenceMatch ? referenceMatch[1].trim() : undefined;
      
      // 解析选项
      const optionPattern = /([ABCD])[.．。]\s*([\s\S]*?)(?=[ABCD][.．。]|\n\n|$)/g;
      const options: Question['options'] = {
        A: { cn: '', en: '' },
        B: { cn: '', en: '' },
        C: { cn: '', en: '' },
        D: { cn: '', en: '' },
      };
      
      // 从中文题目中提取选项
      const cnText = questionCn;
      let match;
      while ((match = optionPattern.exec(cnText)) !== null) {
        const letter = match[1] as 'A' | 'B' | 'C' | 'D';
        options[letter].cn = match[2].trim();
      }
      
      // 从英文题目中提取选项
      optionPattern.lastIndex = 0;
      const enText = questionEn;
      while ((match = optionPattern.exec(enText)) !== null) {
        const letter = match[1] as 'A' | 'B' | 'C' | 'D';
        options[letter].en = match[2].trim();
      }
      
      questions.push({
        id,
        chapter: source,
        questionCn: questionCn.split('\n')[0], // 只取第一行作为题干
        questionEn: questionEn.split('\n')[0],
        options,
        answer,
        explanationCn,
        explanationEn,
        reference,
      });
    } catch (e) {
      console.error(`Error parsing question ${i + 1} in ${source}:`, e);
    }
  }
  
  return questions;
}

// 章节信息
export const chapters = [
  { id: 'chapter_1', name: '第1章', title: '监管架构', count: 52 },
  { id: 'chapter_2', name: '第2章', title: '衍生工具基础', count: 112 },
  { id: 'chapter_3', name: '第3章', title: '期货合约', count: 38 },
  { id: 'chapter_4', name: '第4章', title: '期权', count: 290 },
  { id: 'chapter_5', name: '第5章', title: '结构性产品', count: 54 },
  { id: 'chapter_6', name: '第6章', title: '风险管理', count: 102 },
  { id: 'chapter_7', name: '第7章', title: '交易及结算', count: 82 },
  { id: 'chapter_8', name: '第8章', title: '操守准则', count: 18 },
];

export const mockExams = [
  { id: 'mock_exam_Z1', name: '模拟卷 Z1', count: 40 },
  { id: 'mock_exam_Z2', name: '模拟卷 Z2', count: 40 },
  { id: 'mock_exam_Z3', name: '模拟卷 Z3', count: 40 },
  { id: 'mock_exam_Z4', name: '模拟卷 Z4', count: 40 },
  { id: 'mock_exam_5', name: '模拟卷 5', count: 40 },
  { id: 'mock_exam_6', name: '模拟卷 6', count: 40 },
  { id: 'mock_exam_7', name: '模拟卷 7', count: 40 },
  { id: 'mock_exam_8', name: '模拟卷 8', count: 40 },
  { id: 'mock_exam_9', name: '模拟卷 9', count: 40 },
];

export const pdfs = [
  { id: 'chapter_1', name: '第1章 温习手册', file: 'chapter_1_温习手册.pdf' },
  { id: 'chapter_2', name: '第2章 温习手册', file: 'chapter_2_温习手册.pdf' },
  { id: 'chapter_3', name: '第3章 温习手册', file: 'chapter_3_温习手册.pdf' },
  { id: 'chapter_4', name: '第4章 温习手册', file: 'chapter_4_温习手册.pdf' },
  { id: 'chapter_5', name: '第5章 温习手册', file: 'chapter_5_温习手册.pdf' },
  { id: 'chapter_6', name: '第6章 温习手册', file: 'chapter_6_温习手册.pdf' },
  { id: 'chapter_7', name: '第7章 温习手册', file: 'chapter_7_温习手册.pdf' },
];
