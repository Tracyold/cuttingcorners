// components/account/mobile/ui/3ShopFeed.tsx
// Mobile account wrapper around the shared shop feed.
// The fetching and rendering logic lives in components/shared.

import SharedShopFeed from '../../../shared/ShopFeed';

export default function ShopFeed3() {
  return <SharedShopFeed sectionLabel="Shop" savedLabel="Saved Items" />;
}
