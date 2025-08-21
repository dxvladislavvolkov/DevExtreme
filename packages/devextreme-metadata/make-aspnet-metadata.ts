import { AspNet, Mutation, addMember, removeMembers, replaceTypes } from 'devextreme-internal-tools/metadata';
import { cleanArtifacts, types } from './common';
import { commonSmdCollectionItems } from './common/smd';
import { enums, enumAliases, enumItemRenamings } from './aspnet/enums'
import { PATHS } from './common/paths';

cleanArtifacts('StrongMetaData.json', 'StrongMetaDataGenerator.cfg.json');

AspNet.makeMetadata({
  args: {
    version: '25_2',
    artifacts: PATHS.artifactsDir,
  },
  mutations: [
    replaceTypes(
      [
        // 'Length' can be added to the next mutation's regex, but it in that case it affects
        // 'arrowLength' and 'edgeLength' properties, which is probably a right thing to do,
        // but it changes the existing behavior.
        // Another pattern might be /\.(max|min)[A-Z]\w+$/ but it affects even more properties.
        "ui/autocomplete:dxAutocompleteOptions.minSearchLength",
        "ui/drop_down_editor/ui.drop_down_list:dxDropDownListOptions.minSearchLength",
        "ui/html_editor:dxHtmlEditorMention.minSearchLength",

        'ui/tag_box:dxTagBoxOptions.maxFilterQueryLength',
        "ui/scheduler:dxSchedulerOptions(.|.views.)maxAppointmentsPerCell",
        "viz/chart_components/base_chart:BaseChartOptions.animation.maxPointCountSupported",
      ],
      ['number'],
      ['int']
    ),
    replaceTypes(
      /(?:Count|[Ii]ndex|\.maxAppointmentsPerCell|\.hidingPriority|\.pageSize|\.lg|\.md|\.sm|\.xs|\.col[Ss]pan|\.row[Ss]pan)$/,
      ['number'],
      ['int']
    ),

    // This isn't the pageSize you're looking for. Rollback.
    replaceTypes("ui/diagram:dxDiagramOptions.pageSize", ["int"], []),

    removeMembers("common/ai-integration:AIIntegration"),
    removeMembers( "ui/html_editor:AICommand(|Base|NameExtended|Name)"),
    replaceWithWidgetFactory({
      uid: 'ui/form:dxFormSimpleItem',
      from: {
        componentNameProp: 'editorType',
        componentConfigProp: 'editorOptions',
      },
      to: {
        factoryName: 'FormItemEditor',
        newProp: 'editor',
      },
    }),
    replaceWithWidgetFactory({
      uid: 'ui/toolbar:dxToolbarItem',
      from: {
        componentNameProp: 'widget',
        componentConfigProp: 'options',
      },
      to: {
        factoryName: 'ToolbarItem',
        newProp: 'widget',
      },
    }),
    addMember({
      uid: 'ui/popover:ToolbarItem',
      name: 'dxPopoverToolbarItem',
      parent: 'ui/popup:ToolbarItem',
    }),
    addMember({
      uid: 'ui/popover:dxPopoverOptions.toolbarItems',
      types: [types.array(types.uidRef('ui/popover:ToolbarItem'))],
    }),
    removeMembers("ui/scheduler:ToolbarItem.options"),
  ],
  variables: {
    forwardedEnums: [
      {
        uid: 'ui/form:FormItemComponent',
        name: 'FormItemEditorType',
      },
      {
        uid: 'common:ToolbarItemComponent',
        name: 'ToolbarItemWidget',
      },
    ],
    collectionItems: [...commonSmdCollectionItems],
    enums,
    enumAliases,
    enumItemRenamings
  },
});

function replaceWithWidgetFactory({
  uid,
  from: { componentNameProp, componentConfigProp },
  to: { factoryName, newProp },
}: {
  uid: string;
  from: {
    componentNameProp: string;
    componentConfigProp: string;
  };
  to: {
    factoryName: AspNet.WidgetFactoryKind;
    newProp: string;
  };
}): Mutation<AspNet.WidgetFactory>[] {
  return [
    removeMembers(`${uid}.(${componentNameProp}|${componentConfigProp})`),
    addMember({
      uid: `${uid}.${newProp}`,
      types: [
        {
          kind: 'custom',
          name: 'WidgetFactory',
          params: {
            factory: factoryName,
            componentNameProp,
            componentConfigProp,
          },
        },
      ],
    })
  ];
}
