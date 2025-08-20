import {Imd, addMetadata, replaceTypes, removeMembers} from 'devextreme-internal-tools/metadata';
import { cleanArtifacts, types } from './common';
import { IMD_FILE, PATHS } from './common/paths';

cleanArtifacts(IMD_FILE, 'IntegrationDataGenerator.cfg.json');

Imd.makeMetadata({
  args: {
    artifacts: PATHS.artifactsDir,
  },
  mutations: [
    replaceTypes('ui/card_view:dxCardViewOptions.filterBuilderPopup', ["*"], ['object']),
    replaceTypes('ui/card_view:Editing.popup', ["*"], ['object']),

    removeMembers("core/dom_component:DOMComponentOptions.bindingOptions"),

    addMetadata(
      "common/charts:SeriesPoint(|.hoverStyle|.selectionStyle).border",
      "ForcedName",
      "pointBorder",
    ),

    addMetadata(
      "viz/chart:CommonPaneSettings.border",
      "ForcedName",
      "paneBorder",
    ),

    addMetadata([
      "common/charts:SeriesLabel.border",
      "viz/chart:dxChartSeriesTypesCommonSeries(|HoverStyle|SelectionStyle).border",
      "viz/pie_chart:dxPieChartSeriesTypesCommonPieChartSeries(|.hoverStyle|.label|.selectionStyle).border",
      "viz/polar_chart:dxPolarChartSeriesTypesCommonPolarChartSeries(|.hoverStyle|.selectionStyle).border",
      "viz/polar_chart:dxPolarChartSeriesTypesCommonPolarChartSeriesLabel.border"
    ], "ForcedName", "seriesBorder"),

    addMetadata(
      "viz/funnel:dxFunnelOptions.item(|.hoverStyle|.selectionStyle).border",
      "ForcedName",
      "itemBorder",
    ),

    addMetadata([
      "viz/sankey:dxSankeyOptions.(label|link|node).border",
      "viz/sankey:dxSankeyOptions.(link|node).hoverStyle.border",
    ], "ForcedName", "sankeyborder"),

    addMetadata(
      "viz/tree_map:dxTreeMapOptions.(group|tile)(|.hoverStyle|.selectionStyle).border",
      "ForcedName",
      "treeMapborder",
    ),

    addMetadata(
      "viz/(chart|polar_chart):(ArgumentAxis|ValueAxis).label",
      "ForcedName",
      "axisLabel",
    ),

    addMetadata("viz/chart:(ArgumentAxis|ValueAxis).title", "ForcedName", "axisTitle"),

    addMetadata(
      "viz/chart:(ArgumentAxis|ValueAxis).constantLineStyle",
      "ForcedName",
      "axisConstantLineStyle",
    ),

    addMetadata(/\.data$/, "OmitConfigComponents", "*"),

    addMetadata(/\.dataSource$/, "OmitConfigComponents", "*"),

    addMetadata([
      "ui/box:dxBoxItem.box",
      "ui/data_grid:dxDataGridColumn.columns",
      "ui/form:dxFormGroupItem.items",
      "ui/form:dxFormTabbedItem.tabs.items",
      "ui/splitter:dxSplitterItem.splitter",
      "ui/tree_list:dxTreeListColumn.columns",
    ], "OmitConfigComponents", "*"),

    addMetadata(["ui/form:dxFormOptions.items"], "OmitConfigComponents", "DxDataGrid,DxTreeList")
  ],
});
