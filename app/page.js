import Image from 'next/image'
import Layout from '@/components/Layout'
export default function Home() {
  return (
    <Layout>

      <div className='w-full p-4'>
        <h1 className='w-full py-6 text-3xl text-center'>Welcome</h1>
        <div className='w-full md:w-9/12 lg:w-2/3 mx-auto'>
          <img className='w-full h-full' src="/images/landing/landing.png" alt="Landing picture" />
        </div>
      </div>
    </Layout>
  )
}
