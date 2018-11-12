const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
const { createMuiTheme } = require("@material-ui/core/styles");
//const rewireImport = require("react-app-rewire-import"); //odinstalowalem i importuje potrzebne paczki ręcznie
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
//import blue from '@material-ui/core/colors/blue';

const defaultTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins.push(
        new MonacoWebpackPlugin({
            languages: ["csharp", "java"]
        })
    );
    config = injectBabelPlugin(
        ["import", { libraryName: "antd", libraryDirectory: "es", style: true }], // change importing css to less
        config
    );
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": `${defaultTheme.palette.primary.main}` },
        javascriptEnabled: true
    })(config, env);

    /*config = rewireImport(config, env, {
        libraryName: "antd",
        style: "true"
    });*/

    return config;
};
