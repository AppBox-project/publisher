import {
  Button,
  CircularProgress,
  Grid,
  responsiveFontSizes,
} from "@material-ui/core";
import { link } from "fs";
import React from "react";
import { useEffect, useState } from "reactn";
import { AppContextType } from "../../../Utils/Types";
import { PublisherDesignType, PublisherSiteType } from "../Types";

const PublisherOverview: React.FC<{ action; context: AppContextType }> = ({
  action,
  context,
}) => {
  // Vars
  const [site, setSite] = useState<PublisherSiteType>();
  const [originalSite, setOriginalSite] = useState<string>();
  const [design, setDesign] = useState<PublisherDesignType>();
  const [publishInProgress, setPublishInProgress] = useState<boolean>(false);

  // Lifecycle
  useEffect(() => {
    let designRequest;
    const siteRequest = context.getObjects(
      "publisher-sites",
      { "data.key": action.split("/")[0] },
      (response) => {
        if (response.success) {
          setSite(response.data[0]);
          setOriginalSite(JSON.stringify(response.data[0]));
          designRequest = context.getObjects(
            "publisher-designs",
            { _id: response.data[0].data.design },
            (response) => {
              if (response.success) {
                setDesign(response.data[0]);
              } else {
                console.log(response);
              }
            }
          );
        } else {
          console.log(response);
        }
      }
    );

    return () => {
      siteRequest.stop();
      if (designRequest) {
        designRequest.stop();
      }
    };
  }, []);

  // UI
  if (!site || !design) return <context.UI.Loading />;
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container>
        <Grid item xs={12} md={9}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card
              withBigMargin
              title={`Settings for ${site.data.name}`}
            >
              <context.UI.Inputs.TextInput
                label="Title"
                value={site.data.name}
                onChange={(title) => {
                  setSite({
                    ...site,
                    data: {
                      ...site.data,
                      configuration: { ...site.data.configuration, title },
                    },
                  });
                }}
              />
              {design.data.configuration.map((configuration) => (
                <>
                  {configuration.type === "color" ? (
                    <context.UI.Inputs.Color
                      label={configuration.label}
                      value={site.data.configuration[configuration.key]}
                      onChange={(newValue) => {
                        setSite({
                          ...site,
                          data: {
                            ...site.data,
                            configuration: {
                              ...site.data.configuration,
                              [configuration.key]: newValue,
                            },
                          },
                        });
                      }}
                    />
                  ) : (
                    <context.UI.Inputs.TextInput
                      label={configuration.label}
                      value={site.data.configuration[configuration.key]}
                      onChange={(newValue) => {
                        setSite({
                          ...site,
                          data: {
                            ...site.data,
                            configuration: {
                              ...site.data.configuration,
                              [configuration.key]: newValue,
                            },
                          },
                        });
                      }}
                    />
                  )}
                </>
              ))}
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={12} md={3}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card
              withBigMargin
              title={`Controls`}
              centerTitle
              titleDivider
              titleInPrimaryColor
            >
              {JSON.stringify(site) !== originalSite && (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  style={{ margin: "5px 0" }}
                >
                  Save changes
                </Button>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={publishInProgress}
                onClick={() => {
                  setPublishInProgress(true);
                  context
                    .requestServerAction("publish", { id: site._id })
                    .then(() => {
                      setPublishInProgress(false);
                    });
                }}
                startIcon={
                  publishInProgress && (
                    <CircularProgress style={{ width: 15, height: 15 }} />
                  )
                }
              >
                {publishInProgress ? "Publishing..." : "Publish"}
              </Button>
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={12}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card withBigMargin title={`Statistics`}>
              Todo
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
      </Grid>
    </context.UI.Animations.AnimationContainer>
  );
};

export default PublisherOverview;
