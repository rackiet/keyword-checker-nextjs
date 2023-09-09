
import AppLogic from '@/components/AppLogic'
import Header from '@/components/Header'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'KC : Aplikasi Keyword Checker',
  }

export default function Home() {

  return (
    <>
        <Header></Header>
        <AppLogic></AppLogic>
    </>
  )
}
