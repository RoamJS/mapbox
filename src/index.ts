import runExtension from "roamjs-components/util/runExtension";
import createButtonObserver from "roamjs-components/dom/createButtonObserver";
import addStyle from "roamjs-components/dom/addStyle";
import { render } from "./components/Maps";

export default runExtension({
  run: (args) => {
    // No Config Yet
    // args.extensionAPI.settings.panel.create({
    //   tabTitle: "mapbox",
    //   settings: [],
    // });
    createButtonObserver({
      shortcut: "maps",
      attribute: "leaflet",
      render,
    });
    const link = document.createElement("link");
    link.href = "https://unpkg.com/leaflet@1.5.19/dist/leaflet.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = addStyle(`.leaflet-pane {
      z-index: 10 !important;
    }
    
    .leaflet-retina a.leaflet-control-layers-toggle {
      background-image: url(https://unpkg.com/leaflet@1.5.19/dist/images/layers.png)
    }
    
    a.leaflet-popup-close-button {
      display:none;
    }
    `);
    return () => {
      link.remove();
      style.remove();
    };
  },
});
