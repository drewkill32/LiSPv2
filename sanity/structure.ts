import type { StructureResolver, StructureBuilder } from "sanity/desk";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings Documents")
            .items([
              S.listItem()
                .title("Metadata")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings"),
                ),
              orderableDocumentListDeskItem({
                type: "sponsor",
                S,
                context,
                title: "Sponsors",
              }),
            ]),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings", "sponsor"].includes(listItem.getId()!),
      ),
    ]);
