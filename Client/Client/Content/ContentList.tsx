import React, { useState } from "react";
import { useEffect } from "reactn";
import { AppContextType } from "../../../Utils/Types";
import { PublisherSiteType } from "../Types";
import PublisherContentDetail from "./ContentDetail";

const PublisherContentList: React.FC<{
  context: AppContextType;
  match: { params: { detailId } };
  models;
  slugKeys: {};
  site: PublisherSiteType;
}> = ({
  context,
  match: {
    params: { detailId },
  },
  models,
  site,
  slugKeys,
}) => {
  // Vars
  const [content, setContent] = useState<{ label: string; id: string }[]>([]);
  const modelKey = slugKeys[detailId];

  // Lifecycle
  useEffect(() => {
    context.getObjects(models[modelKey].key, {}, (response) => {
      const list: { label: string; id: string }[] = [];
      response.data.map((data) => {
        list.push({ label: data.data[models[modelKey].primary], id: data._id });
      });
      setContent(list);
    });
  }, [modelKey]);

  // UI
  return (
    <context.UI.Layouts.ListDetailLayout
      context={context}
      baseUrl={`/publisher/${site.data.key}/content/${detailId}`}
      list={content}
      DetailComponent={PublisherContentDetail}
      title={models[modelKey].name_plural}
      navWidth={4}
      detailComponentProps={{ model: models[modelKey], site }}
    />
  );
};

export default PublisherContentList;
