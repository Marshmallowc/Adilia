import React from "react";
import Navbar from "../../../components/Navbar";

// Static definitions for pre-rendered SEO articles (fully optimized for Search Engines)
const ARTICLES: Record<string, {
  title: string;
  category: string;
  date: string;
  content: string;
  seoDescription: string;
}> = {
  "graduation-project-traps-2026": {
    title: "2026届毕业设计核心避坑指南：如何用工业级标准做完你的终极系统？",
    category: "毕设指南 / Guide",
    date: "2026-05-10",
    seoDescription: "深挖2026年毕业设计避坑技巧。解决前后端死锁、接口鉴权异常与云服务器高昂费用问题，采用 Serverless 架构实现零运行成本毕设交付方案。",
    content: `
### 一、 选题与架构失衡：90% 学生的毕设恶梦

许多同学在确定毕设选题时，脑子一热就选了“基于深度学习的多模态大模型高并发微服务电商系统”。结果在答辩前夕，连最基础的主从数据库同步、服务注册中心发现和前端鉴权都还没跑通。

**顶级全栈专家的架构建议：**
- **不要为了高并发而堆砌中间件**：对于中小型毕业设计，核心在于**业务逻辑闭环**与**规范的交付素养**。
- **拥抱轻量化微内核**：前端采用 React + TailwindCSS 组合，后端采用 FastAPI (Python) 或 Nest.js (TypeScript)。如果非要用 Java，建议一套 Spring Boot 跑到底，摒弃臃肿的 Spring Cloud。

---

### 二、 拒绝高额云服务器账单：拥抱零成本 Serverless 交付

很多同学为了答辩，特意租用了几百块一个月的 ECS 云服务器，结果答辩完忘记关掉自动续费，惨遭扣费。

其实，利用现代云基建，我们可以做到**绝对零成本部署**：
1. **静态前端**：直接托管于 Vercel 或 Cloudflare Pages，享受全球 CDN 加速，永久免费且性能极致。
2. **轻量级后端**：将接口部署在 Vercel Serverless Function 或 Cloudflare Workers 上，无流量时不扣费，完全免费。
3. ** Serverless 数据库**：放弃昂贵的云 RDS，使用 Neon Serverless Postgres 或 Supabase，免费额度完全够用。

---

### 三、 极致交付：答辩展示与评委信任的法宝

毕业答辩的本质是一场“产品交付展示”。评委老师最看重的是**系统可演示性**、**技术文档规范**与**代码设计的健壮程度**。
*   **制作 30 秒无卡顿的核心视频演示**：预防现场弱网环境演示翻车。
*   **撰写工业级的 README 部署手册**：让任何老师双击 Docker Compose 就能一键部署成功。
`
  },
  "mini-program-pricing-and-architecture": {
    title: "企业微信小程序外包定制多少钱？资深全栈工程师为你拆解标准报价底细",
    category: "外包定制 / Commercial",
    date: "2026-04-18",
    seoDescription: "全方位解析微信小程序定制开发报价公式。揭秘外包公司套路与工时计算逻辑，详解从主包压缩、数据脱敏到蓝牙硬件集成所耗费的真实技术工时。",
    content: `
### 一、 为什么微信小程序的报价从 ￥2,000 到 ￥50,000 差距如此之大？

经常有客户问：“为什么我找大学生做小程序只要 2000 元，而找专业工程师或者大公司报价要 3 万？”。
这其中的底细，在于**“交付确定性”**和**“系统工程质量”**：

- **廉价套壳的隐形大坑**：2000 元的小程序往往采用盗版模板、老旧的 uni-app v2 代码库，甚至没有高并发数据库支撑，日活一旦超过 100 人，接口直接崩掉，毫无售后可言。
- **工业级交付的标准规格**：包含完整的原型设计与交互调优、分包加载加载提速、图片按需惰性加载（防白屏）、微信最新隐私保护指引适配、蓝牙/高德地图高频无感定位调用等，并附带完整的数据库设计方案与一键运维脚本。

---

### 二、 软件外包中标准的“工时报价法”

真正的顶级程序员在接单时，会根据功能模块的难度和预估工时计算：
*   **单模块工时成本** = 模块研发天数 × 工程师日薪 (大厂级别一般在 1500-2500 元/天)。
*   **报价公式** = (前端工时 + 后端工时) × 日薪 + 15% 的高可用质量保障上浮。
`
  },
  "llm-rag-architecture-landing-2026": {
    title: "手把手教你落地基于 LangChain 的企业级垂直大模型知识库（RAG）",
    category: "AI大模型 / RAG",
    date: "2026-03-24",
    seoDescription: "深度讲解 RAG (检索增强生成) 系统在高校和企业文档管理中的落地。解析 PDF 毫秒级文本切片、向量数据库 Milvus 索引召回及 LLM 微调避坑经验。",
    content: `
### 一、 为什么 RAG 是目前企业级大模型的最优解？

直接对通用大模型进行全参数微调 (Fine-tuning) 成本极高，且无法彻底解决大模型“胡说八道”（幻觉）的致命问题。
而 **RAG (Retrieval-Augmented Generation，检索增强生成)** 架构，通过**“本地精准检索 + 大模型逻辑归纳”**的方式，将大模型改造成一个永远不会背错书的“金牌客服”。

---

### 二、 垂直大模型知识库的技术全景图

1.  **文档提取与多格式兼容**：利用 Python 库对 PDF、Word、HTML 进行去噪切片，针对表格和层级标题采用滑动窗口拆分。
2.  **向量嵌入与索引构造**：将文本切片传入 OpenAI Embedding 或 HuggingFace 模型，转化为 1536 维向量，写入高弹性的 Milvus / Pinecone 向量数据库。
3.  **相似度匹配与混合检索**：通过 BM25 稀疏向量检索与 Dense 稠密向量检索进行多路召回与重排 (Reranking)，保证最相关的规则排在最前列。
4.  **Prompt 工程汇聚**：将召回文档作为“参考信源”，注入 Prompt，限制大模型只能根据信源作答，彻底规避胡说八道。
`
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "文章未找到 - Adilia的技术博客" };
  return {
    title: `${article.title} - Adilia 的技术博客`,
    description: article.seoDescription
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col items-center justify-center p-4">
        <h2 className="text-base font-bold text-slate-800">抱歉，您访问的技术文章未找到。</h2>
        <a href="/blog" className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-semibold text-white cursor-pointer">
          返回博客大厅
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col relative overflow-hidden">
      
      {/* Floating Aurora Bubbles */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none animate-float-1 z-0" />
      <div className="absolute top-[45%] left-[-10%] w-[45vw] h-[45vw] bg-teal-100/20 rounded-full blur-[100px] pointer-events-none animate-float-2 z-0" />

      <Navbar />

      <main className="flex-grow pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-12 relative z-10 animate-fade-in-up">
        {/* Article Header */}
        <div className="space-y-4 text-center md:text-left border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 font-semibold justify-center md:justify-start">
            <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded font-bold font-sans">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Formatted Content */}
        <div className="text-xs sm:text-sm leading-relaxed space-y-6 font-medium text-slate-600">
          {article.content.split("\n\n").map((para, idx) => {
            const trimmed = para.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("###")) {
              return (
                <h3 key={idx} className="text-base font-extrabold text-slate-900 mt-8 mb-4 border-l-2 border-indigo-600 pl-3">
                  {trimmed.replace("###", "").trim()}
                </h3>
              );
            }

            if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2 text-slate-500 my-4 font-semibold">
                  {trimmed.split("\n").map((li, liIdx) => (
                    <li key={liIdx}>{li.replace(/^[*-]\s*/, "").trim()}</li>
                  ))}
                </ul>
              );
            }

            if (trimmed.match(/^\d+\./)) {
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-2 text-slate-500 my-4 font-semibold">
                  {trimmed.split("\n").map((li, liIdx) => (
                    <li key={liIdx}>{li.replace(/^\d+\.\s*/, "").trim()}</li>
                  ))}
                </ol>
              );
            }

            return <p key={idx}>{trimmed}</p>;
          })}
        </div>

        {/* Lead Capture Callout Funnel widget */}
        <div className="glass-panel bg-white/80 border-slate-200/80 p-6 md:p-8 space-y-4 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/5 blur-xl rounded-full" />
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            需要定制高品质软件或解答毕业设计疑惑？
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            你好，我是 Adilia。不仅分享硬核技术教程，我还专门承接高帧率微信小程序开发、复杂企业级 SaaS看板 与大模型垂直知识库（RAG）定制。
            点击下方按钮前往我的官网主页提交初步创意意向，我将在 24 小时内为您理清系统架构方案。
          </p>
          <a
            href="/#inquire"
            className="inline-block py-2.5 px-6 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-100 transition-all cursor-pointer"
          >
            立即前往主页免费预约询价
          </a>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/40 py-8 text-center text-xs text-slate-400 relative z-10 font-medium">
        <p>&copy; 2026 Adilia. All rights reserved. | 豫ICP备2025XXXXXX号-1</p>
      </footer>
    </div>
  );
}
