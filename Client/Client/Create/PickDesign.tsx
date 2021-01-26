import { Grid, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import InputInput from "../../../Components/Inputs/Input";
import { AppContextType } from "../../../Utils/Types";
import { PublisherDesignType } from "../Types";

const PublisherPickDesign: React.FC<{
  context: AppContextType;
  designs: PublisherDesignType[];
  onDone: (design: PublisherDesignType) => void;
}> = ({ context, designs, onDone }) => {
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginTop: 75 }}
          >
            <Grid item xs={12} md={5}>
              <context.UI.Animations.AnimationItem>
                <context.UI.Design.Card
                  title="Start a new website"
                  centerTitle
                  titleDivider
                  titleInPrimaryColor
                >
                  <Typography variant="body1">
                    Congratulations! It's time to present yourself or your
                    business using a state-of-the-art site.
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: 15 }}>
                    AppBox' publisher app allows to take data in appbox and
                    publish it to a{" "}
                    <Tooltip
                      placement="left"
                      title="A static website is faster than a dynamic one. Users and search engines love this!"
                    >
                      <abbr>static website</abbr>
                    </Tooltip>{" "}
                    to provide a great experience for your users without much
                    additional work for you.
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: 15 }}>
                    Sites are built upon designs. Pick or install a design to
                    continue.
                  </Typography>
                </context.UI.Design.Card>
              </context.UI.Animations.AnimationItem>
            </Grid>
          </Grid>
        </Grid>
        {designs.map((design) => (
          <Grid item xs={6} md={2} key={design._id}>
            <context.UI.Animations.AnimationItem>
              <context.UI.Design.Card
                withBigMargin
                hoverable
                title={design.data.name}
                centerTitle
                titleDivider
                titleInPrimaryColor
                onClick={() => {
                  onDone(design);
                }}
              >
                {design.data.description}
              </context.UI.Design.Card>
            </context.UI.Animations.AnimationItem>
          </Grid>
        ))}
        <Grid item xs={6} md={2}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card
              withBigMargin
              title="Import new design"
              centerTitle
              titleDivider
            >
              <InputInput label="Import new design" />
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
      </Grid>
    </context.UI.Animations.AnimationContainer>
  );
};

export default PublisherPickDesign;
