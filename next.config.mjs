/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/rutas/:path*",
        destination: "/senderosur/rutas/:path*",
        permanent: true,
      },
      {
        source: "/hospedajes/:path*",
        destination: "/senderosur/hospedajes/:path*",
        permanent: true,
      },
      {
        source: "/perfil",
        destination: "/senderosur/perfil",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
