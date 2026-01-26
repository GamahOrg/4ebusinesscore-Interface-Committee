import React, { FC } from 'react';
import { GenericToolbar } from "@4eplatform/shared/src/popups/GenericToolbar";
import { CommitteeIndicator } from './Components/CommitteeIndicator';

const CommitteeIndicators:FC = () => {
    return <>
        <>
      <GenericToolbar
        list={[
          { key: "Workspace", value: "/legal-workspace" },
          // { key: "CommitteeIndicators", value: "" },
        ]}
      />

      <CommitteeIndicator />
    </>
    </>;
}


export default CommitteeIndicators;