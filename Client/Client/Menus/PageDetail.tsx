import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../Utils/Types";
import { PublisherDesignType, PublisherSiteType } from "../Types";
import { find } from "lodash";
import {
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { FaPlus, FaSave } from "react-icons/fa";

const PublisherMenuDetail: React.FC<{
  context: AppContextType;
  match: { params: { detailId } };
  site: PublisherSiteType;
  design: PublisherDesignType;
}> = ({
  context,
  match: {
    params: { detailId },
  },
  site,
  design,
}) => {
  // Vars
  const [menuInfo, setMenuInfo] = useState<{
    label: string;
    description: string;
  }>();
  const [newMenu, setNewMenu] = useState<{ label: string; to: string }[]>([]);
  const [selectedLinkIndex, setSelectedLinkIndex] = useState<number>(undefined);

  // Lifecycle
  useEffect(() => {
    setMenuInfo(find(design.data.menus, (o) => o.key === detailId));
    setNewMenu((site?.data?.menus || {})[detailId] || []);

    return () => {
      setSelectedLinkIndex(undefined);
    };
  }, [detailId, site]);

  // UI
  if (!menuInfo) return <context.UI.Loading />;
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container>
        <Grid item xs={12}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card withBigMargin title={menuInfo.label}>
              {menuInfo.description}
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={4}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card withBigMargin title="Content">
              <List>
                {newMenu.length > 0 ? (
                  newMenu.map((menuItem, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => setSelectedLinkIndex(index)}
                    >
                      <ListItemText>{menuItem.label}</ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText>This menu is empty.</ListItemText>
                  </ListItem>
                )}
                <ListItem
                  button
                  onClick={() => {
                    setNewMenu([...newMenu, { label: "New link", to: "/" }]);
                  }}
                >
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <FaPlus />
                  </ListItemIcon>
                  <ListItemText>Add link</ListItemText>
                </ListItem>
              </List>
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        {selectedLinkIndex !== undefined && (
          <Grid item xs={8}>
            <context.UI.Animations.AnimationItem>
              <context.UI.Design.Card
                withBigMargin
                title={newMenu[selectedLinkIndex].label}
              >
                <context.UI.Inputs.TextInput
                  label="Label"
                  value={newMenu[selectedLinkIndex].label}
                  onChange={(label) => {
                    const updatedMenu = newMenu;
                    updatedMenu[selectedLinkIndex].label = label;
                    setNewMenu([...updatedMenu]);
                  }}
                />
                <context.UI.Inputs.TextInput
                  label="To"
                  value={newMenu[selectedLinkIndex].to}
                  onChange={(to) => {
                    const updatedMenu = newMenu;
                    updatedMenu[selectedLinkIndex].to = to;
                    setNewMenu([...updatedMenu]);
                  }}
                />
              </context.UI.Design.Card>
            </context.UI.Animations.AnimationItem>
          </Grid>
        )}
      </Grid>
      {JSON.stringify(newMenu) !==
        JSON.stringify((site?.data?.menus || {})[detailId] || []) && (
        <Fab
          color="primary"
          style={{ position: "fixed", right: 15, bottom: 15 }}
          onClick={() => {
            const newSite = site.data;
            if (!newSite.menus) newSite.menus = {};
            newSite.menus[detailId] = newMenu;
            context.updateObject("publisher-sites", newSite, site._id);
          }}
        >
          <FaSave />
        </Fab>
      )}
    </context.UI.Animations.AnimationContainer>
  );
};

export default PublisherMenuDetail;
