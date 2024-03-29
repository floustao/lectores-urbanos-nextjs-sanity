import '~/styles/global.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import { Lato } from 'next/font/google'
import Head from 'next/head'
import { lazy } from 'react'

import { ChakraProviders } from '~/components/ChakraProvider'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <Head>
        <title>Lectores urbanos, primera biblioteca de Mexico</title>
        <meta
          name="description"
          content="Una empresa social que tiene como objetivo incentivar el pensamiento crítico; teniendo como estrategia central el fomento del hábito de la lectura, el arte y los valores sociales."
        />
      </Head>
      <ChakraProviders>
        <div className={lato.className}>
          {draftMode ? (
            <PreviewProvider token={token}>
              <Component {...pageProps} />
            </PreviewProvider>
          ) : (
            <Component {...pageProps} />
          )}
          <SpeedInsights />
        </div>
      </ChakraProviders>
    </>
  )
}
