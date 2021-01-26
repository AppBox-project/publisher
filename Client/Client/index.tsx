import {
  FaBullseye,
  FaCompass,
  FaFile,
  FaMailBulk,
  FaPalette,
  FaPlusCircle,
} from "react-icons/fa";
import { AppContextType } from "../../Utils/Types";
import PublisherOverview from "./Overview";
import PublisherCreate from "./Create";
import { PublisherDesignType, PublisherSiteType } from "./Types";
import PublisherDesign from "./Design";
import PublisherContent from "./Content";
import PublisherPages from "./Pages";
import PublisherMenus from "./Menus";

export default class App {
  context: AppContextType;

  constructor(context) {
    this.context = context;
  }

  appConfig = {
    actions: {
      filter: true,
      group: true,
      mobile: { displayAs: "bottom-navigation" },
    },
  };

  getActions = () => {
    return new Promise(async (resolve) => {
      this.context.getObjects(
        "publisher-designs",
        {},
        async (designResponse) => {
          if (designResponse.success) {
            const designs: PublisherDesignType[] = designResponse.data;
            this.context.getObjects(
              "publisher-sites",
              {},
              async (siteResponse) => {
                if (siteResponse.success) {
                  const sites: PublisherSiteType[] = siteResponse.data;
                  const siteActions = [];
                  if (sites.length > 0) {
                    await sites.reduce(
                      async (prev, curr: PublisherSiteType) => {
                        await prev;
                        siteActions.push({
                          key: `${curr.data.key}/overview`,
                          label: "Overview",
                          component: PublisherOverview,
                          icon: FaBullseye,
                          group: curr.data.name,
                        });
                        siteActions.push({
                          key: `${curr.data.key}/design`,
                          label: "Design",
                          component: PublisherDesign,
                          icon: FaPalette,
                          group: curr.data.name,
                        });
                        siteActions.push({
                          key: `${curr.data.key}/content`,
                          label: "Content",
                          component: PublisherContent,
                          icon: FaMailBulk,
                          group: curr.data.name,
                        });
                        siteActions.push({
                          key: `${curr.data.key}/pages`,
                          label: "Pages",
                          component: PublisherPages,
                          icon: FaFile,
                          group: curr.data.name,
                        });
                        siteActions.push({
                          key: `${curr.data.key}/menus`,
                          label: "Menus",
                          component: PublisherMenus,
                          icon: FaCompass,
                          group: curr.data.name,
                        });
                      },
                      siteResponse.data[0]
                    );
                    resolve([
                      {
                        key: "create",
                        label: "Create",
                        component: PublisherCreate,
                        icon: FaPlusCircle,
                      },
                      ...siteActions,
                    ]);
                  } else {
                    resolve(PublisherCreate);
                  }
                } else {
                  console.log(siteResponse);
                }
              }
            );
          } else {
            console.log(designResponse);
          }
        }
      );
    });
  };
}
