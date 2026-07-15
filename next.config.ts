import type {NextConfig} from 'next';

const isStaticExport = process.env.STATIC_EXPORT === 'true';

// Extract the repository name from GITHUB_REPOSITORY (e.g., "owner/repo-name")
const githubRepo = process.env.GITHUB_REPOSITORY;
const repoName = githubRepo ? githubRepo.split('/')[1] : undefined;
const isGitHubIO = repoName && repoName.toLowerCase().endsWith('.github.io');

// Support custom domains by checking if BASE_PATH is explicitly set, otherwise auto-detect for gh-pages
const basePath = process.env.BASE_PATH !== undefined
  ? process.env.BASE_PATH
  : (isStaticExport && repoName && !isGitHubIO ? `/${repoName}` : undefined);

const nextConfig: NextConfig = {
  trailingSlash: isStaticExport ? true : undefined,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ignore build-time type errors during static export if any
  },
  // Conditional static export settings
  output: isStaticExport ? 'export' : 'standalone',
  basePath: basePath,
  images: isStaticExport ? {
    unoptimized: true
  } : {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
