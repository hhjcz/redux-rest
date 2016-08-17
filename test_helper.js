/** Created by hhj on 12/17/15. */
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
// import chaiAsPromised from 'chai-as-promised'
// import spies from 'chai-spies'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
// import loadEnv from './src/server/loadEnv'

// loadEnv()

chai.use(chaiImmutable)
// chai.use(spies)
// chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()
sinon.assert.expose(chai.assert, { prefix: '' });

// ignore import and require of these extensions on server (in node; deprecated but still functional):
const ignoreRequireExtensions = ['.scss', '.sass', '.css', '.less', '.styl', '.png', '.jpg', '.gif']
ignoreRequireExtensions.forEach((ext) => {
  require.extensions[ext] = () => {   // eslint-disable-line arrow-body-style
  }
})
