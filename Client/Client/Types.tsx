import { ObjectType } from "../../Utils/Types";

export interface PublisherSiteType extends ObjectType {
  data: PublisherSiteTypeData;
}

export interface PublisherSiteTypeData {
  name: string;
  key: string;
  data: {};
  configuration: {};
  design: string;
  menus: { [key: string]: { label: string; to: string }[] };
  url: string;
}

export interface PublisherDesignType extends ObjectType {
  data: {
    name: string;
    key: string;
    version: number;
    content: any;
    description: string;
    configuration: {
      label: string;
      key: string;
      type?: "input" | "color";
      boolean;
    }[];
    menus: {
      label: string;
      key: string;
      description: string;
      allowNesting?: boolean;
    }[];
  };
}

export interface PublisherPageType extends ObjectType {
  data: {
    name: string;
    slug: string;
  };
}
