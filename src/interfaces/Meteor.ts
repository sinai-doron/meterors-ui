export default interface Meteor {
    name: string;
    id: number;
    nametype: 'Valid';
    recclass: string;
    mass?: number;
    fall: 'Fell' | 'Found'
    year?: number;
    reclat?: string;
    reclong?: string;
    geolocation?: {
        type: "Point",
        coordinates: [number, number]
    };
    ':@computed_region_cbhk_fwbd'?: string;
    ':@computed_region_nnqa_25f4'?: string;
  }