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
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { GridOptions, Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

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

const agGridModules: Module[] = [
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  StatusBarModule,
  MenuModule,
  RangeSelectionModule,
  RichSelectModule,
  ExcelExportModule,
  GridChartsModule,
  SparklinesModule,
  RowGroupingModule,
  ClipboardModule,
];

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
      <div style={{ marginBottom: 20 }}>
        Upload a JSON/Excel file, or use{' '}
        <a href="/orders.json" download="orders.json">
          orders.json.
        </a>
      </div>

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
          />
          <div className="ag-theme-alpine" style={{ flex: 1 }}>
            <AgGridReact
              gridOptions={Object.assign(
                preparedAdaptableOptions.gridOptions,
                gridOptions
              )}
              modules={agGridModules}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NoCodeDemo;
