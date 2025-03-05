---
title: DecapCMS使用GitHub身份验证教程
description: 在使用 Decap CMS 时编辑您的静态网站时，您可能会遇到需要配置 GitHub OAuth 代理的情况。这是因为 Decap
  CMS 需要通过 GitHub 身份验证来管理内容。以下是一篇详细的教程，记录了如何成功配置 Decap CMS 的 GitHub OAuth 代理。
pubDate: 2025-03-05
heroImage: /uploads/精要主义封面.png
category: 教程
tags:
  - CMS
downloadLink: https://www.365121.xyz/
---
### Decap CMS GitHub OAuth 代理配置教程

#### 前言

在使用 Decap CMS 时编辑您的静态网站时，您可能会遇到需要配置 GitHub OAuth 代理的情况。这是因为 Decap CMS 需要通过 GitHub 身份验证来管理内容。以下是一篇详细的教程，记录了如何成功配置 Decap CMS 的 GitHub OAuth 代理。

#### 1. 创建 GitHub OAuth 应用程序

1. **登录 GitHub**：

   ```
   -   访问 GitHub 的右上角，单击个人资料照片，然后单击 `Settings` “设置”。
   ```

   ![点个人头像中的 Settings](/imgs/2025-03-05/ZzFXfgYSICC9oDou.png)

   ```
   -   在左侧边栏中，最下方，单击 `Developer settings` “开发人员设置”。
   ```

   ![开发人员设置](/imgs/2025-03-05/Qr3yOosbM4KmdnDz.png)

   ```
   -   在左侧边栏中，单击“OAuth Apps”。
   ```

   ![OAuth 应用](/imgs/2025-03-05/w44D4KplbYb9MPYU.png)

   ```
   -   单击“新建 OAuth 应用”。
   ```

   ![新建应用](/imgs/2025-03-05/q3uEFi7Hp9z1rb8N.png)

   ```
       
   ```
