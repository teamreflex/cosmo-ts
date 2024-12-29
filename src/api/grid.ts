import { BaseAPI } from "./base-api";
import { AccessTokenMissing, BadRequestError, CosmoError } from "../errors";
import { ValidArtist } from "./legacy-artist";

export class GridAPI extends BaseAPI {
  /**
   * Get the grid status/counts for the given artist.
   *
   * Authentication is required.
   */
  async artistStatus(artist: ValidArtist) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<Grid.Status>(`/grid/v3/${artist}/status`);
  }

  /**
   * Get the list of editions for the given artist.
   *
   * Authentication is required.
   */
  async editions(artist: ValidArtist) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<{ editions: Grid.Edition[] }>(
      `/grid/v3/${artist}/edition`
    ).then((res) => res.editions);
  }

  /**
   * Get the required objekts and rewards for the given edition.
   *
   * Authentication is required.
   */
  async editionGrids(edition: string) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<{ grids: Grid.Grid[] }>(
      `/grid/v2/edition/${edition}`
    ).then((res) => res.grids);
  }

  /**
   * Get the current state of the given grid.
   *
   * Authentication is required.
   */
  async gridStatus(gridId: string) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<{ grids: Grid.OngoingGrid }>(
      `/grid/v1/${gridId}/status`
    );
  }

  /**
   * Complete a grid.
   *
   * Authentication is required.
   */
  async complete(gridId: string, slots: Grid.SlotCompletion[]) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    // check for duplicate slot numbers
    const objektNos = new Set(slots.map((s) => s.no));
    if (objektNos.size !== slots.length) {
      throw new Grid.DuplicateSlotError();
    }

    // check for duplicate tokenIds
    const tokenIds = new Set(slots.map((s) => s.tokenIdToUse));
    if (tokenIds.size !== slots.length) {
      throw new Grid.DuplicateTokenError();
    }

    // check for lengths
    if (slots.length !== 4 && slots.length !== 8) {
      throw new Grid.InvalidSlotLengthError();
    }

    return await this.request<boolean>(`/grid/v1/${gridId}/complete`, {
      method: "POST",
      body: JSON.stringify({ slots }),
    }).then(() => true);
  }

  /**
   * Claim a grid reward.
   * Must be called after {@link complete}.
   *
   * Authentication is required.
   */
  async claim(gridId: string) {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    return await this.request<Grid.RewardClaim>(
      `/grid/v1/${gridId}/claim-reward`,
      {
        method: "POST",
      }
    ).catch((err) => {
      if (err instanceof BadRequestError) {
        throw new Grid.NotCompletedError(gridId);
      }
      throw err;
    });
  }
}

export namespace Grid {
  export type Status = {
    totalCompletedGrids: number;
    totalSpecialObjekts: number;
  };

  export type Edition = {
    id: string;
    artist: ValidArtist;
    title: string;
    subtitle: string;
    image: string;
    order: number;
    createdAt: string;
    status: {
      totalGrids: number;
      completedGrids: number;
    };
    season: {
      createdAt: string;
      createdBy: string;
      updatedAt: string;
      activeAt: string;
      order: number;
      id: number;
      artist: ValidArtist;
      title: string;
      image: string | null;
      startDate: string;
      endDate: string;
      ongoing: boolean;
    };
  };

  export type GridSlot = {
    no: number;
    collections: string[];
  };

  export type GridReward = {
    collectionId: string;
  };

  export type Grid = {
    id: string;
    member: string;
    memberImage: string;
    class: "First";
    edition: {
      createdAt: string;
      createdBy: string;
      updatedAt: string;
      activeAt: string;
      order: number;
      id: string;
      artist: ValidArtist;
      title: string;
      subtitle: string;
      image: string;
      season: {
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        activeAt: string;
        order: number;
        id: number;
        artist: ValidArtist;
        title: string;
        image: string | null;
        startDate: string;
        endDate: string | null;
      };
    };
    slots: GridSlot[];
    reward: GridReward[];
  };

  export type SlotObjekt = {
    collectionId: string;
    season: string;
    member: string;
    collectionNo: string;
    class: string;
    artists: ValidArtist[];
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

  export type OngoingSlotWithoutPreferred = {
    no: number;
    completed: false;
    preferredObjekt: undefined;
  };

  export type OngoingSlotWithPreferred = {
    no: number;
    completed: false;
    preferredObjekt: SlotObjekt;
  };

  export type OngoingSlot =
    | OngoingSlotWithoutPreferred
    | OngoingSlotWithPreferred;

  export type OngoingGrid = {
    ongoing: {
      id: number;
      slotStatuses: OngoingSlot[];
      allCompleted: boolean;
      rewardClaimed: boolean;
    };
    ownedRewardObjektCount: number;
  };

  export type SlotCompletion = {
    no: number;
    tokenIdToUse: string;
  };

  export type RewardClaim = {
    objekt: {
      collectionId: string;
      season: string;
      member: string;
      collectionNo: string;
      class: "Special";
      artists: ValidArtist[];
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
    transaction: {
      txId: string;
      chainId: string;
      ref: string;
    };
  };

  export class DuplicateSlotError extends CosmoError {
    constructor() {
      super(400, `duplicate objekt slots in use`);
    }
  }

  export class DuplicateTokenError extends CosmoError {
    constructor() {
      super(400, `duplicate token ids in use`);
    }
  }

  export class InvalidSlotLengthError extends CosmoError {
    constructor() {
      super(400, `grids must have 4 or 8 slots`);
    }
  }

  export class NotCompletedError extends CosmoError {
    constructor(public gridId: string) {
      super(400, `grid "${gridId}" has not been completed yet`);
    }
  }
}
