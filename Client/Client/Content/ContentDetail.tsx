import React from "react";
import { AppContextType, ModelType } from "../../../Utils/Types";
import { PublisherSiteType } from "../Types";

const PublisherContentDetail: React.FC<{
  context: AppContextType;
  match: { params: { detailId } };
  model: ModelType;
  site: PublisherSiteType;
}> = ({
  context,
  match: {
    params: { detailId },
  },
  model,
  site,
}) => {
  // Vars

  // Lifecycle

  // UI
  return (
    <context.UI.Object.Detail
      objectId={detailId}
      model={model}
      baseUrl={`/publisher/${site.data.key}/content/${detailId}/${detailId}`}
      layoutId="default"
      context={context}
    />
  );
};

export default PublisherContentDetail;
