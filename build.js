#!/usr/bin/env node
import fs from 'node:fs'
import {exec} from 'node:child_process'
import {promisify} from 'node:util'
const Exec = promisify(exec)

async function build() {
    const env = process.env
    env.tag = (await Exec('git describe --tags $(git rev-list --tags --max-count=1)\n')).stdout.trim()
    try {
        await Exec('npm version $tag', {env})
    } catch (e) {}

    const replacements = {}
    replacements.EXAMPLES = await fs.promises.readFile('examples.js')
    replacements.API = (await Exec('jsdoc2md -d 3 index.js')).stdout

    const template = (await fs.promises.readFile('README.md.template')).toString()

    const readme = template.replace(/%%% (\w+) %%%/g, (match, name) => replacements[name])
    await fs.promises.writeFile('README.md', readme)
}

build()