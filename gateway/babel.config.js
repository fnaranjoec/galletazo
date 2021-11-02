module.exports = {
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "#root": "./server/src"
                }
            }
        ]
    ],
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                },
            }
        ],

    ]

}