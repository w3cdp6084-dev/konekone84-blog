"use client";
import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import './globals.css';
import { Inter } from 'next/font/google';
import Provider from "./Provider";
import Header from "./components/Header";
import "./sass/reset.scss";
import LoadingAnimation from './components/LoadingAnimation';

const inter = Inter({ subsets: ['latin'] });

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <html lang="ja">
      <body>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <Provider>
            <ThreeBackground />
            <Header />
            {children}
          </Provider>
        )}
      </body>
    </html>
  );
}
