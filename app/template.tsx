'use client';
import Layout from './_components/Transition';
import { PropsWithChildren } from 'react';

export default function rootTemplate({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>;
}
