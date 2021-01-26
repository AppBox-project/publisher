import React from "react";
import { useEffect, useState } from "reactn";
import { AppContextType, ModelType } from "../../../Utils/Types";
import { PublisherDesignType, PublisherSiteType } from "../Types";
import PublisherMenuDetail from "./PageDetail";

const PublisherMenus: React.FC<{ action; context: AppContextType }> = ({
  action,
  context,
}) => {
  // Vars
  const [site, setSite] = useState<PublisherSiteType>();
  const [design, setDesign] = useState<PublisherDesignType>();
  const [list, setList] = useState<{ label; id }[]>([]);

  // Lifecycle
  useEffect(() => {
    let designRequest;
    const request = context.getObjects(
      "publisher-sites",
      { "data.key": action.split("/")[0] },
      (siteResponse) => {
        if (siteResponse.success) {
          setSite(siteResponse.data[0]);
          designRequest = context.getObjects(
            "publisher-designs",
            { _id: siteResponse.data[0].data.design },
            (response) => {
              if (response.success) {
                setDesign(response.data[0]);
                const newList = [];
                response.data[0].data.menus.map((menu) => {
                  newList.push({
                    label: menu.label,
                    id: menu.key,
                    subtitle: menu.description,
                  });
                });
                setList(newList);
              }
            }
          );
        }
      }
    );

    return () => {
      request.stop();
      if (designRequest) designRequest.stop();
    };
  }, []);

  // UI
  if (!site || !design) return <context.UI.Loading />;
  return (
    <context.UI.Layouts.ListDetailLayout
      list={list}
      title="Menus"
      context={context}
      DetailComponent={PublisherMenuDetail}
      baseUrl={`/publisher/${site.data.key}/menus`}
      detailComponentProps={{ site, design }}
    />
  );
};

export default PublisherMenus;
