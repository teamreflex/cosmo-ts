import { z } from "zod";
import { BaseAPI } from "./base-api";
import { objektFilterSchema } from "../zod/objekt";
import { AccessTokenMissing } from "../errors";
import { ValidArtist } from "../types/artist-common";

export class ObjektAPI extends BaseAPI {
  /**
   * Get the available objekt filters.
   * Authentication is required.
   */
  async filters(artist?: ValidArtist) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = artist ? `?artistName=${artist}` : "";

    return await this.request<{
      sorts: Filters.Sort[];
      filters: Filters.Filter[];
    }>(`/objekt/v2/filters${params}`);
  }

  /**
   * Get an objekt by its QR/odmq code.
   * Authentication is required.
   */
  async getBySerial(serial: string) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<{
      objekt: Objekt.Objekt;
      isClaimed: boolean;
    }>(`/objekt/v1/by-serial/${serial}`);
  }

  /**
   * Claim an objekt by its QR/odmq code.
   * Authentication is required.
   */
  async claimBySerial(serial: string) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request(`/objekt/v1/by-serial/${serial}/claim`, {
      method: "POST",
    }).then(() => true);
  }

  /**
   * Get the objekts owned by the given address.
   * Authentication is not required.
   */
  async ownedBy(address: Objekt.OwnedBy, filters?: Objekt.CollectionParams) {
    throw new Error("not implemented");
    const params = toSearchParams(
      filters ?? {
        sort: "newest",
        season: [],
        class: [],
        on_offline: [],
      }
    );

    return await this.request(
      `/objekt/v1/owned-by/${address}?${params.toString()}`
    );
  }

  /**
   * Get a single token by its ID.
   * Authentication is not required.
   */
  async token(tokenId: Objekt.TokenId) {
    return await this.request<Objekt.Token>(`/objekt/v1/token/${tokenId}`);
  }

  /**
   * Put two tokens into a lenticular pair.
   * Authentication is required.
   */
  async applyLenticular(tokenA: Objekt.TokenId, tokenB: Objekt.TokenId) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

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
   * Authentication is required.
   */
  async removeLenticular(tokenId: Objekt.TokenId) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<boolean>(`/lenticular/v1/${tokenId}`, {
      method: "DELETE",
    });
  }
}

/**
 * Converts a parsed query string into a Cosmo-compatible URLSearchParams.
 */
function toSearchParams(input: Objekt.CollectionParams): URLSearchParams {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(input)) {
    // filter out empty values
    if (
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }

    switch (typeof value) {
      case "string":
        query.set(key, value);
        break;
      case "boolean":
        if (value) {
          query.set(key, "true");
        }
        break;
      case "object":
        if (Array.isArray(value)) {
          query.set(key, value.join(","));
        }
        break;
    }
  }

  return query;
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

  export type CollectionParams = z.infer<typeof objektFilterSchema>;
}
