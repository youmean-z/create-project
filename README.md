# @youmean/create-project

A simple and efficient project scaffold tool to help you quickly create new projects.

## ✨ Features

- 🎯 **Interactive Template Selection** - Multi-level template navigation with back support
- 🌍 **Bilingual Support** - Chinese and English interfaces with dynamic language switching
- 📝 **Smart Package Names** - Supports both regular and scoped package names (e.g., `my-project` or `@scope/project`)
- 🔄 **Template Variables** - Automatic replacement of `{{projectName}}`, `{{author}}`, `{{description}}`, etc.
- ⚙️ **External Configuration** - Language, author, and repository settings via `templates.json`
- 🏷️ **Intelligent Validation** - Comprehensive project name validation with helpful error messages
- 🚀 **Modern Stack** - Built with TypeScript, Rolldown bundler, and Biome code formatter
- 📦 **Clean Output** - Generated projects with proper dependencies and configuration

## 🚀 Quick Start

### Installation

```bash
yarn global add @youmean/create-project
```

### Usage

```bash
create-project
```

The tool will guide you through:
1. **Project name** - Enter your project name (supports scoped packages)
2. **Description** - Brief description of your project
3. **Author** - Project author (defaults to configured author)
4. **Scoped package** - Option to generate scoped package name based on author
5. **Template selection** - Choose from available templates with navigation

## ⚙️ Configuration

Create a `templates.json` file in your project root:

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

### Configuration Options

- `language`: `"zh-CN"` | `"en-US"` - Interface language
- `defaultAuthor`: Default author name for new projects
- `repository`: Base repository URL for generated projects
- `templates`: Template structure with hierarchical support

## 🛠️ Development

```bash
# Install dependencies
yarn

# Build the project
yarn build

# Development mode with watch
yarn dev

# Run the CLI
yarn start
```

## 🔧 Template Variables

The following variables are automatically replaced in template files:

- `{{projectName}}` - Full project name (including scope if applicable)
- `{{packageName}}` - Package name only (without scope)
- `{{description}}` - Project description
- `{{author}}` - Project author
- `{{repository}}` - Repository base URL

## 🌍 Language Support

The tool supports both Chinese and English interfaces. Change the language by modifying the `language` field in `templates.json`:

```json
{
  "language": "zh-CN"  // Chinese interface
}
```

```json
{
  "language": "en-US"  // English interface
}
```

## 📝 Project Name Validation

The tool validates project names with the following rules:

- **Length**: 3-20 characters
- **Characters**: Letters, numbers, underscores, and hyphens only
- **Scoped packages**: Must follow `@scope/name` format
- **Uniqueness**: Project directory must not already exist

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Rolldown](https://github.com/rolldown/rolldown) for fast bundling
- Code formatting with [Biome](https://biomejs.dev/)
- CLI interactions with [Inquirer](https://github.com/SBoudrias/Inquirer.js/) 