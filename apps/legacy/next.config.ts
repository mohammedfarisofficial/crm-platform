import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new options.webpack.container.ModuleFederationPlugin({
          name: 'legacyApp',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './SampleComponent': './src/components/SampleComponent.tsx',
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
