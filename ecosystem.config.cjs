module.exports = {
  apps: [
    {
      name: "cripto", 
      script: "node_modules/next/dist/bin/next",
      args: "start",
      interpreter: '/home/quant/.nvm/versions/node/v25.2.1/bin/node', 
      cwd: "/home/quant/cripto", 
      env: {
        NODE_ENV: "production", 
        PORT: 4567, 
      },
    },
  ],
};
  