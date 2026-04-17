import { timeoutMw } from '../src/middleware/timeoutMw'
import { compose } from '../src/core/compose'
import { sleep } from './util'

const noopMw = async (ctx, next) => {
    await sleep(3 * 1000)
    ctx.data = 'success'
    await next()
}

function run () {
    const ctx = { timeout: 5 * 1000, data: '' }
    const dispatch = compose(timeoutMw, noopMw)
    dispatch(ctx).then(data => {
        console.log('data', data)
    }).catch(err => {
        console.log('err', err)
    })
}

function runError () {
    const ctx = { timeout: 2 * 1000, data: '' }
    const dispatch = compose(timeoutMw, noopMw)
    dispatch(ctx).then(data => {
        console.log('data', data)
    }).catch(err => {
        console.log('err', err)
    })
}

run()
runError()