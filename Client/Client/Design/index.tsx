import { Grid } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "reactn";
import { AppContextType } from "../../../Utils/Types";
import { PublisherSiteType } from "../Types";

const PublisherDesign: React.FC<{ action; context: AppContextType }> = ({
  action,
  context,
}) => {
  // Vars
  const [site, setSite] = useState<PublisherSiteType>();

  // Lifecycle
  useEffect(() => {
    const request = context.getObjects(
      "publisher-sites",
      { "data.key": action.split("/")[0] },
      (response) => {
        if (response.success) {
          setSite(response.data[0]);
        } else {
          console.log(response);
        }
      }
    );

    return () => request.stop();
  }, []);

  // UI
  if (!site) return <context.UI.Loading />;
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container>
        <Grid item xs={12} md={9}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card title={site.data.name} withBigMargin>
              Test
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={12} md={3}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card title="Template" withBigMargin>
              Test
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
      </Grid>
    </context.UI.Animations.AnimationContainer>
  );
};

export default PublisherDesign;
