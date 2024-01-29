import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState({
    enquiries: true,
    applications: true,
  });

  const openEnquiries = () => {
    setOpenMenu({ ...openMenu, enquiries: !openMenu.enquiries });
  };

  const openApplications = () => {
    setOpenMenu({ ...openMenu, applications: !openMenu.applications });
  };

  const mainItemList = [
    { icon: <HouseOutlinedIcon />, text: "Dashboard" },
    { icon: <SearchOutlinedIcon />, text: "Search Courses" },
    { icon: <SchoolOutlinedIcon />, text: "Search University" },
    { icon: <HelpOutlineOutlinedIcon />, text: "Help" },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{ width: "240px", float: "left", height: "100vh" }}
      >
        <Toolbar className="flex justify-center items-center">
          <Box component="h1" className="text-2xl font-extrabold">
            Logo
          </Box>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* main list */}
          {mainItemList.map((lists, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{lists.icon}</ListItemIcon>
                <ListItemText primary={lists.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />

          {/* secondary lists */}
          <Box
            component="div"
            className="flex justify-center items-center font-bold mb-2.5"
          >
            <Box component="h6">Enquiries</Box>
          </Box>

          <ListItemButton onClick={openEnquiries}>
            <ListItemIcon>
              <InventoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Enquiries" />
            {openMenu.enquiries ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMenu.enquiries} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <Link to="/enquiries">
                  <ListItemText primary="All Enquiries" className="pl-3.5" />
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link to="/add-enquiries">
                  <ListItemText primary="Create Enquiries" className="pl-3.5" />
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ my: 1 }} />

          <Box
            component="div"
            className="flex justify-center items-center font-bold mb-2.5"
          >
            <Box component="h6">Applications</Box>
          </Box>

          <ListItemButton onClick={openApplications}>
            <ListItemIcon>
              <DescriptionOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" />
            {openMenu.applications ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMenu.applications} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Applications" className="pl-3.5" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
