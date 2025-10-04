import { IconCloud } from "./ui/icon-cloud";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiSass,
  SiCss3,
  SiNodedotjs,
  SiMysql,
  SiFigma,
  SiAdobephotoshop,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";
import {
  Code,
  Palette,
  Wrench,
  Database,
  Smartphone,
  Brain,
} from "lucide-react";

const SkillsIconCloud = () => {
  const icons = [
    // Frontend Development
    <SiReact size={100} color="#61DAFB" />,
    <SiJavascript size={100} color="#F7DF1E" />,
    <SiTypescript size={100} color="#3178C6" />,
    <SiNextdotjs size={100} color="#000000" />,

    // Styling & Design
    <SiTailwindcss size={100} color="#06B6D4" />,
    <SiSass size={100} color="#CC6699" />,
    <SiCss3 size={100} color="#1572B6" />,
    <Palette size={100} color="#8B5CF6" />,

    // Tools & Workflow
    <SiGit size={100} color="#F05032" />,
    <SiGithub size={100} color="#181717" />,
    <SiVite size={100} color="#646CFF" />,
    <Wrench size={100} color="#10B981" />,

    // Backend Basics
    <SiNodedotjs size={100} color="#339933" />,
    <Database size={100} color="#4479A1" />,
    <SiMysql size={100} color="#4479A1" />,
    <Code size={100} color="#FF6B35" />,

    // Design & UX
    <SiAdobephotoshop size={100} color="#31A8FF" />,
    <SiFigma size={100} color="#F24E1E" />,
    <Smartphone size={100} color="#A855F7" />,
    <Palette size={100} color="#EC4899" />,

    // Soft Skills
    <Brain size={100} color="#8B5CF6" />,
    <Code size={100} color="#06B6D4" />,
    <Wrench size={100} color="#F59E0B" />,
    <Smartphone size={100} color="#10B981" />,
  ];

  return (
    <div className="relative flex size-full max-w-4xl items-center justify-center overflow-hidden rounded-lg bg-transparent">
      <IconCloud icons={icons} radius={185} />
    </div>
  );
};

export default SkillsIconCloud;
