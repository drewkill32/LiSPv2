import type { ImageAsset, PortableTextBlock, Slug } from "sanity";
import { sanityClient } from "sanity:client";

export async function getArtists(): Promise<Artist[]> {
  return await sanityClient.fetch(`*[_type == "artist"] | order(name)`);
}

export async function getArtistList(): Promise<ArtistListItem[]> {
  return await sanityClient.fetch(
    '*[_type == "artist"]{name, "slug": slug.current, "image": images[0]} | order(name)',
  );
}

export interface ArtistListItem {
  name: string;
  slug: string;
  image: ImageAsset;
}

export interface Artist {
  _type: "artist";
  _createdAt: string;
  name: string;
  location: string | undefined;
  slug: Slug;
  images: ImageAsset[];
  bio: PortableTextBlock[];
}
