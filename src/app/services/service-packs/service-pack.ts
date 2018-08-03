import { EnterpiseLevelAddOns } from './enterprise-level-add_ons';
import { UserLevelAddOns } from './user-level-add_ons';
import { UserLevelCollabFeatures } from './user-level-collab-features';
import { UserLevelVoiceFatures } from './user-level-voice-features';
import { Product } from '../catalog/product';
import { Price } from '../catalog/price';


export class ServicePack {
    servicePackId: string;
    servicePackName: string;
    enterpiseLevelAddOns: EnterpiseLevelAddOns;
    userLevelAddOns: UserLevelAddOns;
    userLevelCollabFeatures: UserLevelCollabFeatures;
    userLevelVoiceFatures: UserLevelVoiceFatures;
    products?: Product[];
    price?: Price;

    constructor (sourceObject: Object) {
        this.servicePackId = sourceObject['servicePackId'] || '';
        this.servicePackName = sourceObject['servicePackName'] || '';
        this.enterpiseLevelAddOns = sourceObject['enterpiseLevelAddOns'] || {};
        this.userLevelAddOns = sourceObject['userLevelAddOns'] || {};
        this.userLevelCollabFeatures = sourceObject['userLevelCollabFeatures'] || {};
        this.userLevelVoiceFatures = sourceObject['userLevelVoiceFatures'] || {};
        this.products = sourceObject['products'] || [];
        this.price = sourceObject['price'] || {};
    }
}


