"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERole = exports.EStatus = exports.EQualityProfbadge = exports.EPhotoIdType = exports.EAuthProvider = void 0;
// -------------------- Basic Information --------------------
var EAuthProvider;
(function (EAuthProvider) {
    EAuthProvider["CREADIENTIAL"] = "CREADIENTIAL";
    EAuthProvider["GOOGLE"] = "GOOGLE";
    EAuthProvider["APPLE"] = "APPLE";
    EAuthProvider["FACEBOOK"] = "FACEBOOK";
})(EAuthProvider || (exports.EAuthProvider = EAuthProvider = {}));
var EPhotoIdType;
(function (EPhotoIdType) {
    EPhotoIdType["NID_CARD"] = "NID_CARD";
    EPhotoIdType["DRIVING_LICENCE"] = "DRIVING_LICENCE";
    EPhotoIdType["ADHAR_CARD"] = "ADHAR_CARD";
})(EPhotoIdType || (exports.EPhotoIdType = EPhotoIdType = {}));
;
var EQualityProfbadge;
(function (EQualityProfbadge) {
    EQualityProfbadge["EDUCATION"] = "EDUCATION";
    EQualityProfbadge["EMPLOYEMENT"] = "EMPLOYEMENT";
    EQualityProfbadge["INCOME"] = "INCOME";
})(EQualityProfbadge || (exports.EQualityProfbadge = EQualityProfbadge = {}));
;
var EStatus;
(function (EStatus) {
    EStatus["ACCEPT"] = "ACCEPT";
    EStatus["REJECT"] = "REJECT";
    EStatus["REQUEST"] = "REQUEST";
    EStatus["NON"] = "NON";
})(EStatus || (exports.EStatus = EStatus = {}));
;
;
;
var ERole;
(function (ERole) {
    ERole["ADMIN"] = "ADMIN";
    ERole["USER"] = "USER";
})(ERole || (exports.ERole = ERole = {}));
;
//# sourceMappingURL=user.interfaces.js.map