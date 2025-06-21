export interface Template {
	name: string
	value: string
	children?: Template[]
}

export interface Answers {
	projectName: string
	description: string
	author: string
	useScoped?: boolean
}

export interface Config {
	language?: 'zh-CN' | 'en-US'
	templates: Template[]
	defaultAuthor: string
	repository?: string
}
