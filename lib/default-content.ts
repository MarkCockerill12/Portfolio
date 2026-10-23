import { ImpactCaseStudy, Recommendation } from "./types"

/**
 * Fallback copy for every admin-editable text block, keyed by the id passed to
 * `<EditableText>`. Edits are saved to `content[id]` in `portfolio.json`; until
 * a block is edited, the text here is shown.
 */
export const DEFAULT_CONTENT: Record<string, string> = {
  "home.intro":
    "Welcome to my portfolio! I'm a computer science student with a passion for coding, art and gaming. More projects will be added with time as some are work in progress.",

  "about.intro":
    "Hello! My name is Mark, and I am 21 years old. I am a fourth year Computing Science student at Dundee University. I am an enthusiastic and bubbly person who enjoys working with people and helping others. Due to my upbringing, religion and a supportive family who encourage my interests, I always strive to make the most out of any situation and work with determination resulting in a positive outcome.",
  "about.experience":
    "Working throughout my academic life has broadened my experiences and has given me new opportunities to learn. I have built up my communication skills to foster good relationships between lecturers and fellow students which has translated well into retail settings and enabled me to work efficiently in a group. I am very driven to complete work assigned to me and I can seek out ways to research more about any given topic using online materials. I am good at making decisions and thinking clearly under pressure, examples being effectively managing university work between group members with upcoming deadlines and navigating cooperation issues.",

  "hobby.gaming":
    "Games such as the Dark Souls trilogy require high attention to detail, problem solving and consistent determination to complete and understand. Other games such as Minecraft allow for creativeness to be explored, and multiplayer games allow for communicating and teamwork to be utilised.",
  "hobby.drawing":
    "This encourages creativity and requires dedication and practice in order to improve. It develops attention to detail skills as studying anatomy and light shading/reflecting is implemented.",
  "hobby.digital-art":
    "Alongside physical drawing, this encourages creativity and requires dedication and practice in order to improve. This is based also on the ability to adapt and learn to a new medium of art, utilising digital aspects to reach new heights.",
  "hobby.animating":
    "I mainly use 3D software such as Blender, although I have created multiple 2D frame by frame animations. These require lots of patience and tie into creative skills in order to bring a vision to life. Problem solving skills are crucial as things never go as intended.",
  "hobby.programming":
    "Outside of academic purposes, I enjoy coding as it helps test all of my prior knowledge and expand upon it. I have worked on creating games, websites, visual novels, simple scripts, decryptions and fun messages to send to friends.",
  "hobby.music":
    "I find myself listening to music whenever in transit whether it be walking or by vehicle, it allows me to escape into a different world and keep me upbeat for whatever life has in store for me.",
  "hobby.reading":
    "Reading also provides an escape into a new world by allowing my creative ability to construct the image the book presents into my head.",
  "hobby.religious-study":
    "Reading the bible and other sources regarding Christianity helps me to navigate aspects of my life and improve my ability to communicate with others about it",

  "value.intro":
    "The things I build are meant to save people time. This page puts numbers on that: hours handed back, what those hours are worth, and what the people using my work said about it. Every figure says where it comes from, so you can judge it for yourself.",

  "recommendations.intro":
    "What people I have worked and studied with have said about me. Most of these come from LinkedIn, where you can read them in full.",
}

export const DEFAULT_IMPACT: ImpactCaseStudy[] = [
  {
    id: "insights-sales-agent",
    title: "AI Sales Support Agent",
    organisation: "Insights",
    period: "2026 pilot",
    summary:
      "An AI agent that gathers what a salesperson needs to know about an account from many different sites and writes it up as a call sheet and a full account plan. Work that usually took hours of searching now arrives as one document, ready before the call.",
    stats: [
      { value: "90%", label: "of pilot users found it valuable", detail: "9 of 10 survey respondents" },
      { value: "73.9 min", label: "saved on every account prepared", detail: "30.6 min per call sheet + 43.3 min per account plan" },
      { value: "605.9 hrs", label: "handed back per salesperson, per year", detail: "123 accounts a quarter, each prepared once a quarter" },
      { value: "£12,693", label: "value of that time, per salesperson, per year", detail: "at an assumed £36,870 salary (£20.95 an hour)" },
      { value: "£172,128", label: "sales capacity freed, per salesperson, per year", detail: "if the hours go back into selling at a £500,000 target; £43,032 at 25%" },
    ],
    scenarios: [
      { scale: "One salesperson", hours: "605.9", value: "£12,693", revenue: "£172,128" },
      { scale: "UK team (10 people)", hours: "6,058.9", value: "£126,927", revenue: "£1,721,275" },
      { scale: "Global (100 people)", hours: "60,588.9", value: "£1,269,268", revenue: "£17,212,753" },
    ],
    quotes: [
      { text: "I just want my whole team to have it :) thank you", author: "Sales Leader" },
      { text: "Having detailed account information at your fingertips saves time and adds value to client conversations.", author: "Pilot user" },
      { text: "The tool pulls together information from various sites into one, useful document.", author: "Pilot user" },
      { text: "The account plan was a great base and gave all of the information that would usually take hours to find.", author: "Pilot user" },
    ],
    footnote:
      "Time savings are self-reported by 10 pilot users. The money figures are models, not cash saved: time value uses an assumed salary over 220 eight-hour days, and sales capacity assumes the freed hours go back into selling at a starting-level £500,000 target. The two are separate measures and should not be added together. Build, licence and support costs are not included.",
  },
]

export const DEFAULT_RECOMMENDATIONS: Recommendation[] = []

/** Mark's own LinkedIn profile, shared by the footer and the Recommendations page. */
export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/mark-cockerill-5312892a1/"
