import Image from 'next/image'
import React from 'react'

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 font-press-start-2p">About Me</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <Image
          src="/placeholder.svg"
          alt="Profile Picture"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <div className="max-w-2xl">
          <p className="mb-4">
            Hey there! I'm [Your Name], a computer science student with a twist. I'm not just about algorithms and data structures (though I love those too!) – I'm a digital Renaissance person, blending the worlds of gaming, art, and coding into something uniquely me.
          </p>
          <p className="mb-4">
            🎮 <span className="font-semibold">As a gamer</span>, I've explored countless virtual worlds and solved puzzles that would make Sherlock Holmes scratch his head. My favorite genres are [your favorite game genres], and I'm always up for a good speedrun challenge.
          </p>
          <p className="mb-4">
            🎨 <span className="font-semibold">My artistic side</span> comes alive through digital art and 3D modeling. I love creating vibrant, eye-catching designs that tell a story. You'll often find me sketching UI concepts for imaginary apps or bringing game characters to life through fan art.
          </p>
          <p className="mb-4">
            💻 <span className="font-semibold">When it comes to coding</span>, I'm all about creative solutions. I love building interactive web experiences, game mods, and quirky apps that make people smile. My goal is to blend functionality with fun, creating software that's not just useful, but also delightful to use.
          </p>
          <p>
            When I'm not immersed in pixels or code, you can find me [your hobbies or interests]. I believe that the best ideas come from diverse experiences, and I'm always looking for new ways to combine my passions into exciting projects.
          </p>
        </div>
      </div>
    </div>
  )
}

