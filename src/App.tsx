import * as React from 'react';

import AdaptableReact, {
  AdaptableOptions,
  AdaptableOptionsWizardView,
} from '@adaptabletools/adaptable-react-aggrid';
import {
  readExcelFile,
  readJSONFile,
} from '@adaptabletools/adaptable-plugin-nocode-aggrid';

import { AgGridReact } from '@ag-grid-community/react';

// import adaptable css and themes
import '@adaptabletools/adaptable-react-aggrid/base.css';
import '@adaptabletools/adaptable-react-aggrid/themes/light.css';
import '@adaptabletools/adaptable-react-aggrid/themes/dark.css';

// import aggrid themes (using new Balham theme)
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';

import {
  AllEnterpriseModules,
  ClientSideRowModelModule,
  GridOptions,
} from '@ag-grid-enterprise/all-modules';

const gridOptions: GridOptions = {
  suppressMenuHide: true,
  enableRangeSelection: true,
};

const adaptableOptions: Omit<AdaptableOptions, 'primaryKey'> = {
  predefinedConfig: {
    Dashboard: {
      Tabs: [
        {
          Name: 'test',
          Toolbars: ['Layout'],
        },
      ],
    },
  },
};

const modules = [...AllEnterpriseModules, ClientSideRowModelModule];

const formatFile = (file: File) => {
  const isJSON =
    (file.type && file.type.indexOf('json')) !== -1 ||
    file.name.endsWith('.json');
  if (isJSON) {
    return readJSONFile(file);
  }

  return readExcelFile(file);
};

const NoCodeDemo: React.FunctionComponent = () => {
  const [preparedAdaptableOptions, setPreparedAdaptableOptions] =
    React.useState<AdaptableOptions | null>(null);

  return (
    <>
      {!preparedAdaptableOptions && (
        <AdaptableOptionsWizardView
          readFile={formatFile}
          adaptableOptions={adaptableOptions}
          onInit={(newOptions) => setPreparedAdaptableOptions(newOptions)}
        />
      )}
      {preparedAdaptableOptions && (
        <div style={{ display: 'flex', flexFlow: 'column', height: '50vh' }}>
          <AdaptableReact
            style={{ flex: 'none' }}
            adaptableOptions={preparedAdaptableOptions}
            modules={modules}
          />
          <div className="ag-theme-alpine" style={{ flex: 1 }}>
            <AgGridReact
              gridOptions={Object.assign(
                preparedAdaptableOptions.gridOptions,
                gridOptions
              )}
              modules={modules}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NoCodeDemo;
