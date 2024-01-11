import { parse } from "node-html-parser";
import { saveContent } from "./fsutils.js";
import fs from "fs";

const baseUrl = "https://www.lostinstpete.org";
const lineupUrl = `${baseUrl}/full-lineup`;

export async function fetchArtistsUrls() {
  const response = await fetch(lineupUrl);
  const text = await response.text();
  const document = parse(text);

  const anchors = document.querySelectorAll("a");
  const dataUrlAnchors = Array.from(anchors).filter((anchor) =>
    anchor.hasAttribute("data-url"),
  );

  const artistUrls = new Set();
  for (const anchor of dataUrlAnchors) {
    const dataUrl = anchor.getAttribute("data-url");
    if (
      dataUrl.startsWith("/full-lineup/") ||
      dataUrl.startsWith("/headliners/")
    ) {
      artistUrls.add(`${baseUrl}${dataUrl}`);
    }
  }
  // Convert to an array
  return Array.from(artistUrls);
}

export const getArtists = () => {
  const artists = fs.readFileSync(".lisp-data\\artist-urls.json", "utf8");
  return JSON.parse(artists);
};

const outputIndex = process.argv.indexOf("--output");
if (outputIndex > -1 && process.argv[outputIndex + 1]) {
  fetchArtistsUrls().then((artists) => {
    const fileName = process.argv[outputIndex + 1];
    saveContent(fileName, artists);
  });
}
