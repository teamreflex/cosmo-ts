export function createTestFetcher() {
  return (path: string, method: "GET" | "POST", input = {}) => {
    switch (path) {
      case "/artist/v1":
        return Promise.resolve(getArtists);
      default:
        return Promise.resolve({});
    }
  };
}

export const getArtists = {
  artists: [
    {
      name: "tripleS",
      title: "tripleS",
      logoImageUrl: "https://static.cosmo.fans/assets/triples-logo.png",
      contracts: {
        Como: "0x58AeABfE2D9780c1bFcB713Bf5598261b15dB6e5",
        Objekt: "0xA4B37bE40F7b231Ee9574c4b16b7DDb7EAcDC99B",
        ObjektMinter: "0x3D898E02DFA77a1Ef69Ab8Ec369200a2e48DC5E3",
        Governor: "0xc3E5ad11aE2F00c740E74B81f134426A3331D950",
        CommunityPool: "0xdAE81c4c069c86fea2FC08cfD53a4201D661e447",
        ComoMinter: "0xb8f9925Cb456Da53C8D8E45b7eCA154cc596034c",
      },
    },
    {
      name: "artms",
      title: "ARTMS",
      logoImageUrl: "https://static.cosmo.fans/assets/artms-logo.png",
      contracts: {
        Como: "0x8254D8D2903B20187cBC4Dd833d49cECc219F32E",
        Objekt: "0x0fB69F54bA90f17578a59823E09e5a1f8F3FA200",
        CommunityPool: "0x07F93cCc90aF32E4d6ea70A93F36DF9F58C97087",
        ComoMinter: "0xBda6B6C34b27D54EAaAf555e458199467E77Bb18",
        ObjektMinter: "0x9009e2b4fc02eb18e41994d235a78504600AC87c",
        Governor: "0x8466e6E218F0fe438Ac8f403f684451D20E59Ee3",
      },
    },
  ],
};
