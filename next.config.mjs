/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  redirects() {
    console.log('----------aaaaaaaaa----------');
    return [{ source: '/aaa', destination: '/sign-in', permanent: true }];
  }
};

export default nextConfig;
// export default (phase, { defaultConfig }) => {
//   /** @type {import('next').NextConfig} */
//   const nextConfig = {};

//   return nextConfig;
// };
