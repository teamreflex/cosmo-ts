import { Config } from "../config";
import { CosmoClient } from "../client";

export class ObjektAPI {
  constructor(private config: Config) {}

  /**
   * Get the available objekt filters.
   */
  async filters(): Promise<FiltersResponse> {
    return await CosmoClient.request<FiltersResponse>(
      `/objekt/v2/filters`,
      this.config
    );
  }

  /**
   * Get an objekt by its QR/odmq code.
   */
  async getBySerial(serial: string): Promise<GetBySerialResponse> {
    return await CosmoClient.request<GetBySerialResponse>(
      `/objekt/v1/by-serial/${serial}`,
      this.config
    );
  }
}

export namespace Filters {
  export type Sort = {
    title: string;
    value: string;
  };

  export type ChipValue = {
    title: string;
    value: string;
    image?: string;
  };

  export type Chip = {
    key: string;
    title: string;
    type: "chip";
    values: ChipValue[];
  };

  export type CategoryToggleValue = {
    title: string;
    value: string;
    image: string;
    category: string;
  };

  export type CategoryToggle = {
    key: string;
    title: string;
    type: "toggle";
    values: CategoryToggle[];
  };

  export type BooleanToggleValue = {
    title: string;
    value: string;
  };

  export type BooleanToggle = {
    key: string;
    title: string;
    type: "toggle";
    values: BooleanToggle[];
  };

  export type Filter = Chip | CategoryToggle | BooleanToggle;
}

export type FiltersResponse = {
  sorts: Filters.Sort[];
  filters: Filters.Filter[];
};

export namespace Objekt {
  export type ObjektBase = {
    collectionId: string;
    season: string;
    member: string;
    collectionNo: string;
    class: string;
    artists: string[];
    thumbnailImage: string;
    frontImage: string;
    backImage: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    comoAmount: number;
    transferableByDefault: boolean;
    tokenId: string;
    tokenAddress: string;
    objektNo: number;
    transferable: boolean;
  };
}

export type GetBySerialResponse = {
  objekt: Objekt.ObjektBase;
  isClaimed: boolean;
};
