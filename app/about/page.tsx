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
          Hello! My name is Mark, and I am 19 years old. I am a third year Computing Science student at Dundee University seeking to gain experience working within a professional environment to allow me to develop my skillset. I am an enthusiastic and bubbly person who enjoys working with people and helping others. Due to my upbringing, religion and a supportive family who encourage my interests, I always strive to make the most out of any situation and work with determination resulting in a positive outcome.
          </p>
          <p className="mb-4">
            🎮 <span className="font-semibold">As a gamer</span>, I've explored countless virtual worlds and solved puzzles that would make Sherlock Holmes scratch his head. My favorite genres are [your favorite game genres], and I'm always up for a good speedrun challenge.
          </p>
          <p className="mb-4">
          Working throughout my academic life has broadened my experiences and has given me new opportunities to learn. I have built up my communication skills to foster good relationships between lecturers and fellow students which has translated well into retail settings and enabled me to work efficiently in a group. I am very driven to complete work assigned to me and I can seek out ways to research more about any given topic using online materials. I am good at making decisions and thinking clearly under pressure, examples being effectively managing university work between group members with upcoming deadlines and navigating cooperation issues. 
          </p>
          <p className="mb-4">
          I enjoy taking part in sports which help develop my communication, leadership and team working skills. A few examples of this would be regularly attending a night-time basketball club and competing against senior pupils and adults at a council leisure provided badminton club outside of Uni terms. I am also learning a few extra languages (Chinese and Russian) to broaden my knowledge of communication.
          </p>
          <p>
          I have an effective grasp of working with computer programs, I can efficiently use applications like Microsoft apps, CAD inventor and multi-language coding. I annually volunteer to help assist in a week-long children's mission in the northeast of Scotland. This involves utilising my communication skills with other helpers and children. During the week I have several responsibilities such as being in a team leading a specific group of primary pupils through activities as well as being a waiter serving food to multiple families during social events.
          </p>
        </div>
      </div>
    </div>
  )
}

