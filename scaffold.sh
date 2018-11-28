#!/usr/bin/env bash

echo Name of the project?
read name

echo Description of the project?
read desc



tee package.json <<EOF
{
	"name": "$name",
	"version": "0.0.1",
	"repository": "",
	"typings": "index",
	"description": "$desc",
	"main": "index.js",
	"scripts": {
		"build": "rm-rf dist/ && tsc"
	},
	"keywords": [],
	"author": "Greg Rosenbaum",
	"license": "MIT",
	"dependencies": {},
	"devDependencies": {}
}
EOF

tee tsconfig.json <<EOF
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": false,
    "sourceMap": true,
    "allowUnreachableCode": true,
    "experimentalDecorators": true,
    "lib": [
      "es6"
    ],
    "declaration": true,
    "outDir": "dist"
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
EOF


mkdir -p src/lib
mkdir -p src/test

yarn add --dev typescript

echo "Add node?"
select answer in yes no;
do
	if [[ "$answer" == "yes" ]]; then
		yarn add --dev @types/node
	fi
done
echd
echo "Add lodash?"
select answer in yes no;
do
	if [[ "$answer" == "yes" ]]; then
		yarn add lodash
		yarn add @types/lodash --dev
	fi
done
tee src/lib/main.ts <<EOF
console.log("Hello world!");
EOF