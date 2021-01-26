import React from "react";
import { useEffect, useState } from "reactn";
import { AppContextType, ModelType } from "../../../Utils/Types";
import { PublisherSiteType, PublisherPageType } from "../Types";
import PublisherPageDetail from "./PageDetail";

const PublisherPages: React.FC<{ action; context: AppContextType }> = ({
  action,
  context,
}) => {
  // Vars
  const [site, setSite] = useState<PublisherSiteType>();
  const [pageList, setPageList] = useState<any>([]);
  const [pages, setPages] = useState<{ [id: string]: PublisherPageType }>({});
  const [model, setModel] = useState<ModelType>();
  // Lifecycle
  useEffect(() => {
    let pageRequest;
    let modelRequest;
    const request = context.getObjects(
      "publisher-sites",
      { "data.key": action.split("/")[0] },
      (siteResponse) => {
        modelRequest = context.getModel("publisher-pages", (modelResponse) => {
          setModel(modelResponse.data);
          if (siteResponse.success) {
            setSite(siteResponse.data[0]);
            pageRequest = context.getObjects(
              "publisher-pages",
              { "data.site": siteResponse.data[0]._id },
              (response) => {
                if (response.success) {
                  const newPages = {};
                  const newPageList = [];
                  response.data.map((page: PublisherPageType) => {
                    newPageList.push({
                      label: page.data.name,
                      id: page.data.slug,
                    });
                    newPages[page.data.slug] = page;
                  });
                  setPageList(newPageList);
                  setPages(newPages);
                }
              }
            );
          } else {
            console.log(siteResponse);
          }
        });
      }
    );

    return () => {
      request.stop();
      if (pageRequest) pageRequest.stop();
    };
  }, []);

  // UI
  if (!site || !model) return <context.UI.Loading />;

  return (
    <context.UI.Layouts.ListDetailLayout
      list={pageList}
      DetailComponent={PublisherPageDetail}
      baseUrl={`/publisher/${action}`}
      context={context}
      title="Pages"
      navWidth={3}
      detailComponentProps={{ site, pages, model }}
    />
  );
};

export default PublisherPages;
