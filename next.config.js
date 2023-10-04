/** @type {import('next').NextConfig} */
const nextConfig = {}
const withTM = require('next-transpile-modules')(['@chakra-ui/react']);
module.exports = {
    images: {
      domains: ['konekoneblog.assets.newt.so'],
    },
  }
  