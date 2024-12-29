import { BaseAPI } from "./base-api";
import { AccessTokenMissing, BadRequestError } from "../errors";

export class RewardsAPI extends BaseAPI {
  /**
   * Display the list of pending rewards.
   *
   * Authentication is required.
   */
  async list() {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      tid: crypto.randomUUID(),
    });

    return await this.request<Rewards.RewardList>(
      `/bff/v1/event-rewards?${params.toString()}`
    );
  }

  /**
   * Check if there are any pending rewards.
   *
   * Authentication is required.
   */
  async check() {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      tid: crypto.randomUUID(),
    });

    return await this.request<{ isClaimable: boolean }>(
      `/bff/v1/check-event-rewards?${params.toString()}`
    ).then((res) => res.isClaimable);
  }

  /**
   * Claim all pending rewards.
   *
   * Authentication is required.
   */
  async claim() {
    if (!this.config.accessToken) {
      throw new AccessTokenMissing();
    }

    const params = new URLSearchParams({
      tid: crypto.randomUUID(),
    });

    return await this.request<boolean>(
      `/bff/v1/event-rewards?${params.toString()}`,
      {
        method: "POST",
      }
    )
      .then(() => true)
      .catch((err) => {
        if (err instanceof BadRequestError) {
          return false;
        }
        throw err;
      });
  }
}

export namespace Rewards {
  export type Item = {
    id: number;
    isClaimed: boolean;
    thumbnailImage: string;
    title: string;
    category: string;
    endedAt: string;
  };

  export type RewardList = {
    count: number;
    items: Rewards.Item[];
    claimCount: number;
  };
}
