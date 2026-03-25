import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";

async function fetchData(lang: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/packages?lang=${lang}`,
    );
    return res.json();
  } catch (err) {
    console.log(err);
    return [];
    // throw err;
  }
}

export default async function page({
  searchParams,
  params,
}: {
  searchParams: { tourId: string };
  params: { lang: string };
}) {
  const { lang } = await params;
  const { tourId } = await searchParams;
  const dataAll: HomeDataType[] = [
    {
      name: "Giza",
      governorate: "giza",
      page: 1,
      packages: [],
      landmarks: [
        {
          description:
            "This famous solid gold mask rested upon Tutankhamun’s mummified remains. It perfectly captures his royal face while transforming him into the gods Osiris and Re, featuring protective divine inscriptions behind.",
          imageUrl: "/imgs/packages/giza/totankhamun.webp",
          title: "Golden mask",
        },
        {
          description:
            "Found inside the Treasury, this pylon-shaped chest rests on a sledge. A striking black and gold Anubis jackal sits atop, guarding hidden compartments filled with sacred objects and precious jewellery.",
          imageUrl: "/imgs/packages/giza/anubis.webp",
          title: "Anubis on a Chest",
        },
        {
          description:
            "This miniature solid gold coffin held the king's mummified organs. Richly decorated with carnelian, coloured glass, and Isis spells, altered cartouches suggest it was originally intended for another royal burial not Tutankhamun.",
          imageUrl: "/imgs/packages/giza/canopic_coffinette.webp",
          title: "Canopic Coffinette",
        },
      ],
    },
    {
      name: "Cairo",
      governorate: "cairo",
      page: 3,
      packages: [],
      landmarks: [
        {
          description:
            "Known as the Alabaster Mosque, this 1848 Turkish-style masterpiece in the Citadel features Egypt’s highest twin minarets and a magnificent central dome built by Muhammad Ali Pasha.",
          imageUrl: "/imgs/packages/cairo/ali.webp",
          title: "Muhammad Ali Mosque",
        },
        {
          description:
            "Ben ‘Ezra is Egypt’s oldest synagogue. It is famous for its Arabesque-decorated hekhal and the historic discovery of the Cairo Geniza, an 850-year-old treasure of rare documents.",
          imageUrl: "/imgs/packages/cairo/m3bd.webp",
          title: "Ben ‘Ezra Synagogue",
        },
      ],
    },
    {
      name: "Alex",
      governorate: "alexandria",
      page: 5,
      packages: [],
      landmarks: [
        {
          description:
            "Built over the ruins of Alexandria’s ancient Lighthouse in 1477, Qaitbay Citadel is a massive limestone Mediterranean fortress featuring defensive towers, a courtyard, and an iconic three-floored main tower.",
          imageUrl: "/imgs/packages/alex/castel.webp",
          title: "Qaitbay Fort",
        },
        {
          description:
            "Located in Alexandria, this 4th-century U-shaped Roman amphitheatre served as an auditorium and Byzantine city council. It features limestone walls, marble seating, and striking granite columns.",
          imageUrl: "/imgs/packages/alex/masr7.webp",
          title: "Roman Theatre",
        },
      ],
    },
    {
      name: "Nile Cruise",
      page: 7,
      governorate: "nile",
      packages: [],
      landmarks: [
        {
          description:
            "Experience the magic of the Nile in the heart of Cairo aboard an unforgettable cruise. Discover the capital's beauty and historic landmarks under a starry sky, complete with a luxurious dinner and an authentic Egyptian ambiance. A truly magical journey awaits!",
          imageUrl: "/imgs/packages/nile/nile1.webp",
          title: "Nile Cruise",
        },
        {
          description:
            "Experience the magic of the Nile in the heart of Cairo aboard an unforgettable cruise. Discover the capital's beauty and historic landmarks under a starry sky, complete with a luxurious dinner and an authentic Egyptian ambiance. A truly magical journey awaits!",
          imageUrl: "/imgs/packages/nile/nile2.webp",
          title: "Nile Cruise",
        },
      ],
    },
  ];

  const { data = [] } = await fetchData(lang);
  const updatedData = dataAll.map((section) => {
    const filteredPackages = data.filter((pkg: any) =>
      pkg.governorate.toLowerCase().includes(section.governorate.toLowerCase()),
    );

    return {
      ...section,
      packages: filteredPackages,
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Home data={updatedData} tourId={tourId} />
    </div>
  );
}
