const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const { createMuiTheme } = require('@material-ui/core/styles');
//import blue from '@material-ui/core/colors/blue';

const defaultTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
        config
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: { '@primary-color': `${defaultTheme.palette.primary.main}` },
        javascriptEnabled: true
    })(config, env);
    return config;
};
