export interface SchemaOption {
  label: string;
  value: string;
  trait: 'user' | 'group';
}

export interface SelectedSchema {
  id: string;
  value: string;
  label: string;
}

export interface SegmentData {
  segment_name: string;
  schema: Array<{ [key: string]: string }>;
}

