export type Language = 'zh-CN' | 'en-US'

let currentLanguage: Language = 'zh-CN'

export const setLanguage = (lang: Language) => {
	currentLanguage = lang
}

export const getLanguage = (): Language => currentLanguage

export const messages = {
	'zh-CN': {
		AnswerMessage: {
			PROJECT_NAME_MESSAGE: '项目名称:',
			DESCRIPTION_MESSAGE: '项目描述:',
			AUTHOR_MESSAGE: '项目作者:',
			SCOPED_PACKAGE_MESSAGE: '是否基于作者名生成 scoped 包名？'
		},
		SelectMessage: {
			TEMPLATE_MESSAGE: '模板类型:',
			TEMPLATE_BACK_MESSAGE: '← 返回上一级',
			TEMPLATE_NAVIGATION_MESSAGE: '使用方向键选择，回车确认',
			TEMPLATE_PAGER_MESSAGE: '使用空格键翻页',
			PATH_SEPARATOR: ' → ',
			BACK_VALUE: 'back',
			CHECK_MARK: '✔'
		},
		SuccessMessage: {
			PROJECT_CREATED: '✅ 项目创建成功！',
			PROJECT_DIRECTORY: '📁 项目目录:',
			PACKAGE_NAME: '📦 包名:',
			START_DEVELOPMENT: '🚀 开始开发:',
			MORE_INFO: '📚 更多信息请查看 README.md'
		},
		GeneralMessage: {
			CREATE_PROJECT: '✨ 创建新项目',
			CREATING_PROJECT: '✨ 创建项目中...',
			OPERATION_CANCELLED: '操作已取消',
			CONFIG_LOAD_ERROR: '警告: 无法加载配置文件，使用默认配置',
			YARN_COMMAND: 'yarn',
			YARN_DEV_COMMAND: 'yarn dev'
		},
		DefaultConfig: {
			TYPESCRIPT_NAME: 'TypeScript',
			TYPESCRIPT_VALUE: 'ts',
			ESM_NAME: 'ESM',
			ESM_VALUE: 'esm',
			DEFAULT_AUTHOR: 'youmean',
			DEFAULT_REPOSITORY: 'git+https://github.com'
		},
		ValidateMessage: {
			PROJECT_NAME_SCOPE: 'scope',
			PROJECT_NAME: '项目名称',
			PROJECT_NAME_TOO_SHORT: '不能少于3个字符',
			PROJECT_NAME_TOO_LONG: '不能超过20个字符',
			PROJECT_NAME_INVALID: '只能包含字母、数字、下划线和连字符',
			PROJECT_NAME_EXISTS: '项目目录已存在:',
			PROJECT_NAME_SCOPED_INVALID: 'scope 必须以 @ 开头',
			PROJECT_NAME_SCOPED_FORMAT_ERROR: 'scope 格式错误'
		}
	},
	'en-US': {
		AnswerMessage: {
			PROJECT_NAME_MESSAGE: 'Project name:',
			DESCRIPTION_MESSAGE: 'Description:',
			AUTHOR_MESSAGE: 'Author:',
			SCOPED_PACKAGE_MESSAGE: 'Generate scoped package name based on author?'
		},
		SelectMessage: {
			TEMPLATE_MESSAGE: 'Template type:',
			TEMPLATE_BACK_MESSAGE: '← Back',
			TEMPLATE_NAVIGATION_MESSAGE: 'Use arrow keys to select, press Enter to confirm',
			TEMPLATE_PAGER_MESSAGE: 'Use space to page',
			PATH_SEPARATOR: ' → ',
			BACK_VALUE: 'back',
			CHECK_MARK: '✔'
		},
		SuccessMessage: {
			PROJECT_CREATED: '✅ Project created successfully!',
			PROJECT_DIRECTORY: '📁 Project directory:',
			PACKAGE_NAME: '📦 Package name:',
			START_DEVELOPMENT: '🚀 Start development:',
			MORE_INFO: '📚 See README.md for more information'
		},
		GeneralMessage: {
			CREATE_PROJECT: '✨ Create new project',
			CREATING_PROJECT: '✨ Creating project...',
			OPERATION_CANCELLED: 'Operation cancelled',
			CONFIG_LOAD_ERROR: 'Warning: Unable to load config file, using default config',
			YARN_COMMAND: 'yarn',
			YARN_DEV_COMMAND: 'yarn dev'
		},
		DefaultConfig: {
			TYPESCRIPT_NAME: 'TypeScript',
			TYPESCRIPT_VALUE: 'ts',
			ESM_NAME: 'ESM',
			ESM_VALUE: 'esm',
			DEFAULT_AUTHOR: 'youmean',
			DEFAULT_REPOSITORY: 'git+https://github.com'
		},
		ValidateMessage: {
			PROJECT_NAME_SCOPE: 'scope',
			PROJECT_NAME: 'Project name',
			PROJECT_NAME_TOO_SHORT: 'Must be at least 3 characters',
			PROJECT_NAME_TOO_LONG: 'Cannot exceed 20 characters',
			PROJECT_NAME_INVALID: 'Can only contain letters, numbers, underscores and hyphens',
			PROJECT_NAME_EXISTS: 'Project directory already exists:',
			PROJECT_NAME_SCOPED_INVALID: 'Scope must start with @',
			PROJECT_NAME_SCOPED_FORMAT_ERROR: 'Scope format error'
		}
	}
}

export const getMessages = () => messages[currentLanguage]
