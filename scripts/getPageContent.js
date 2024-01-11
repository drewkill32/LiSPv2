import { parse } from "node-html-parser";
import path from "path";
import slugify from "slugify";
import { saveContent, ensureDir } from "./fsutils.js";
import crypto from "crypto";
import { getArtists } from "./getArtistUrls.js";
import fs from "fs";

function getHash(text) {
  return crypto.createHash("md5").update(text).digest("hex").slice(0, 10);
}

async function saveToFile(url, fileName) {
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(`Unable to get image from '${url}'. Status: ${res.status}`);
  }
  const blob = await res.blob();
  const ext = blob.type.split("/")[1];
  const fullFileName = `${fileName}.${ext}`;
  const fileStream = fs.createWriteStream(fullFileName);
  const reader = blob.stream().getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      fileStream.end();
      break;
    }
    fileStream.write(value);
  }
  return fullFileName;
}

function getArtistName(document) {
  const h1 = document.querySelector("h1");
  if (h1) {
    return h1.textContent.trim();
  }
  throw new Error("No h1 tag found. Unable to get artist name.");
}

function getBioElement(document) {
  const elements = Array.from(document.querySelectorAll("body *"));
  const bioElement = elements.find(
    (element) =>
      element.textContent.trim().toUpperCase() === "bio".toUpperCase(),
  );
  if (bioElement) {
    const parentSection = bioElement.closest("section");
    const parent = bioElement.parentNode;
    const children = Array.from(parent.childNodes).filter(
      (child) => child !== bioElement,
    );
    const pTextBlocks = children
      .map((child) => {
        let textContent = child.textContent.trim();
        if (textContent.startsWith('"')) {
          textContent = textContent.slice(1);
        }
        if (textContent.endsWith('"')) {
          textContent = textContent.slice(0, -1);
        }
        //get a hash of the textContent

        if (textContent.length > 0) {
          return {
            _type: "block",
            _key: `${getHash(parent.textContent)}_${getHash(textContent)}`,
            children: [
              {
                _type: "span",
                _key: getHash(textContent),
                marks: [],
                text: textContent.trim(),
              },
            ],
            markDefs: [],
          };
        }
      })
      .filter(Boolean);
    return [pTextBlocks, parentSection.getAttribute("id")];
  }
  //get the last section on the page
  const sections = document.querySelectorAll("section");
  const lastSection = sections[sections.length - 1];

  return [null, lastSection.getAttribute("id")];
}

function getYouTubeUrl(document) {
  var iframes = document.getElementsByTagName("iframe");

  if (iframes.length > 0) {
    const iframe = iframes[0];
    var src = iframe.getAttribute("src");
    if (src?.includes("youtube")) {
      return src;
    }
  }
}

async function getImgs(section, dirName, slug) {
  var imgs = section.getElementsByTagName("img");

  const isSocial = (img) => img.parentNode.tagName.toUpperCase() === "A";

  const socialLinks = imgs.filter(isSocial).map((img) => {
    const href = img.parentNode.getAttribute("href");
    const url = getUrlFromGoogle(href);
    let socialType = "Website";
    if (url.toLowerCase().includes("facebook")) {
      socialType = "Facebook";
    }
    if (url.toLowerCase().includes("instagram")) {
      socialType = "Instagram";
    }
    if (url.toLowerCase().includes("twitter")) {
      socialType = "Twitter";
    }
    if (url.toLowerCase().includes("soundcloud")) {
      socialType = "Soundcloud";
    }
    if (url.toLowerCase().includes("bandcamp")) {
      socialType = "Bandcamp";
    }
    if (url.toLowerCase().includes("youtube")) {
      socialType = "Youtube";
    }

    let link = {
      socialUrl: url,
      socialType: socialType,
      _key: getHash(url),
    };

    if (link.socialType === "Website") {
      link.socialText = "Website";
    }
    return link;
  });

  const imgUrls = await Promise.all(
    imgs
      .filter((img) => !isSocial(img))
      .map(async (img, idx) => {
        const url = img.getAttribute("src");
        const dir = path.join(dirName, slug);
        ensureDir(dir);
        let filePath = path.join(dir, `${slug}-${idx + 1}`);
        filePath = await saveToFile(url, filePath);
        const fullPath = path.resolve(filePath);
        return {
          asset: fullPath,
          alt: img.getAttribute("alt"),
          _type: "image",
          _key: getHash(url),
        };
      }),
  );
  return [imgUrls, socialLinks];
}

function getUrlFromGoogle(googleUrl) {
  if (!googleUrl?.startsWith("https://www.google.com/url")) {
    return googleUrl;
  }
  const fullUrl = new URL(googleUrl);
  const params = new URLSearchParams(fullUrl.search);
  const url = params.get("q");
  if (!url) {
    throw new Error("Unable to get url from google url");
  }
  return url;
}

export default async function fetchArtist(lineupUrl, dirName) {
  const response = await fetch(lineupUrl);
  if (response.status !== 200) {
    throw new Error(
      `Unable to get artist content from '${lineupUrl}'. Status: ${response.status}`,
    );
  }
  const text = await response.text();
  const document = parse(text);
  const name = getArtistName(document);
  const slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g });
  const [bioElements, sectionId] = getBioElement(document);
  if (!sectionId) {
    throw new Error("Unable to find section parent for bio");
  }
  const section = document.getElementById(sectionId);

  const [images, socials] = await getImgs(section, dirName, slug);
  const youtubeUrl = getYouTubeUrl(document);

  const artist = {
    _id: `lisp-${slug}`,
    _type: "artist",
    name: name,
    slug: { _type: "slug", current: slug },
    bio: bioElements ? bioElements : undefined,
    images,
    socials,
    youtubeUrl,
  };
  return artist;
}

const updateArtistsJson = (dirName, artistJsonFileName) => {
  //go up a directory
  dirName = path.join(dirName, "..");
  //make sure the file exists

  const fileName = path.join(dirName, "artists.json");
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, "[]");
  }
  const json = fs.readFileSync(fileName, "utf8");
  const prevArtistsJson = JSON.parse(json);
  //convert to a set to remove duplicates
  const artistSet = new Set(prevArtistsJson);
  artistSet.add(artistJsonFileName);
  const artistsJson = Array.from(artistSet);
  //sort the array
  artistsJson.sort();
  //save the array
  saveContent(fileName, artistsJson);
};

const exportIndex = process.argv.indexOf("--export");
if (exportIndex > -1 && process.argv[exportIndex + 1]) {
  const dirName = process.argv[exportIndex + 1];
  const artists = getArtists().slice(34, 35);
  artists.forEach((lineupUrl) => {
    console.log(`Fetching ${lineupUrl}`);
    fetchArtist(lineupUrl, dirName).then((artist) => {
      const artistDir = path.join(dirName, artist.slug.current);
      ensureDir(artistDir);
      const fileName = path.join(artistDir, `${artist.slug.current}.json`);
      saveContent(fileName, artist);
      updateArtistsJson(dirName, fileName);
    });
  });
}
