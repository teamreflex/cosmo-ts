import { BaseAPI } from "./base-api";

export class ObjektAPI extends BaseAPI {
  /**
   * Get the available objekt filters.
   *
   * Authentication is required.
   */
  async filters() {
    return await this.request<{
      sorts: Filters.Sort[];
      filters: Filters.Filter[];
    }>(`/objekt/v2/filters`);
  }

  /**
   * Get an objekt by its QR/odmq code.
   *
   * Authentication is required.
   */
  async getBySerial(serial: string) {
    return await this.request<{
      objekt: Objekt.Objekt;
      isClaimed: boolean;
    }>(`/objekt/v1/by-serial/${serial}`);
  }

  /**
   * Claim an objekt by its QR/odmq code.
   *
   * Authentication is required.
   */
  async claimBySerial(serial: string) {
    throw new Error("not implemented");
    return await this.request<boolean>(`/objekt/v1/by-serial/${serial}/claim`, {
      method: "POST",
    });
  }

  /**
   * Get the objekts owned by the given address.
   *
   * Authentication is not required.
   */
  async ownedBy(address: Objekt.OwnedBy) {
    throw new Error("not implemented");
    return await this.request(`/objekt/v1/owned-by/${address}`);
  }

  /**
   * Get a single token by its ID.
   *
   * Authentication is not required.
   */
  async token(tokenId: Objekt.TokenId) {
    return await this.request<Objekt.Token>(`/objekt/v1/token/${tokenId}`);
  }

  /**
   * Put two tokens into a lenticular pair.
   *
   * Authentication is required.
   */
  async applyLenticular(tokenA: Objekt.TokenId, tokenB: Objekt.TokenId) {
    throw new Error("not implemented");
    return await this.request<boolean>(`/lenticular/v1`, {
      method: "POST",
      body: JSON.stringify({
        pairATokenId: tokenA,
        pairBTokenId: tokenB,
      }),
    });
  }

  /**
   * Remove a token from a lenticular pair.
   *
   * Authentication is required.
   */
  async removeLenticular(tokenId: Objekt.TokenId) {
    throw new Error("not implemented");
    return await this.request<boolean>(`/lenticular/v1/${tokenId}`, {
      method: "DELETE",
    });
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

export namespace Objekt {
  export type TokenId = string | number;
  export type OwnedBy = "me" | (string & {});

  export type Objekt = {
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

  export type Token = {
    name: string;
    description: string;
    image: string;
    background_color: string;
    attributes: Attribute[];
    objekt: Objekt;
  };

  export type Attribute = {
    trait_type: string;
    value: string;
  };
}
