import { Recommendation } from "./types"

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

  "recommendations.intro":
    "What people I have worked and studied with have said about me. Most of these come from LinkedIn, where you can read them in full.",
}

export const DEFAULT_RECOMMENDATIONS: Recommendation[] = []

/** Mark's own LinkedIn profile, shared by the footer and the Recommendations page. */
export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/mark-cockerill-5312892a1/"
