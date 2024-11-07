import React from "react";
// import ChatComponent from "../hompage/chatComponent/NewChatComponent";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ActivityCopmonent from "./activityComponent/ActivityCopmonent";
import style from "./home.module.css";
import NewChatComponent from "./chatComponent/NewChatComponent";

const { homelayout } = style;
export default function HomeLayout() {
  return (
    <>
      <div>
        <PanelGroup direction='horizontal' className={homelayout}>
          <Panel defaultSize={45} minSize={40}>
            <NewChatComponent />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={75} minSize={50}>
            <ActivityCopmonent />
          </Panel>
        </PanelGroup>
      </div>
    </>
  );
}
