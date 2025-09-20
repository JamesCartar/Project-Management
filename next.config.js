/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["bcrypt"]
	},
	typescript: {
		ignoreBuildErrors: true
	},
	eslint: {
		ignoreBuildErrors: true
	}
};

module.exports = nextConfig;
