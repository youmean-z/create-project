import inquirer from 'inquirer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getMessages } from '../messages'
import { copyDir } from '../utils'
import { createQuestions, loadConfig, loadRepository, loadTemplates } from './data'
import { selectTemplate } from './select'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const init = async () => {
	try {
		await loadConfig()
		const messages = getMessages()
		console.log(`${messages.GeneralMessage.CREATE_PROJECT}\n`)

		const templates = await loadTemplates()
		const questions = await createQuestions()
		const answers = await inquirer.prompt(questions)

		let finalProjectName = answers.projectName
		if (answers.useScoped && !answers.projectName.includes('/')) {
			finalProjectName = `@${answers.author}/${answers.projectName}`
		}

		const templatePath = await selectTemplate(templates)
		const projectPath = finalProjectName.split('/').pop()
		const repository = await loadRepository()

		console.log(`\n${messages.GeneralMessage.CREATING_PROJECT}\n`)

		const projectRoot = path.resolve(__dirname, '..')
		const templateDir = path.join(projectRoot, 'templates', templatePath)
		const projectDir = path.join(process.cwd(), projectPath)

		await copyDir(templateDir, projectDir, finalProjectName, answers.description, answers.author, repository)

		console.log(`\n${messages.SuccessMessage.PROJECT_CREATED}`)
		console.log(`\n${messages.SuccessMessage.PROJECT_DIRECTORY} ${projectPath}`)
		console.log(`${messages.SuccessMessage.PACKAGE_NAME} ${finalProjectName}`)
		console.log(`\n${messages.SuccessMessage.START_DEVELOPMENT}`)
		console.log(`\n  cd ${projectPath}`)
		console.log(`  ${messages.GeneralMessage.YARN_COMMAND}`)
		console.log(`  ${messages.GeneralMessage.YARN_DEV_COMMAND}`)
		console.log(`\n${messages.SuccessMessage.MORE_INFO}`)
	} catch (error) {
		const messages = getMessages()
		if (error instanceof Error && error.message.includes('SIGINT')) {
			console.log(`\n${messages.GeneralMessage.OPERATION_CANCELLED}`)
			process.exit(0)
		}
		throw error
	}
}
