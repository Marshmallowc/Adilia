import React from "react";
import Navbar from "../../components/Navbar";

interface BlogPostSummary {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
}

const DUMMY_POSTS: BlogPostSummary[] = [
  {
    slug: "graduation-project-traps-2026",
    title: "2026届毕业设计核心避坑指南：如何用工业级标准做完你的终极系统？",
    summary: "每年都有大批毕业生因为选题过大、数据库死锁、前后端接口阻断而导致答辩亮红灯。本文从技术选型、脱敏方案、部署上线等方面深度解析，带你规避毕设常见大坑。",
    date: "2026-05-10",
    category: "毕设指南 / Guide"
  },
  {
    slug: "mini-program-pricing-and-architecture",
    title: "企业微信小程序外包定制多少钱？资深全栈工程师为你拆解标准报价底细",
    summary: "从零起草小程序到上线，外包团队报价为何差距十倍？本文从主包控制、底层接口集成、持久化服务、安全沙箱等角度，公开软件行业的标准工时成本计算逻辑。",
    date: "2026-04-18",
    category: "外包定制 / Commercial"
  },
  {
    slug: "llm-rag-architecture-landing-2026",
    title: "手把手教你落地基于 LangChain 的企业级垂直大模型知识库（RAG）",
    summary: "大语言模型如何低成本检索本地企业秘密文档？本文从切片算法、向量库 Milvus 索引建立、召回精排算法等真实案例，详解千万级文档秒级召回的落地路径。",
    date: "2026-03-24",
    category: "AI大模型 / RAG"
  }
];

export const metadata = {
  title: "Adilia 的技术博客 - 毕设避坑指南、AI RAG 架构与商业化外包定制教程",
  description: "在这里分享关于 React, Next.js, FastAPI, uni-app 小程序开发、AI RAG 架构落地的硬核技术教程与商业经验，精准引流高价值客户需求。"
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col relative overflow-hidden">
      
      {/* Floating Aurora Bubbles */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none animate-float-1 z-0" />
      <div className="absolute top-[45%] left-[-10%] w-[45vw] h-[45vw] bg-teal-100/20 rounded-full blur-[100px] pointer-events-none animate-float-2 z-0" />

      <Navbar />

      <main className="flex-grow pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-12 relative z-10 animate-fade-in-up">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase font-mono bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            技术日志 / Blog Library
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">技术沉淀与商业避坑宝典</h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
            深入拆解真实的交付痛点，分享关于全栈系统设计、微信小程序优化、垂直大模型 RAG 架构的落地方案，白嫖搜索引擎长尾流量。
          </p>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          {DUMMY_POSTS.map((post) => (
            <article
              key={post.slug}
              className="glass-panel bg-white/80 p-6 hover:border-indigo-400/40 hover:bg-white transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 font-semibold">
                  <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-bold font-sans">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                
                <h2 className="text-lg font-extrabold text-slate-900 hover:text-indigo-600 transition-colors leading-snug">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href={`/blog/${post.slug}`}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all inline-block cursor-pointer"
                >
                  阅读全文 →
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/40 py-8 text-center text-xs text-slate-400 relative z-10 font-medium">
        <p>&copy; 2026 Adilia. All rights reserved. | 豫ICP备2025XXXXXX号-1</p>
      </footer>
    </div>
  );
}
