import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new options.webpack.container.ModuleFederationPlugin({
          name: 'federatedApp',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Button': './src/components/Button.tsx',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );
    } else {
      // Fallback for server build to ignore federated modules
      if (Array.isArray(config.externals)) {
        config.externals.push((context: any, request: string, callback: any) => {
          if (typeof request === 'string' && request.startsWith('federatedApp/')) {
            return callback(null, `commonjs ${request}`);
          }
          if (typeof callback === 'function') {
            callback();
          }
        });
      }
    }
    return config;
  },
};

export default nextConfig;
