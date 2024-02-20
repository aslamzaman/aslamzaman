export default function Home() {
  return (
    <div className='w-[356px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[336px] lg:h-[448px] mx-auto mt-2 sm:mt-8 md:mt-16 bg-gray-300 bg-cover bg-center bg-no-repeat flex justify-center items-center' style={{ backgroundImage: 'url("/images/landing/landing.png")' }}>
      <h1 className='w-fit text-xl lg:text-3xl font-black text-white uppercase' style={{ textShadow: '0.5px 0.5px 1px #000' }}>Welcome</h1>
    </div>
  )
}
