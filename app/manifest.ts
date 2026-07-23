import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Toilet as a Service",
    short_name: "T/AAS",
    description:
      "Watch 12 seconds. Unlock 4 minutes. An interactive product satire about attention-funded infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#3155f5",
    orientation: "portrait-primary",
    categories: ["entertainment", "art", "utilities"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
