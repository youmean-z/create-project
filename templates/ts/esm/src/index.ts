import { hello } from './lib/hello'

hello()

const app = document.querySelector('#app') as HTMLElement

app.innerHTML = 'hello world'

export default app
