// rn-cli config from react-native-tab-view/example/package.json

const path = require('path')
const glob = require('glob-to-regexp')
const blacklist = require('metro/src/blacklist')
const rootPackage = require('../../package.json')

const dependencies = Object.keys(rootPackage.dependencies)
const peerDependencies = Object.keys(rootPackage.peerDependencies)

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '../..')]
  },
  getProvidesModuleNodeModules() {
    return [...dependencies, ...peerDependencies]
  },
  getBlacklistRE() {
    return blacklist([
      glob(`${path.resolve(__dirname, '../..')}/node_modules/*`),
      glob(`${__dirname}/node_modules/*/{${dependencies.join(',')}}`, {
        extended: true
      })
    ])
  }
}
