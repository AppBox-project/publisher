import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "reactn";
import InputColor from "../../../Components/Inputs/Color";
import InputInput from "../../../Components/Inputs/Input";
import { AppContextType } from "../../../Utils/Types";
import { PublisherDesignType, PublisherSiteTypeData } from "../Types";
import { map, find } from "lodash";

const PublisherSetupSite: React.FC<{
  context: AppContextType;
  design: PublisherDesignType;
}> = ({ context, design }) => {
  // Vars
  const [newSite, setNewSite] = useState<PublisherSiteTypeData>({
    name: "",
    key: "",
    data: {},
    configuration: {},
    design: design._id,
    menus: {},
  });
  // UI
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card
              withBigMargin
              title={`Setting up a new ${design.data.name}-website`}
            >
              <InputInput
                label="Name"
                value={newSite.name}
                onChange={(name: string) => {
                  setNewSite({ ...newSite, name });
                }}
              />
              <InputInput
                label="Key"
                value={newSite.key}
                onChange={(key: string) => {
                  setNewSite({ ...newSite, key });
                }}
              />
              {design.data.configuration.map((field) => (
                <>
                  {!field.type || field.type === "input" ? (
                    <InputInput
                      label={field.label}
                      value={newSite.configuration[field.key] || ""}
                      onChange={(newValue) => {
                        setNewSite({
                          ...newSite,
                          configuration: {
                            ...newSite.configuration,
                            [field.key]: newValue,
                          },
                        });
                      }}
                    />
                  ) : field.type === "color" ? (
                    <InputColor
                      label={field.label}
                      value={newSite.configuration[field.key] || ""}
                      onChange={(newValue) => {
                        setNewSite({
                          ...newSite,
                          configuration: {
                            ...newSite.configuration,
                            [field.key]: newValue,
                          },
                        });
                      }}
                    />
                  ) : (
                    `Unknown type ${field.type}`
                  )}
                </>
              ))}
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h4">Data</Typography>
          <Typography variant="body1">
            Decide what data will be automatically loaded into your website.
          </Typography>
          <Divider />
        </Grid>

        {design.data.content.map((content, index) => (
          <Grid item xs={3} key={index}>
            <context.UI.Animations.AnimationItem>
              <context.UI.Design.Card
                withBigMargin
                title={
                  <>
                    <context.UI.Icon icon={content.icon} /> {content.name}
                  </>
                }
              >
                {content.description}
                <br />
                <context.UI.Inputs.Checkboxes
                  label="Mode"
                  options={[
                    {
                      label: "Create fresh model",
                      value: "standard",
                    },
                    { label: "Map to existing model", value: "existing" },
                  ]}
                  value={newSite.data[content.key]?.mode}
                  onChange={(mode) => {
                    setNewSite({
                      ...newSite,
                      data: {
                        ...newSite.data,
                        [content.key]: {
                          ...newSite.data[content.key],
                          mode,
                          name: content.name,
                          icon: content.icon,
                          model: content.standardModel.key,
                        },
                      },
                    });
                  }}
                />
                {newSite.data[content.key]?.mode === "existing" &&
                  "Todo: Options will appear here for linking."}
              </context.UI.Design.Card>
            </context.UI.Animations.AnimationItem>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              const addModelPromises = [];
              map(newSite.data, (value, key) => {
                if (value?.mode === "standard") {
                  addModelPromises.push(
                    new Promise<void>((resolve) => {
                      context.createModel(
                        find(design.data.content, (o) => o.key === key)
                          .standardModel,
                        () => resolve()
                      );
                    })
                  );
                }
              });

              Promise.all(addModelPromises).then(() => {
                context.addObject("publisher-sites", newSite, (response) => {
                  if (response.success) {
                    window.location.reload();
                  } else {
                    console.log(response);
                  }
                });
              });
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </context.UI.Animations.AnimationContainer>
  );
};

export default PublisherSetupSite;
