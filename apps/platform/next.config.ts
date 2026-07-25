import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new options.webpack.container.ModuleFederationPlugin({
          name: 'platformApp',
          remotes: {
            legacyApp: 'legacyApp@http://localhost:5050/_next/static/chunks/remoteEntry.js',
            federatedApp: 'federatedApp@http://localhost:7070/_next/static/chunks/remoteEntry.js',
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
      // Fallback for server build to ignore federated modules (App Router workaround)
      if (Array.isArray(config.externals)) {
        config.externals.push((context: any, request: string, callback: any) => {
          if (typeof request === 'string' && (request.startsWith('legacyApp/') || request.startsWith('federatedApp/'))) {
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
