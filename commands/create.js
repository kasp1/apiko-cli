const fs = require('fs')
const exec = require('child_process').exec
const commandExists = require('command-exists').sync

module.exports = {
  usage: "apiko init <directory_name>\n- Creates a new directory with the specified name and downloads the Apiko starter template to it.\n- You can then navigate to it, run 'npm i' and 'npm run dev' to start Apiko in development mode.",
  handler () {
    return new Promise((resolve, reject) => {
      console.log('Initiating a new Apiko server...')
      if (fs.existsSync(process.argv[3])) {
        console.log('The specified directory already exists. Please try a different directory name or remove this one first.')
        process.exit(0)
      }

      if (!commandExists('git')) {
        console.log('It seems like Git is not installed here. Follow these instructions: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git')
        process.exit(0)
      }

      let cmd = exec('git clone https://github.com/kasp1/apiko-start.git ' + process.argv[3])
      cmd.stderr.pipe(process.stderr)

      cmd.on('close', (code) => {
        resolve(code)
      })
    })
  }
}