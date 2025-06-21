import { defineConfig } from 'rolldown'

export default defineConfig({
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: false,
		minify: true
	},
	external: ['node:path', 'node:fs', 'node:process', 'node:url', 'node:os', 'node:child_process', 'inquirer', 'node:fs/promises']
})
