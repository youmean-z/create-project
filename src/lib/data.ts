import type { DistinctQuestion } from 'inquirer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getMessages, setLanguage } from '../messages'
import type { Answers, Config, Template } from '../types'
import { validateName } from '../utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const loadConfig = async (): Promise<Config> => {
	try {
		const projectRoot = path.resolve(__dirname, '..')
		const configPath = path.join(projectRoot, 'templates.json')
		const configContent = await fs.readFile(configPath, 'utf-8')
		const config = JSON.parse(configContent)
		if (config.language) {
			setLanguage(config.language)
		}
		return config
	} catch (error) {
		console.warn(getMessages().GeneralMessage.CONFIG_LOAD_ERROR)
		return {
			templates: [
				{
					name: getMessages().DefaultConfig.TYPESCRIPT_NAME,
					value: getMessages().DefaultConfig.TYPESCRIPT_VALUE,
					children: [
						{
							name: getMessages().DefaultConfig.ESM_NAME,
							value: getMessages().DefaultConfig.ESM_VALUE
						}
					]
				}
			],
			defaultAuthor: getMessages().DefaultConfig.DEFAULT_AUTHOR
		}
	}
}

export const loadTemplates = async (): Promise<Template[]> => {
	const config = await loadConfig()
	return config.templates
}

export const loadDefaultAuthor = async (): Promise<string> => {
	const config = await loadConfig()
	return config.defaultAuthor
}

export const loadRepository = async (): Promise<string> => {
	const config = await loadConfig()
	return config.repository || getMessages().DefaultConfig.DEFAULT_REPOSITORY
}

export const createQuestions = async (): Promise<DistinctQuestion<Answers>[]> => {
	const defaultAuthor = await loadDefaultAuthor()
	const messages = getMessages()

	return [
		{
			type: 'input',
			name: 'projectName',
			message: messages.AnswerMessage.PROJECT_NAME_MESSAGE,
			validate: (value) => validateName(value)
		},
		{
			type: 'input',
			name: 'description',
			message: messages.AnswerMessage.DESCRIPTION_MESSAGE
		},
		{
			type: 'input',
			name: 'author',
			message: messages.AnswerMessage.AUTHOR_MESSAGE,
			default: defaultAuthor
		},
		{
			type: 'confirm',
			name: 'useScoped',
			message: messages.AnswerMessage.SCOPED_PACKAGE_MESSAGE,
			default: true,
			when: (answers) => {
				return Boolean(answers.projectName && !answers.projectName.includes('/'))
			}
		}
	]
}

export const gray = (str: string) => `\x1b[90m${str}\x1b[0m`
export const green = (str: string) => `\x1b[32m${str}\x1b[0m`
export const cyan = (str: string) => `\x1b[36m${str}\x1b[0m`
