#!/usr/bin/env node
'use strict'

const updateNotifier = require('update-notifier')
const meow = require('meow')
const scribe = require('./lib/scribe.js')
const documents = require('./lib/documents.js')

const cli = meow(`
  Usage
    $ scribe

  Options
    init <path>                                Create a new ink-elements project
    publish --page-format <size> <html> <path> Generate PDF document from HTML

  Examples
    $ scribe init project-folder
    $ cd project-folder
    $ npm run build
    $ scribe publish --page-format A4 ./dist/html/index.html dist/documents/
`, {
  flags: {
    size: {
      type: 'string',
      alias: 's'
    }
  }
})

updateNotifier({ pkg: cli.pkg }).notify()

console.log(`${cli.pkg.name} (version ${cli.pkg.version})`)

if (cli.input.length === 0) {
  console.error(cli.help)
  process.exit(1)
} else if (cli.input[0] === 'init') {
  scribe.init(cli.input[1])
} else if (cli.input[0] === 'publish') {
  const input = cli.input[1]
  const output = cli.input[2]
  const document = documents.load(process.cwd(), input, output, cli.flags.pageFormat)
  scribe.publish(document)
}
