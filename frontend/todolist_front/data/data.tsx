export const components: { title: string; href: string; description: string }[] = [
  {
    title: "Low",
    href: "/",
    description:
      "These are standard-priority tasks that should be completed within the regular workflow without expedited processing.",
  },
  {
    title: "Medium",
    href: "/",
    description:
      "These are important tasks that need to be completed within a scheduled period, after high-priority items are resolved but before low-priority ones.",
  },
  {
    title: "High",
    href: "/",
    description:
      "These are critical tasks that demand immediate attention and resources. All other activities should be postponed until these are resolved.",
  },
  {
    title: "Critical",
    href: "/",
    description: "These are emergency-level tasks that halt all other operations. They demand all available resources and must be resolved immediately to prevent catastrophic failure.",
  },
  {
    title:"all",
    href:"/page/task",
    description:"See a complete list of all tasks, filtered by your preferences."
  }
]