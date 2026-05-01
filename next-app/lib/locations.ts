export type Location = {
  slug: string
  name: string
  status: "open" | "coming-soon"
  addressLines: string[]
  coordinates?: string
  googleMapsUrl?: string
}

export const locations: Location[] = [
  {
    slug: "brampton",
    name: "Brampton",
    status: "open",
    addressLines: [
      "18 Kensington Road",
      "Unit 200 and Unit 502",
      "Brampton, ON  L6T 4S5",
    ],
    coordinates: "43.7315° N, 79.7624° W",
    googleMapsUrl:
      "https://www.google.com/maps/search/18+Kensington+Road,+Brampton,+ON+L6T+4S5",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    status: "open",
    addressLines: [
      "25 Charlton Avenue East",
      "Unit 101",
      "Hamilton, ON  L8N 1Y2",
    ],
    coordinates: "43.2557° N, 79.8711° W",
    googleMapsUrl:
      "https://www.google.com/maps/search/25+Charlton+Avenue+East,+Hamilton,+ON+L8N+1Y2",
  },
  {
    slug: "toronto",
    name: "Toronto",
    status: "coming-soon",
    addressLines: ["Coming soon"],
  },
  {
    slug: "guelph",
    name: "Guelph",
    status: "coming-soon",
    addressLines: ["Coming soon"],
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}
