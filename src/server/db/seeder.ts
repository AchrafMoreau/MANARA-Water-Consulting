import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const fetchCategory = await prisma.category.findMany();

  if (fetchCategory.length === 0) {
    throw new Error("No categories found. Please seed categories first.");
  }
  const projects = Array.from({ length: 20 }).map((_, index) => {
    const randomCategory = fetchCategory[Math.floor(Math.random() * fetchCategory.length)];

    return {
      title: "Water Infrastructure Upgrade",
      thumbnail: "water_consulting.jpg",
      image: ["infra1.jpg", "infra2.jpg"],
      client: "City of Agadir",
      location: "Agadir, Morocco",
      commenced: "2022-05-10",
      completion: "2023-09-15",
      categoryId: randomCategory.id,
      description: "The Water Infrastructure Upgrade project focused on modernizing the city's aging pipeline system to improve water quality, reduce waste, and enhance supply efficiency. By implementing advanced leak detection systems, upgrading outdated piping materials, and integrating smart monitoring technology, we ensured that water loss due to infrastructure failures was significantly minimized. The project also included comprehensive assessments of pressure points, identifying weak areas prone to bursts and corrosion, followed by targeted replacements and reinforcements.",
      solution: "Our solution involved deploying high-density polyethylene (HDPE) pipes, known for their durability and resistance to corrosion. Additionally, we introduced AI-driven predictive maintenance tools that analyze flow rates and pressure variations in real time, allowing for proactive issue resolution before critical failures occur. We also worked closely with the municipality to create an ongoing maintenance plan, ensuring sustainable infrastructure performance for years to come.",
      impact: "This upgrade drastically improved water accessibility and reduced wastage by 30%, benefiting over 500,000 residents. The city's response to seasonal droughts has significantly improved, with a notable decrease in emergency maintenance costs. Furthermore, the modernization efforts have led to a reduction in service disruptions, ensuring households and businesses have a reliable water supply throughout the year.",
    }
  })

  // const jobs = [
  //   {
  //     title: "Water Resource Engineer",
  //     department: "Engineering",
  //     location: "Riyadh, Saudi Arabia",
  //     urgent: true,
  //     IndeedUrl: "https://ma.indeed.com/viewjob?jk=843ecb495d6c416a&from=shareddesktop_copy",
  //     description:
  //       "We're looking for a Water Resource Engineer to join our team in Riyadh. You'll be responsible for designing and implementing sustainable water management solutions for urban and rural areas. The ideal candidate has experience with hydrological modeling and a passion for conservation.",
  //     employmentType: "FULL_TIME",
  //   },
  //   {
  //     title: "Environmental Consultant",
  //     department: "Environmental",
  //     location: "Jeddah, Saudi Arabia",
  //     urgent: false,
  //     IndeedUrl: "https://ma.indeed.com/viewjob?jk=6bd0bbe6dc570da2&from=shareddesktop_copy",
  //     description:
  //       "Join our environmental team to conduct impact assessments, develop mitigation strategies, and ensure compliance with local and international regulations. You'll work closely with government agencies and private sector clients on diverse projects throughout the region.",
  //     employmentType: "CONTRACT",
  //   },
  //   {
  //     title: "Project Manager",
  //     department: "Management",
  //     location: "Riyadh, Saudi Arabia",
  //     urgent: false,
  //     IndeedUrl: "https://ma.indeed.com/viewjob?jk=1e8a550db06e3445&from=shareddesktop_copy",
  //     description:
  //       "Lead cross-functional teams in the planning and execution of water infrastructure projects. You'll be responsible for budget management, timeline adherence, and stakeholder communication. We're looking for someone with a proven track record of delivering complex projects on time and within budget.",
  //     employmentType: "PART_TIME",
  //   },
  // ]

  // await prisma.offer.createMany({
  //   data: jobs
  // })

  // console.log("✅ Database seeded successfully with long-form data!");
  // return 0;



  // const categories = [
  //   {
  //     name: "Ressources en Eau",
  //     icon: "Droplet",
  //     color: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50",
  //     activeColor: "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500",
  //     translations: {
  //       en: "Water Resources",
  //       fr: "Ressources en Eau",
  //       ar: "الموارد المائية",
  //     },
  //   },
  //   {
  //     name: "Développement Durable",
  //     icon: "Leaf",
  //     color:
  //       "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50",
  //     activeColor: "bg-green-600 text-white border-green-600 dark:bg-green-500 dark:border-green-500",
  //     translations: {
  //       en: "Sustainable Development",
  //       fr: "Développement Durable",
  //       ar: "التنمية المستدامة",
  //     },
  //   },
  //   {
  //     name: "Infrastructures",
  //     icon: "PackageIcon",
  //     color: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700/50",
  //     activeColor: "bg-gray-600 text-white border-gray-600 dark:bg-gray-500 dark:border-gray-500",
  //     translations: {
  //       en: "Infrastructure",
  //       fr: "Infrastructures",
  //       ar: "البنية التحتية",
  //     },
  //   },
  //   {
  //     name: "Protection Inondations",
  //     icon: "Waves",
  //     color: "bg-blue-100 text-blue-500 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
  //     activeColor: "bg-blue-500 text-white border-blue-500 dark:bg-blue-400 dark:border-blue-400",
  //     translations: {
  //       en: "Flood Protection",
  //       fr: "Protection Inondations",
  //       ar: "حماية الفيضانات",
  //     },
  //   },
  //   {
  //     name: "Innovation",
  //     icon: "Lightbulb",
  //     color:
  //       "bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/50",
  //     activeColor: "bg-yellow-500 text-white border-yellow-500 dark:bg-yellow-400 dark:border-yellow-400",
  //     translations: {
  //       en: "Innovation",
  //       fr: "Innovation",
  //       ar: "الابتكار",
  //     },
  //   },
  //   {
  //     name: "Études & Formations",
  //     icon: "GraduationCap",
  //     color:
  //       "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/50",
  //     activeColor: "bg-purple-600 text-white border-purple-600 dark:bg-purple-500 dark:border-purple-500",
  //     translations: {
  //       en: "Studies & Training",
  //       fr: "Études & Formations",
  //       ar: "الدراسات والتكوينات",
  //     },
  //   },
  // ];


  await prisma.project.createMany({
    data: projects
  })
  console.log("✅ Database seeded successfully with long-form data!");

}

// Execute seed function
main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
