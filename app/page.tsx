import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-press-start-2p">Welcome!</h1>
        <h2 className="text-2xl md:text-3xl mb-8 text-blue-500 dark:text-blue-400"></h2>
        <div className="flex justify-center space-x-4 mb-8">
          <Image src="/placeholder.svg" alt="Gaming Icon" width={64} height={64} className="rounded-lg" />
          <Image src="/placeholder.svg" alt="Art Icon" width={64} height={64} className="rounded-lg" />
          <Image src="/placeholder.svg" alt="Code Icon" width={64} height={64} className="rounded-lg" />
          <Image src="/placeholder.svg" alt="Creative Icon" width={64} height={64} className="rounded-lg" />
        </div>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Welcome to my portfolio! I'm a computer science student with a passion for gaming, art, and coding.
        </p>
        <Link href="/projects" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Explore My Projects
        </Link>
      </div>
    </div>
  )
}

