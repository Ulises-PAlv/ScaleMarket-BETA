// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export class SQL {
  get: any = {
    allUsers: '/users',
    allUsersSafe: '/users/safe',
    userByID: '/user/',
    userByIdSafe: '/user/safe/',
    bannedUsers: '/users/banned',
    allCommunities: '/communities',
    communityByID: '/community/',
    allMembers: '/members',
    userCommunities: '/user/member/',
    membersOfCommunities: '/community/members/',
    allCastings: '/castings',
    verifiedCastings: '/castings/verified',
    castingByID: '/casting/',
    allPacks: '/packs',
    verifiedPacks: '/packs/verified',
    packByID: '/pack/',
    allWareHouseNotSold: '/warehouse',
    allWareHouse: '/all/warehouse',
    warehouseToBuy: '/warehouse/shop',
    warehouseToStore: '/warehouse/store',
    warehouseToTrade: '/warehouse/trade',
    warehousePacks: '/warehouse/packs',
    warehouseCastings: '/warehouse/castings',
    warehouseLoose: '/warehouse/loose',
    userWarehouse: '/warehouse/user/',
    itemWarehouse: '/warehouse/item/', // ?? '/warehouse/item/:type/:id'
    allTradeWishes: '/all/tradewishes',
    tradewishByID: '/tradewish/item/',
    prospectsByItem: '/prospects/item/',
    prospectsByUser: '/prospects/user/',
    prospectsByOwner: '/prospects/user/owner/'
  };

  post: any = {
    user: '/user',
    banUser: '/user/banned',
    community: '/community',
    member: '/member',
    casting: '/casting',
    pack: '/pack',
    warehouse: '/warehouse/item',
    tradewish: '/tradewish',
    prospect: '/prospect',

  };

  put: any = {
    addUserInfo: '/add/user/information/',
    updateUserLocation: '/update/user/location/',
    updateUserStatus: '/update/user/status/',
    updateUserDescription: '/update/user/description/',
    updateUserTransactions: '/update/user/transactions/',
    updateUserStrikes: '/update/user/strikes/',
    updateCommunityDescription: '/update/community/description/',
    castingCorrectionToVerify: '/update/casting/verify/correction/',
    verifyCasting: '/update/casting/verify/',
    packCorrectionToVerify: '/update/pack/verify/correction/',
    verifyPack: '/update/pack/verify/',
    restockItem: '/update/warehouse/restock/',
    soldOutItem: '/update/warehouse/soldOut/',
    updateItemQuantity: '/update/warehouse/stock/quantity/',
    updateNegotiableBandItem: '/update/warehouse/negotiable/',
    updateTradeBandItem: '/update/warehouse/trade/',
    updateStoreBandItem: '/update/warehouse/toStoreOrSell/',
    updateProspectTurn: '/update/propsect/turn/'
  };

  delete: any = {
    casting: '/delete/casting/',
    pack: '/delete/pack',
    removeTurn: '/delete/prospectstmp/turn/',
    removeItemTurns: '/delete/prospectstmp/item/'
  };
}

export class ATLAS {
  get: any = {

  };

  post: any = {

  };

  put: any = {

  };
}

export class ServerDirections {
  mysql_url: string = 'http://localhost:3000';
  atlas_url: string = 'http://localhost:5000';
  mail_assistant: string = 'http://localhost:3001';
  face_recognition: string = 'http://localhost:3002';
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
