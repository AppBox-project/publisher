import React, { useState } from "react";
import { useEffect } from "reactn";
import { AppContextType } from "../../../Utils/Types";
import { PublisherDesignType } from "../Types";
import background from "./onboarding.jpg";
import PublisherPickDesign from "./PickDesign";
import PublisherSetupSite from "./SetupSite";

const PublisherNoSites: React.FC<{ action; context: AppContextType }> = ({
  action,
  context,
}) => {
  // Vars
  const [designs, setDesigns] = useState<PublisherDesignType[]>();
  const [design, setDesign] = useState<PublisherDesignType>();

  // Lifecycle
  useEffect(() => {
    context.setImage(background);

    const designRequest = context.getObjects(
      "publisher-designs",
      {},
      (response) => {
        if (response.success) {
          setDesigns(response.data);
        } else {
          console.log(response);
        }
      }
    );

    return () => {
      context.setImage(null);
      designRequest.stop();
    };
  }, []);
  // UI
  if (!designs) return <context.UI.Loading />;
  return design ? (
    <PublisherSetupSite context={context} design={design} />
  ) : (
    <PublisherPickDesign
      context={context}
      designs={designs}
      onDone={(design) => {
        setDesign(design);
      }}
    />
  );
};

export default PublisherNoSites;
