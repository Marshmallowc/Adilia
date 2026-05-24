export interface DesensitizedDoc {
  title: string;
  readmeContent: string;        // 脱敏 README.md 部署指南
  architectureDescription: string; // 系统架构说明
  databaseSchema: string;       // 脱敏核心数据库表设计
  screenshots: string[];        // 示例截图占位或图片路径
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'core-self' | 'commercial' | 'open-source';
  description: string;
  techTags: string[];
  liveUrl?: string;          // 核心项目在线体验
  githubUrl?: string;        // 源码或开源项目链接
  videoUrl?: string;         // 演示视频 (MP4/GIF 路径)
  completionDate: string;    // 完成时间
  role: string;              // 职责角色
  hasDetails?: boolean;       // 是否有脱敏交付详情
  desensitizedDoc?: DesensitizedDoc; // 脱敏交付文档
}

export const projectsData: ProjectItem[] = [
  {
    id: "couples-bookkeeping",
    title: "情侣双向财富管理系统 (book.cust.net.cn)",
    category: "core-self",
    description: "这是我从零开发的情侣实时对账系统。通过安全沙箱与实时同步架构，完美实现了情侣双向收支合并、资产水位警戒与趋势图表协同分析。",
    techTags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    liveUrl: "https://book.cust.net.cn",
    githubUrl: "https://github.com/cust-net-cn/couples-bookkeeping",
    completionDate: "2025.10",
    role: "独立架构与开发"
  },
  {
    id: "campus-rag-qa",
    title: "校园垂直 RAG 智能问答系统 (qa.cust.net.cn)",
    category: "core-self",
    description: "我主导的校园级垂直 RAG 知识库问答。针对高校 PDF 规章制度进行了毫秒级向量分块切片，实现本地高匹配检索召回，解决信息零散痛点。",
    techTags: ["React", "FastAPI", "Python", "LangChain", "VectorDB"],
    liveUrl: "https://qa.cust.net.cn",
    githubUrl: "https://github.com/cust-net-cn/campus-rag-qa",
    completionDate: "2026.02",
    role: "AI 架构与调优"
  },
  {
    id: "frontend-screen-recorder",
    title: "高帧率浏览器纯前端录屏工具 (rec.cust.net.cn)",
    category: "core-self",
    description: "我编写的纯前端 WebRTC 免安装录像应用。无需任何服务器资源，数据 100% 本地安全运行，支持画中画摄像头合成与多格式高保真无损导出。",
    techTags: ["Vanilla JS", "HTML5 WebRTC", "MediaRecorder", "Canvas API"],
    liveUrl: "https://rec.cust.net.cn",
    githubUrl: "https://github.com/cust-net-cn/frontend-screen-recorder",
    completionDate: "2026.04",
    role: "纯前端独立开发"
  },
  {
    id: "zenith-saas-dashboard",
    title: "Zenith 跨境电商极速 SaaS 看板",
    category: "commercial",
    description: "我承接交付的跨境电商统计大屏。通过 Web Worker 多线程离屏计算处理百万级订单流水，首屏加载（LCP）提速至 0.8s 极速直出。",
    techTags: ["React 19", "Next.js", "TypeScript", "Highcharts", "Web Workers"],
    completionDate: "2025.07",
    role: "前端专家 & 性能调优",
    hasDetails: true,
    desensitizedDoc: {
      title: "Zenith 跨境电商数据看板 - 交付说明与架构设计",
      readmeContent: `# Zenith SaaS Dashboard 部署与交付规范

## 1. 运行环境要求
- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Docker (可选，支持容器化一键部署)

## 2. 快速启动命令
\`\`\`bash
# 1. 安装项目依赖
pnpm install

# 2. 拷贝本地生产环境变量
cp .env.example .env.production

# 3. 本地编译并运行
pnpm dev

# 4. 构建生产包
pnpm build
pnpm start
\`\`\`

## 3. 我的性能优化核心策略
- 针对 100k+ 高频流水渲染，我设计了基于 Web Workers 的离屏数据计算器，避免阻塞 UI 线程。
- 引入 React Server Components，将静态渲染骨架下沉至服务端，让首屏加载时间 (LCP) 直降 60%。`,
      architectureDescription: "我设计了以 Next.js 为核心的前后端同构体系。将静态基础版块进行 SSG 预渲染直出，针对频繁变动的数据接口通过 Redis 缓存层做秒级高可用隔离，数据通道通过 Serverless API 路由安全分流，提供工业级的平滑加载响应。",
      databaseSchema: `CREATE TABLE IF NOT EXISTS public.zenith_seller_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id VARCHAR(64) NOT NULL,
    recorded_date DATE NOT NULL,
    total_sales NUMERIC(15, 2) DEFAULT 0.00,
    order_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_seller_date UNIQUE (seller_id, recorded_date)
);

CREATE INDEX idx_seller_date ON public.zenith_seller_statistics(seller_id, recorded_date DESC);`,
      screenshots: [
        "/assets/showcase/zenith-dashboard-1.png",
        "/assets/showcase/zenith-dashboard-2.png"
      ]
    }
  },
  {
    id: "nexus-delivery-app",
    title: "Nexus 同城即时配送小程序",
    category: "commercial",
    description: "我交付的同城配送小程序。使用 uni-app 完美打通微信定位、蓝牙打印驱动与免密支付，包体积直降 60%，在弱网环境下体验流畅。",
    techTags: ["uni-app", "Vue 3", "WeChat SDK", "Spring Boot", "Redis"],
    completionDate: "2025.12",
    role: "全栈架构开发",
    hasDetails: true,
    desensitizedDoc: {
      title: "Nexus 配送系统 - 交付规格与数据库规范",
      readmeContent: `# Nexus Delivery Mini-Program 交付配置说明

## 1. 技术栈体系
- 前端：uni-app (Vue 3 Composition API) + Pinia
- 后端：Spring Boot 3 + MyBatis-Plus + Redis + RocketMQ
- 部署：Nginx 反向代理 + Docker Compose

## 2. 性能调优硬核指标
- **主包体积控制**：控制在 920KB（分包路由懒加载，剔除无用大体积图包）
- **分包设计**：根据骑手端、商户端划分 3 个独立分包，按需延迟预加载
- **冷启动耗时**：从 2.4s 缩短至 1.1s（优化静态资源 CDN 缓存）`,
      architectureDescription: "我设计了基于 GeoHash 空间算法的骑手地理围栏检索机制，缓存常用菜单在 Redis 内存集群。后端高并发订单流通过消息队列进行削峰平谷，从而在骑手瞬时爆单、疯狂刷新接单时，保证核心下单与配送接口响应稳定在 50ms 以内。",
      databaseSchema: `CREATE TABLE IF NOT EXISTS public.nexus_orders (
    order_no VARCHAR(64) PRIMARY KEY,
    merchant_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    delivery_status INT DEFAULT 0, -- 0:已下单 1:骑手接单 2:配送中 3:已送达
    pickup_latitude NUMERIC(10, 6) NOT NULL,
    pickup_longitude NUMERIC(10, 6) NOT NULL,
    delivery_latitude NUMERIC(10, 6) NOT NULL,
    delivery_longitude NUMERIC(10, 6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_merchant ON public.nexus_orders(merchant_id);
CREATE INDEX idx_order_delivery ON public.nexus_orders(delivery_status);`,
      screenshots: [
        "/assets/showcase/nexus-app-1.png",
        "/assets/showcase/nexus-app-2.png"
      ]
    }
  },
  {
    id: "fastapi-saas-template",
    title: "FastAPI + React 19 开发模板 (开源贡献)",
    category: "open-source",
    description: "我参与贡献的企业级 SaaS 极速脚手架。后端整合 JWT 鉴权与 RBAC，前端适配 React 19 极简渲染，支持一键容器化自动运行部署。",
    techTags: ["FastAPI", "React", "SQLModel", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/cust-net-cn/fastapi-react-saas-template",
    completionDate: "2026.01",
    role: "主要贡献者"
  },
  {
    id: "mini-program-auth-suite",
    title: "微信一键登录与安全组件 (开源独立作者)",
    category: "open-source",
    description: "我独立开发的微信一键登录通用组件。无缝适配小程序最新隐私授权要求，集成 JWT 签名与高弹性的防抖接口，已广泛应用多款商业项目。",
    techTags: ["uni-app", "WeChat SDK", "Node.js", "Redis", "TypeScript"],
    githubUrl: "https://github.com/cust-net-cn/weixin-auth-suite",
    completionDate: "2025.09",
    role: "独立作者"
  }
];
