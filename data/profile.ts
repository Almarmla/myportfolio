export interface Profile {
  name: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  photo: string;
  cvUrl: string;
  bio: string;
}

export const profile: Profile = {
  name: "Almar Mlambo",
  tagline: "IT Student building software for local communities",
  location: "Zimbabwe",
  email: "mlamboalmar97@gmail.com",
  github: "https://github.com/Almarmla",
  linkedin: "https://linkedin.com/in/almar-mlambo",
  photo: "/images/profile.jpg",
  cvUrl: "/cv.pdf",
  bio: "I’m an IT student at Masvingo Polytechnic. I’m passionate about developing accessible software for local communities using C# and Next.js.",
};
