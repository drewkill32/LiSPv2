import { getCliClient } from "sanity/cli";
import fs from "fs";

const client = getCliClient();

const getArtists = () => {
  //get the artist from the file system
  const artistsList = JSON.parse(
    fs.readFileSync(".lisp-data\\artists.json", "utf8"),
  ).map((path) => JSON.parse(fs.readFileSync(path, "utf8")));
  return artistsList;
};

const migrateDocuments = async (artists) => {
  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i];
    let transaction = client.transaction();
    try {
      console.log(`importing '${artist.name}'...`);
      const pairs = await Promise.all(
        artist.images.map(async (image) => {
          const asset = client.assets.upload(
            "image",
            fs.createReadStream(image.asset),
          );
          return [asset, image];
        }),
      );
      pairs.forEach(([asset, image]) => {
        image.asset = {
          _type: "reference",
          _ref: asset._id,
        };
      });

      client.createOrReplace(artist);
    } finally {
      await transaction.commit();
    }
  }
};

let artists = getArtists();
if (process.argv > 2) {
  artistFilters = process.argv.slice(2);
  artists = artists.filter((artist) =>
    artistFilters.includes(artist.slug.current),
  );
}

migrateDocuments(artists);
