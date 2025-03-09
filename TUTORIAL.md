# Astro 网站开发教程

## 项目概述
这是一个使用 Astro 构建的多功能内容网站，包含博客、数字阅读、教育赋能、创意素材和软件工坊等多个板块。本教程将帮助你理解项目结构和核心功能的实现。

## 项目结构

```
/
├── src/                  # 源代码目录
│   ├── components/       # 可复用的组件
│   ├── content/          # 内容集合
│   ├── layouts/          # 页面布局
│   ├── pages/           # 页面路由
│   └── styles/          # 全局样式
├── public/              # 静态资源
└── astro.config.mjs     # Astro 配置文件
```

## 核心概念

### 1. Astro 页面
Astro 使用文件系统路由，`.astro` 文件会自动生成对应的页面路由。例如：
- `/src/pages/index.astro` → `/`
- `/src/pages/about.astro` → `/about`
- `/src/pages/blog/[...slug].astro` → `/blog/any-slug`

### 2. 内容集合
项目使用 Astro 的内容集合功能管理不同类型的内容：
- `blog` - 博客文章
- `digitalReading` - 数字阅读资源
- `education` - 教育内容
- `creative` - 创意素材
- `software` - 软件工具

### 3. 组件系统
常用组件：
- `BaseHead.astro` - 页面头部元信息
- `Header.astro` - 网站导航栏
- `Footer.astro` - 页面底部
- `FormattedDate.astro` - 日期格式化

### 4. 搜索功能
搜索功能实现了跨内容集合的全文搜索：
- 支持标题、描述、内容和标签的搜索
- 实时过滤和结果展示
- 分类标识和美观的卡片式布局

### 5. 标签系统
标签系统支持：
- 文章分类和筛选
- 标签云展示
- 按类别组织标签

## 开发指南

### 1. 创建新页面
```astro
---
// src/pages/example.astro
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<!doctype html>
<html lang="zh-cn">
  <head>
    <BaseHead title="页面标题" description="页面描述" />
  </head>
  <body>
    <Header />
    <main>
      <!-- 页面内容 -->
    </main>
    <Footer />
  </body>
</html>
```

### 2. 添加新内容
1. 在对应的内容集合目录创建 Markdown 文件
2. 添加必要的 frontmatter 元数据
3. 编写内容主体

### 3. 自定义样式
项目使用模块化的 CSS 管理样式：
- 全局样式在 `/src/styles/global.css`
- 分类页面样式在 `/src/styles/category.css`
- 组件可以使用 scoped 样式

## 下一步学习
1. 深入了解 Astro 的 [官方文档](https://docs.astro.build)
2. 学习项目中使用的 [内容集合 API](https://docs.astro.build/en/guides/content-collections/)
3. 探索更多 [Astro 集成](https://docs.astro.build/en/guides/integrations-guide/)

通过逐步学习和实践，你将能够掌握使用 Astro 构建现代化网站的技能。