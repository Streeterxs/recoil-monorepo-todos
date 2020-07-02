module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
        '@babel/preset-flow',
    ],
    plugins: [
        [
            'relay'
        ],
        [
            "module-resolver", {
                "alias": {
                    "^react-native$": "react-native-web"
                }
            }
        ],
        // Babel identify optional chaining '?' operations
        '@babel/plugin-proposal-optional-chaining',
    ],
};