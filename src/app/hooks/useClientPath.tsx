"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useClientPath() {
  const { asPath } = useRouter();
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(asPath);
  }, [asPath]);

  return path;
}
