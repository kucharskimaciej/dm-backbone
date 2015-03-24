module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ],
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ]
    },
    jshint: {
        camelcase: true,
        emitErrors: true,
        eqeqeq: true,
        forin: true,
        esnext: true,
        latedef: 'nofunc',
        maxcomplexity: 4,
        maxdepth: 3,
        maxparams: 3,
        maxstatements: 5,
        undef: true,
        unused: true,
        curly: true,
        strict: true,
        browser: true,
        bitwise: true
    }
};