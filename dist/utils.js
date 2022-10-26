"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUnreachable = exports.last = exports.first = exports.firstOrNull = exports.zeroAddress = exports.enforce = void 0;
// =================== GENERAL UTILS =====================
const enforce = (conditional, errorMessage) => {
    if (!conditional)
        throw new Error(errorMessage);
};
exports.enforce = enforce;
exports.zeroAddress = '0x0000000000000000000000000000000000000000';
/// ================== FIRST / LAST IN LIST ======================
const firstOrNull = (array) => {
    if (array.length === 0)
        return null;
    return array[0];
};
exports.firstOrNull = firstOrNull;
const first = (array) => {
    (0, exports.enforce)(array.length > 0, 'First for empty array');
    return array[0];
};
exports.first = first;
const last = (array) => {
    (0, exports.enforce)(array.length > 0, 'Last for empty array');
    return array[array.length - 1];
};
exports.last = last;
// type PromiseType = PromiseType<typeof promisedOne> // => number
const assertUnreachable = (_x) => { throw new Error('Didn\'t expect to get here'); };
exports.assertUnreachable = assertUnreachable;
