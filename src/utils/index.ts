import fs from 'node:fs/promises'
import path from 'node:path'
import { getMessages } from '../messages'

export const deleteLine = (n = 1) => {
	for (let i = 0; i < n; i++) {
		process.stdout.write('\x1b[1A\x1b[2K')
	}
}

const replacePlaceholders = (content: string, projectName: string, description: string, author: string, repository: string) => {
	const packageName = projectName.includes('/') ? projectName.split('/').pop() || projectName : projectName
	return content
		.replace(/\{\{projectName\}\}/g, projectName)
		.replace(/\{\{packageName\}\}/g, packageName)
		.replace(/\{\{description\}\}/g, description)
		.replace(/\{\{author\}\}/g, author)
		.replace(/\{\{repository\}\}/g, repository)
}

export const copyDir = async (src: string, dest: string, projectName: string, description: string, author: string, repository: string) => {
	const files = await fs.readdir(src, { withFileTypes: true })
	for (const file of files) {
		const srcPath = path.join(src, file.name)
		const destPath = path.join(dest, file.name)

		if (file.isDirectory()) {
			await fs.mkdir(destPath, { recursive: true })
			await copyDir(srcPath, destPath, projectName, description, author, repository)
		} else {
			const content = await fs.readFile(srcPath, 'utf-8')
			const processedContent = replacePlaceholders(content, projectName, description, author, repository)
			await fs.writeFile(destPath, processedContent)
		}
	}
}

const validateProjectExists = async (projectName: string) => {
	const messages = getMessages()
	const projectPath = path.join(process.cwd(), projectName)
	try {
		await fs.access(projectPath)
		return `${messages.ValidateMessage.PROJECT_NAME_EXISTS} ${projectName}`
	} catch {
		return true
	}
}

const validatePart = (part: string, name = getMessages().ValidateMessage.PROJECT_NAME, minLength = 3, maxLength = 20) => {
	const messages = getMessages()
	if (part.length < minLength) {
		return `${name} ${messages.ValidateMessage.PROJECT_NAME_TOO_SHORT}`
	}
	if (part.length > maxLength) {
		return `${name} ${messages.ValidateMessage.PROJECT_NAME_TOO_LONG}`
	}
	if (!/^[a-zA-Z0-9_-]+$/.test(part)) {
		return `${name} ${messages.ValidateMessage.PROJECT_NAME_INVALID}`
	}
	return true
}

export const validateName = async (value: string) => {
	const messages = getMessages()
	if (value.includes('/')) {
		const parts = value.split('/')
		if (parts.length !== 2) {
			return messages.ValidateMessage.PROJECT_NAME_SCOPED_FORMAT_ERROR
		}
		const [scope, name] = parts
		if (!scope.startsWith('@')) {
			return messages.ValidateMessage.PROJECT_NAME_SCOPED_INVALID
		}
		const scopeName = scope.slice(1)
		const scopeResult = validatePart(scopeName, messages.ValidateMessage.PROJECT_NAME_SCOPE)
		if (scopeResult !== true) {
			return scopeResult
		}
		const nameResult = validatePart(name)
		if (nameResult !== true) {
			return nameResult
		}
		const projectExists = await validateProjectExists(name)
		if (projectExists !== true) {
			return projectExists
		}
	} else {
		const result = validatePart(value)
		if (result !== true) {
			return result
		}
		const projectExists = await validateProjectExists(value)
		if (projectExists !== true) {
			return projectExists
		}
	}

	return true
}
