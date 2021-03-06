/**
 * Created by nani on 16/12/15.
 */
import WebpackDevMiddleware from 'webpack-dev-middleware'
import applyExpressMiddleware from '../lib/apply-express-middleware'

const config = require('../../config')
const paths = config.utils_paths
const debug  = require('debug')('app:server:webpack-dev')

export default (compiler, publicPath) => {
    debug('Enable webpack dev middleware.')

    const middleware = WebpackDevMiddleware(compiler, {
        publicPath,
        contentBase: paths.base(config.dir_client),
        hot: true,
        quiet: config.compiler_quiet,
        noInfo: config.compiler_quiet,
        lazy: false,
        stats: config.compiler_stats
    })

    return async function koaWebpackDevMiddleware(ctx, next) {
        let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
            end: (content) => ctx.body = content,
            setHeader: function () {
                ctx.set.apply(ctx, arguments)
            }
        })

        if (hasNext) {
            await next()
        }
    }
}
