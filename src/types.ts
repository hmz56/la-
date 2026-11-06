export type LayoutMode = 'TABLET_LANDSCAPE' | 'TABLET_PORTRAIT' | 'PHONE_LANDSCAPE' | 'PHONE_PORTRAIT' | 'RESPONSIVE';

export type ScreenId =
  | 'S0_LOCK'
  | 'S1_HOME'
  | 'S2_NEW_PROJECT'
  | 'S3_EDITOR'
  | 'S4_PRESENTER'
  | 'S5_AUDIENCE'
  | 'S6_REMOTE'
  | 'S7_SETTINGS'
  | 'S8_GEOREFERENCE'
  | 'S9_EXCHANGE'
  | 'S10_ACCOUNTS'
  | 'S11_PAIRING';

export type ActivePanel =
  | 'NONE'
  | 'PROPERTIES'
  | 'LAYERS'
  | 'SYMBOLS'
  | 'SCENES'
  | 'MAP_SOURCES'
  | 'GIS_IMPORT'
  | 'SCENE_GRAPHICS';

export type ActiveTool =
  | 'SELECT'
  | 'PAN'
  | 'LABEL'
  | 'MARKER'
  | 'DRAW'
  | 'IMAGE';

export type DrawingToolType =
  | 'FREEHAND'
  | 'LINE'
  | 'POLYLINE'
  | 'ARROW_STRAIGHT'
  | 'ARROW_CURVED'
  | 'CIRCLE'
  | 'RECTANGLE'
  | 'POLYGON'
  | 'BOUNDARY'
  | 'HIGHLIGHT'
  | 'ROUTE_PINS';

export type CoordinateFormat = 'DD' | 'DDM' | 'DMS' | 'UTM' | 'MGRS';

export type ThemeMode = 'dark' | 'emerald' | 'light';

export type BasemapMode = 'aerial' | 'emerald' | 'topo';

export type LanguageMode = 'en' | 'ar';

export type LocateState = 'idle' | 'searching' | 'located' | 'follow' | 'denied' | 'no_gnss';

export type SaveState = 'SAVED' | 'SAVING' | 'UNSAVED' | 'ERROR';

export interface MapObject {
  id: string;
  type: 'POLYGON' | 'MARKER' | 'LABEL' | 'LINE' | 'IMAGE';
  name: string;
  layerId: string;
  visible: boolean;
  locked: boolean;
  strokeColor?: string;
  fillColor?: string;
  opacity?: number;
  strokeWidth?: number;
  dashStyle?: 'solid' | 'dashed' | 'dotted';
  metrics?: {
    perimeter?: string;
    area?: string;
    centroid?: string;
    radius?: string;
    vertices?: number;
  };
}

export interface LayerItem {
  id: string;
  name: string;
  opacity: number;
  objectCount: number;
  visible: boolean;
  locked: boolean;
  isDefault?: boolean;
  isImported?: boolean;
}

export interface SceneItem {
  id: string;
  number: number;
  name: string;
  transition: 'Instant' | 'Fly-to' | 'Fade' | 'Appear';
  visibleLayersCount: number;
  headline?: string;
  lowerThirdName?: string;
  lowerThirdTitle?: string;
  locationLabel?: string;
  hasLegend?: boolean;
  hasInfoCard?: boolean;
  infoCardValue?: string;
  infoCardLabel?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  modifiedDate: string;
  objectCount: number;
  mapSource: string;
  thumbnailColor: string;
}
