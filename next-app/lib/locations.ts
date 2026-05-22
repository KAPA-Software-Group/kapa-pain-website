export type Location = {
  slug: string
  name: string
  status: "open" | "coming-soon"
  addressLines: string[]
  coordinates?: string
  googleMapsUrl?: string
  phone?: string
  email?: string
}

export const SHARED_FAX = "289-800-9399"

export const locations: Location[] = [
  {
    slug: "brampton",
    name: "Brampton",
    status: "open",
    addressLines: [
      "18 Kensington Road",
      "Unit 200",
      "Brampton, ON  L6T 4S5",
    ],
    coordinates: "43.7315° N, 79.7624° W",
    googleMapsUrl:
      "https://www.google.com/maps/search/18+Kensington+Road,+Brampton,+ON+L6T+4S5",
    phone: "289-752-9388",
    email: "brampton@precisioncare.ca",
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
    phone: "289-674-822",
    email: "hamilton@precisioncare.ca",
  },
  {
    slug: "guelph",
    name: "Guelph",
    status: "open",
    addressLines: [
      "21 Surrey Street West",
      "Suite 202",
      "Guelph, ON  N1H 3R3",
    ],
    coordinates: "43.5448° N, 80.2482° W",
    googleMapsUrl:
      "https://www.google.com/maps/search/21+Surrey+Street+West,+Guelph,+ON+N1H+3R3",
    phone: "519-265-9622",
    email: "guelph@precisioncare.ca",
  },
  {
    slug: "toronto",
    name: "Toronto",
    status: "coming-soon",
    addressLines: ["Coming soon"],
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}