2. **填写应用程序信息**：
   ![填写应用信息](/imgs/2025-03-05/kNwvXALbl9OyMlZY.png)

   * **Application name（应用程序名称）**：输入您的应用名称，例如“Decap CMS for [www.365121.xyz”。](http://www.365121.xn--xyz-9o0a./)
   * **Homepage URL（主页 URL）**：输入您的网站 URL，如我的网址 `https://www.365121.xyz`。
   * **Authorization callback URL（授权回调 URL）**：输入您在`Cloudflare Worker` 中部署的工具网址，再加上`/callback`，我这里是 `https://decap.365121.xyz/callback`。在这一步的时候你还没有相应的网址，可以随意填一个，后面部署完了 `Cloudflare Worker` 再回来修改即可。
   * （可选）在“Application description（应用程序说明）”中，输入用户将看到的应用程序说明。
   * 点击“注册应用程序”。

> 这个 **授权回调 URL** 我错了很多次，一直没搞明白该填什么，问的AI 总是让我填 Decap CMS 的访问网址再加了几个文件夹`https://www.365121.xyz/admin/auth/callback` ，我也不知道为什么要这么填，可能是AI在网上搜索到的内容是这样操作的吧。

3. **获取客户端 ID 和客户端密钥**：

   * 注册成功后，您会获得一个 `Client ID`  **客户端 ID** 和 `Client secrets`  **客户端密钥**。请记录下来保存好，这些信息在后续配置中需要使用。

#### 2. 配置 Decap CMS 的 `config.yml` 文件

在您的静态网站的 Decap CMS 项目中，找到 `admin/config.yml` 文件，并确保其内容包含下面信息：

```yaml
site_url: https://www.365121.xyz
search: false
backend:
  name: github
  repo: "你的github用户名/你的静态网站项目仓库名"
  branch: main
  base_url: https://decap.365121.xyz/
  auth_endpoint: /auth
```

##### 2.1  `Decap CMS` 设置文件 `config.yml` 的详细解释

```yaml
# Decap CMS 配置文件
# https://www.decap.org/docs/config/

# 站点的基本设置
site_url: https://www.365121.xyz  # 站点的根 URL
search: false  # 是否启用搜索功能

# 后端集成设置
backend:
  name: github  # 后端类型，通常为 github
  repo: "github用户名/静态网站项目仓库名"  # GitHub 仓库路径，格式为 用户名/仓库名
  branch: main  # 默认分支，通常为 main 或 master
  base_url: https://decap.365121.xyz/  # 管理界面的身份验证 URL
  auth_endpoint: /auth  # 身份验证的端点路径

# 媒体文件夹设置
media_folder: "public/uploads"  # 媒体文件的存储目录
public_folder: "/uploads"  # 媒体文件的公开访问路径

# 语言环境设置
locale: 'zh_Hans'  # 站点的语言环境

# 内容集合设置
collections:
  - name: "resources"  # 集合的名称，用于标识集合
    label: "资源"  # 集合的显示名称
    folder: "src/content/blog"  # 集合内容的存储目录
    create: true  # 是否允许在管理界面中创建新内容
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"  # 生成内容的 URL 路径格式
    fields:  # 定义内容的字段
      - { label: "标题", name: "title", widget: "string" }  # 标题字段，使用字符串小部件
      - { label: "描述", name: "description", widget: "text" }  # 描述字段，使用文本小部件
      - { label: "发布日期", name: "pubDate", widget: "datetime", format: "YYYY-MM-DD" }  # 发布日期字段，使用日期时间小部件
      - { label: "封面图", name: "heroImage", widget: "image" }  # 封面图字段，使用图像小部件
      - { label: "资源类别", name: "category", widget: "select", options: ["软件", "电子书", "教程", "工具", "素材", "其他"] }  # 资源类别字段，使用选择小部件
      - { label: "标签", name: "tags", widget: "list" }  # 标签字段，使用列表小部件
      - { label: "下载链接", name: "downloadLink", widget: "string" }  # 下载链接字段，使用字符串小部件
      - { label: "资源介绍", name: "body", widget: "markdown" }  # 资源介绍字段，使用 Markdown 小部件

# 其他可选设置
# display_url: https://www.365121.xyz/admin  # 管理界面的显示 URL
# publish_mode: editorial_workflow  # 内容发布模式，支持 simple 和 editorial_workflow
# append_base_path: true  # 是否在管理界面的 URL 中追加基础路径
# show_preview_links: true  # 是否在管理界面中显示预览链接
```

#### 3. 配置 GitHub OAuth 代理

1. 在你的电脑端本地**克隆代理工具的仓库**：

   * 打开电脑的命令行应用，`Windows` 用户如 `命令提示符CMD` 或 `PowerShell`，克隆 `decap-proxy` 仓库：      

![命令提示符](/imgs/2025-03-05/KihoPNAHRXlOMVkd.png)

![PowerShell](/imgs/2025-03-05/pA4Hy1VNEnH0JJdY.png)

```bash
        git clone https://github.com/sterlingwes/decap-proxy.git
        cd decap-proxy
```

2. 在克隆的仓库文件夹内**配置 `wrangler.toml` 文件**：

   * 复制 `wrangler.toml.sample` 文件并重命名为 `wrangler.toml`：

     ```bash
     cp wrangler.toml.sample wrangler.toml
     ```
   * 编辑 `wrangler.toml` 文件，确保以下配置项正确：

```toml
        name = "decap-proxy"
        main = "src/index.ts"
        compatibility_date = "2024-04-19"
        compatibility_flags = ["nodejs_compat"]
        
        workers_dev = false
        route = { pattern = "decap.365121.xyz", zone_name = "www.365121.xyz", custom_domain = true }
```

说明：

* `pattern = "decap.365121.xyz"` 中的域名请填写你要部署代理验证工具的域名，要使用在 `Cloudflare` 中没有设置过的子域名。
* `zone_name = "www.365121.xyz"` 中的域名请填写你的静态网站部署的域名。

  ```
    
  ```

3. 命令行内**登录 Cloudflare**：

* 创建 `Cloudflare` 帐户 API 令牌
  这里登录时会打开浏览器并登录 `Cloudflare` 网站，注意你的账号需要创建了帐户 API 令牌，如果没有创建的话会登录不成功。所以我们先来创建这个令牌。

![输入图片说明](/imgs/2025-03-05/Ef5bCIPtmkKzdSew.png)

登录你的 `Cloudflare` 账号，在左侧导航栏中选择 `管理帐户` -> `帐户API令牌`。
    ![输入图片说明](/imgs/2025-03-05/GpVBZBYWfdzFBtRa.png)

点击 `创建令牌` 。

   ![输入图片说明](/imgs/2025-03-05/9gCl1NK0AF9M6lDF.png)

这里我们使用模板快速创建，因为我们使用的功能是和 `Worker` 相关的，我们可以直接使用这个模板创建。

![输入图片说明](/imgs/2025-03-05/0WGtcudA374bE3ta.png)

系统已经套用模板中设置好的权限，然后设置 `区域资源`，这里需要选择这个令牌起作用的范围，是必填项，省事你就选所有区域。

![输入图片说明](/imgs/2025-03-05/J1FqpE5uOGZJFZIC.png)

然后直接点最下方 `继续以显示摘要`。

   ![输入图片说明](/imgs/2025-03-05/NVNqpSCIDLcB0sOi.png)

最后确认一下设置，点击 `创建令牌` 完成创建。

![输入图片说明](/imgs/2025-03-05/Uu5biHsJBiA3xvXA.png)

* 安装并登录 `Cloudflare CLI`  `wrangler`：

```bash
	npm install --global wrangler
	wrangler login
```

运行第二行命令时会打开浏览器，并登录你的 `Cloudflare` 账号，并告诉你要用到哪些权限，点击 `Allow` 确认同意就可以了。

![输入图片说明](/imgs/2025-03-05/Y2RuCFXY8STYi4mD.png)

如果显示下面界面就代表你登录成功了。

![输入图片说明](/imgs/2025-03-05/JhBvlVfEH2UW90fU.png)

4. **部署 Worker**：

   * 部署 Worker：

```bash
   wrangler deploy
```

 提示下面信息就代表部署成功了。

  ![输入图片说明](/imgs/2025-03-05/FZP85lNxJOgB8O9g.png)

#### 4. 配置 OAuth Secrets

1. **添加环境变量**：

   * 使用命令行 `wrangler` 添加环境变量：

     ```bash
     wrangler secret put GITHUB_OAUTH_ID
     wrangler secret put GITHUB_OAUTH_SECRET
     ```
   * 在提示中输入您的 GitHub OAuth 应用程序的客户端 ID 和客户端密钥。

这个步骤你也可以直接在`Cloudflare`刚才部署的`Worker`中去进行设置，添加环境变量。        

#### 5. 验证配置

1. **访问管理界面**：

   * 打开你的`Deacp CMS` 管理界面网址 `https://www.365121.xyz/admin/`。
   * 点击使用 GitHub 账户登录。
   * 对应操作你的GitHub账户授权登录，你就可以使用`Deacp CMS`来管理你的网站文章了，方便又快捷。
2. **发布文章**：

   * 在管理界面中，点击“文章”选项卡。
   * 点击“新建文章”按钮。
   * 填写文章标题、内容等信息。
   * 保存并发布。

#### 6. 常见问题解答

1. **为什么需要独立的 OAuth 代理？**

   * 这个代理允许您在不依赖 Netlify Identity 或 Git Gateway 服务的情况下处理 GitHub 身份验证。
   * 它提供了一个独立的子域名（如 `decap.mydomain.com`），用于处理 GitHub 的回调请求。
2. **如何确保安全性？**

   * 通过使用独立的子域名，您可以更好地控制和管理 GitHub 身份验证流程。
   * 这种配置使您可以更灵活地部署和管理 Decap CMS，而不受第三方服务的限制。
3. **如何调试和日志？**

   * 检查 Cloudflare Worker 的日志，确保没有错误。
   * 检查 GitHub OAuth 应用程序的日志，确保授权流程正常。

#### 结论

通过以上步骤，您应该能够成功配置和部署 Decap CMS 的 GitHub OAuth 代理，并顺利访问和使用 Decap CMS 的管理界面。如果您在配置过程中遇到任何问题，建议检查 Decap CMS 的配置文件和 Cloudflare 的设置，确保所有路径和环境变量正确无误。希望这篇教程能帮助您更轻松地完成 Decap CMS 的配置。
