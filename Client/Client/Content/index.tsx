import React from "react";
import { useEffect, useState } from "reactn";
import { AppContextType } from "../../../Utils/Types";
import { PublisherSiteType } from "../Types";
import PublisherContentList from "./ContentList";
import { map } from "lodash";

const PublisherContent: React.FC<{ action; context: AppContextType }> = ({
  action,
  context,
}) => {
  // Vars
  const [site, setSite] = useState<PublisherSiteType>();
  const [contentTypeList, setContentTypeList] = useState<any>([]);
  const [models, setModels] = useState<{}>();
  const [slugKeys, setSlugKeys] = useState<{}>();

  // Lifecycle
  useEffect(() => {
    const request = context.getObjects(
      "publisher-sites",
      { "data.key": action.split("/")[0] },
      (response) => {
        if (response.success) {
          setSite(response.data[0]);
          const list = [];
          const modelIds = [];
          const newSlugKeys = {};
          const newKeySlugs = {};
          map(response.data[0].data.data, (value, key) => {
            newSlugKeys[key] = response.data[0].data.data[key].model;
            newKeySlugs[response.data[0].data.data[key].model] = key;
            modelIds.push(response.data[0].data.data[key].model);
          });
          context.getModels({ key: { $in: modelIds } }, (response) => {
            const newModels = {};

            response.data.map((model) => {
              newModels[model.key] = model;
              list.push({
                id: newKeySlugs[model.key],
                label: model.name_plural,
                icon: model.icon,
              });
            });
            setModels(newModels);
            setSlugKeys(newSlugKeys);
          });
          setContentTypeList(list);
        } else {
          console.log(response);
        }
      }
    );

    return () => request.stop();
  }, []);

  // UI
  if (!site || !models || !slugKeys) return <context.UI.Loading />;

  return (
    <context.UI.Layouts.ListDetailLayout
      list={contentTypeList}
      DetailComponent={PublisherContentList}
      baseUrl={`/publisher/${action}`}
      context={context}
      title="Content"
      navWidth={3}
      detailComponentProps={{ models, site, slugKeys }}
    />
  );
};

export default PublisherContent;
