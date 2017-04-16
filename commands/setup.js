const exec = require('child_process').exec
const path = require('path')

module.exports = {
  usage: "apiko setup <directory_name>\n- Creates a new directory with the specified name and installs and runs the Apiko starter template in it.",
  handler () {
    return new Promise((resolve, reject) => {
      g.cli.create.handler().then((code) => {
        if (code === 0) {
          console.log('Setting up a new Apiko server...')

          // change to the created directory
          process.chdir(process.cwd() + path.sep + process.argv[3])

          // npm install
          let cmd = exec('npm install')
          cmd.stderr.pipe(process.stderr)

          cmd.on('close', (code) => {
            g.cli.run.handler('dev')
          })
        } else {
          process.exit(0)
        }
      })
    })
  }
}