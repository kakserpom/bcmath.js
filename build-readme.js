import fs from 'node:fs'
import {exec} from 'node:child_process'
import {promisify} from 'node:util'
const Exec = promisify(exec)

async function buildReadme() {
    const replacements = {}
    replacements.EXAMPLES = await fs.promises.readFile('examples.js')
    replacements.API = (await Exec('jsdoc2md -d 3 index.js')).stdout.trim()

    const template = (await fs.promises.readFile('README.md.template')).toString()

    const readme = template.replace(/%%% (\w+) %%%/g, (match, name) => replacements[name])
    await fs.promises.writeFile('README.md', readme)
}

buildReadme()