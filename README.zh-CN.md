# @youmean/create-project

一个简单高效的项目脚手架工具，帮助你快速创建新项目。

## ✨ 特性

- 🎯 **交互式模板选择** - 多级模板导航，支持返回操作
- 🌍 **双语支持** - 中英文界面，支持动态语言切换
- 📝 **智能包名处理** - 支持普通包名和 scoped 包名（如 `my-project` 或 `@scope/project`）
- 🔄 **模板变量替换** - 自动替换 `{{projectName}}`、`{{author}}`、`{{description}}` 等
- ⚙️ **外部配置** - 通过 `templates.json` 配置语言、作者和仓库设置
- 🏷️ **智能验证** - 完整的项目名称验证，提供有用的错误信息
- 🚀 **现代技术栈** - 基于 TypeScript、Rolldown 打包器和 Biome 代码格式化工具
- 📦 **清洁输出** - 生成的项目具有正确的依赖和配置

## 🚀 快速开始

### 安装

```bash
yarn global add @youmean/create-project
```

### 使用

```bash
create-project
```

工具会引导你完成：
1. **项目名称** - 输入项目名称（支持 scoped 包）
2. **项目描述** - 项目的简要描述
3. **项目作者** - 项目作者（默认为配置的作者）
4. **Scoped 包名** - 可选择基于作者名自动生成 scoped 包名
5. **模板选择** - 从可用模板中选择，支持导航

## ⚙️ 配置

在项目根目录创建 `templates.json` 文件：

```json
{
  "language": "zh-CN",
  "defaultAuthor": "youmean",
  "repository": "git+https://github.com/youmean-z",
  "templates": [
    {
      "name": "TypeScript",
      "value": "ts",
      "children": [
        {
          "name": "ESM",
          "value": "esm"
        }
      ]
    }
  ]
}
```

### 配置选项

- `language`: `"zh-CN"` | `"en-US"` - 界面语言
- `defaultAuthor`: 新项目的默认作者名
- `repository`: 生成项目的仓库基础 URL
- `templates`: 支持层级结构的模板配置

## 🛠️ 开发

```bash
# 安装依赖
yarn

# 构建项目
yarn build

# 开发模式（监听文件变化）
yarn dev

# 运行 CLI
yarn start
```

## 🔧 模板变量

以下变量会在模板文件中自动替换：

- `{{projectName}}` - 完整项目名称（包括 scope，如果适用）
- `{{packageName}}` - 仅包名（不包括 scope）
- `{{description}}` - 项目描述
- `{{author}}` - 项目作者
- `{{repository}}` - 仓库基础 URL

## 🌍 语言支持

工具支持中英文界面。通过修改 `templates.json` 中的 `language` 字段来切换语言：

```json
{
  "language": "zh-CN"  // 中文界面
}
```

```json
{
  "language": "en-US"  // 英文界面
}
```

## 📝 项目名称验证

工具对项目名称进行以下规则验证：

- **长度**：3-20 个字符
- **字符**：仅允许字母、数字、下划线和连字符
- **Scoped 包**：必须遵循 `@scope/name` 格式
- **唯一性**：项目目录不能已存在

## 🤝 贡献

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m '添加一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 使用 [Rolldown](https://github.com/rolldown/rolldown) 进行快速打包
- 使用 [Biome](https://biomejs.dev/) 进行代码格式化
- 使用 [Inquirer](https://github.com/SBoudrias/Inquirer.js/) 进行 CLI 交互 