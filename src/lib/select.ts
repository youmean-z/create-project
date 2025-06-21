import inquirer from 'inquirer'
import { getMessages } from '../messages'
import type { Template } from '../types'
import { deleteLine } from '../utils'
import { cyan, gray, green } from './data'

export const selectTemplate = async (
	choices: Template[],
	parentHistory: Template[][] = [choices],
	names: string[] = [],
	path: string[] = []
): Promise<string> => {
	const messages = getMessages()
	if (path.length > 0) deleteLine()

	const pathStr = path.length ? gray(path.join(messages.SelectMessage.PATH_SEPARATOR)) : ''

	const { template } = await inquirer.prompt({
		type: 'list',
		name: 'template',
		message: `${messages.SelectMessage.TEMPLATE_MESSAGE} ${pathStr} `,
		instructions: {
			navigation: messages.SelectMessage.TEMPLATE_NAVIGATION_MESSAGE,
			pager: messages.SelectMessage.TEMPLATE_PAGER_MESSAGE
		},
		choices: [
			...choices.map((item) => ({
				name: path.length ? `${item.name} ${gray(`(${names.join(messages.SelectMessage.PATH_SEPARATOR)})`)}` : item.name,
				value: item.value
			})),
			...(path.length ? [{ name: gray(messages.SelectMessage.TEMPLATE_BACK_MESSAGE), value: messages.SelectMessage.BACK_VALUE }] : [])
		]
	})

	if (template === messages.SelectMessage.BACK_VALUE) {
		path.pop()
		names.pop()
		const previousChoices = parentHistory[parentHistory.length - 1] || choices
		parentHistory.pop()
		if (path.length === 0) deleteLine()
		return selectTemplate(previousChoices, parentHistory, names, path)
	}

	const current = choices.find((item) => item.value === template)
	if (current?.children) {
		parentHistory.push(choices)
		return selectTemplate(current.children, parentHistory, [...names, current.name], [...path, current.value])
	}

	deleteLine()
	const optionName = current?.name || ''
	const pathInfo = path.length ? ` ${gray(`(${names.join(messages.SelectMessage.PATH_SEPARATOR)})`)}` : ''
	console.log(`${green(messages.SelectMessage.CHECK_MARK)} ${messages.SelectMessage.TEMPLATE_MESSAGE} ${cyan(optionName)}${pathInfo}`)

	return [...path, current?.value || ''].join('/')
}
