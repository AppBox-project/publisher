import React from "react";
import { AppContextType, ModelType } from "../../../Utils/Types";
import { PublisherPageType, PublisherSiteType } from "../Types";

const PublisherPageDetail: React.FC<{
  context: AppContextType;
  match: { params: { detailId } };
  site: PublisherSiteType;
  pages: { [id: string]: PublisherPageType };
  model: ModelType;
}> = ({
  context,
  match: {
    params: { detailId },
  },
  site,
  pages,
  model,
}) => {
  // Vars
  const page = pages[detailId];

  // Lifecycle

  // UI
  if (!page) return <context.UI.Loading />;
  return (
    <context.UI.Object.Detail
      context={context}
      object={page}
      objectId={page._id}
      model={model}
      baseUrl={`/publisher/${site.data.key}/pages/${detailId}`}
      layoutId="default"
    />
  );
};

export default PublisherPageDetail;
