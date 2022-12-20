/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*jshint bitwise: true, camelcase: false, curly: false, eqeqeq: true,
         es5: true, forin: true, immed: true, indent: 4, latedef: false,
         newcap: false, noarg: true, noempty: true, nonew: true,
         plusplus: false, quotmark: false, regexp: true, undef: true,
         unused: false, strict: false, trailing: true,
*/

/*global ToObject: false, ToInteger: false, IsCallable: false, ThrowError: false,
         AssertionFailed: false, MakeConstructible: false, DecompileArg: false,
         RuntimeDefaultLocale: false,
         callFunction: false,
         IS_UNDEFINED: false, TO_UINT32: false,
         22: false, 227: false,
         218: false,
*/


/* cache built-in functions before applications can change them */
var std_isFinite = isFinite;
var std_isNaN = isNaN;
var std_Array_indexOf = ArrayIndexOf;
var std_Array_join = Array.prototype.join;
var std_Array_push = Array.prototype.push;
var std_Array_shift = Array.prototype.shift;
var std_Array_slice = Array.prototype.slice;
var std_Array_sort = Array.prototype.sort;
var std_Boolean_toString = Boolean.prototype.toString;
var Std_Date = Date;
var std_Date_now = Date.now;
var std_Function_bind = Function.prototype.bind;
var std_Math_floor = Math.floor;
var std_Math_max = Math.max;
var std_Math_min = Math.min;
var std_Object_create = Object.create;
var std_Object_defineProperty = Object.defineProperty;
var std_Object_getOwnPropertyNames = Object.getOwnPropertyNames;
var std_Object_hasOwnProperty = Object.prototype.hasOwnProperty;
var std_RegExp_test = RegExp.prototype.test;
var Std_String = String;
var std_String_indexOf = String.prototype.indexOf;
var std_String_lastIndexOf = String.prototype.lastIndexOf;
var std_String_match = String.prototype.match;
var std_String_replace = String.prototype.replace;
var std_String_split = String.prototype.split;
var std_String_startsWith = String.prototype.startsWith;
var std_String_substring = String.prototype.substring;
var std_String_toLowerCase = String.prototype.toLowerCase;
var std_String_toUpperCase = String.prototype.toUpperCase;


/********** List specification type **********/


/* Spec: ECMAScript Language Specification, 5.1 edition, 8.8 */
function List() {
    if ((typeof(List.prototype) === 'undefined')) {
        var proto = std_Object_create(null);
        proto.indexOf = std_Array_indexOf;
        proto.join = std_Array_join;
        proto.push = std_Array_push;
        proto.slice = std_Array_slice;
        proto.sort = std_Array_sort;
        List.prototype = proto;
    }
}
MakeConstructible(List);


/********** Record specification type **********/


/* Spec: ECMAScript Internationalization API Specification, draft, 5 */
function Record() {
    return std_Object_create(null);
}
MakeConstructible(Record);


/********** Abstract operations defined in ECMAScript Language Specification **********/


/* Spec: ECMAScript Language Specification, 5.1 edition, 8.12.6 and 11.8.7 */
function HasProperty(o, p) {
    return p in o;
}


/* Spec: ECMAScript Language Specification, 5.1 edition, 9.2 and 11.4.9 */
function ToBoolean(v) {
    return !!v;
}


/* Spec: ECMAScript Language Specification, 5.1 edition, 9.3 and 11.4.6 */
function ToNumber(v) {
    return +v;
}


/* Spec: ECMAScript Language Specification, 5.1 edition, 9.8 and 15.2.1.1 */
function ToString(v) {
    assert(arguments.length > 0, "__toString");
    return Std_String(v);
}


/********** Various utility functions **********/


/** Returns true iff Type(v) is Object; see ES5 8.6. */
function IsObject(v) {
    // Watch out for |typeof null === "object"| as the most obvious pitfall.
    // But also be careful of SpiderMonkey's objects that emulate undefined
    // (i.e. |document.all|), which have bogus |typeof| behavior.  Detect
    // these objects using strict equality, which said bogosity doesn't affect.
    return (typeof v === "object" && v !== null) ||
           (typeof v === "undefined" && v !== undefined);
}


/********** Assertions **********/


function assert(b, info) {
    if (!b)
        AssertionFailed(info);
}

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

 /* ES5 15.4.4.14. */
function ArrayIndexOf(searchElement/*, fromIndex*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (len === 0)
        return -1;

    /* Step 5. */
    var n = arguments.length > 1 ? ToInteger(arguments[1]) : 0;

    /* Step 6. */
    if (n >= len)
        return -1;

    var k;
    /* Step 7. */
    if (n >= 0)
        k = n;
    /* Step 8. */
    else {
        /* Step a. */
        k = len + n;
        /* Step b. */
        if (k < 0)
            k = 0;
    }

    /* Step 9. */
    for (; k < len; k++) {
        if (k in O && O[k] === searchElement)
            return k;
    }

    /* Step 10. */
    return -1;
}

function ArrayStaticIndexOf(list, searchElement/*, fromIndex*/) {
    if (arguments.length < 1)
        ThrowError(227, 0, 'Array.indexOf');
    var fromIndex = arguments.length > 2 ? arguments[2] : 0;
    return callFunction(ArrayIndexOf, list, searchElement, fromIndex);
}

/* ES5 15.4.4.15. */
function ArrayLastIndexOf(searchElement/*, fromIndex*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (len === 0)
        return -1;

    /* Step 5. */
    var n = arguments.length > 1 ? ToInteger(arguments[1]) : len - 1;

    /* Steps 6-7. */
    var k;
    if (n > len - 1)
        k = len - 1;
    else if (n < 0)
        k = len + n;
    else
        k = n;

    /* Step 8. */
    for (; k >= 0; k--) {
        if (k in O && O[k] === searchElement)
            return k;
    }

    /* Step 9. */
    return -1;
}

function ArrayStaticLastIndexOf(list, searchElement/*, fromIndex*/) {
    if (arguments.length < 1)
        ThrowError(227, 0, 'Array.lastIndexOf');
    var fromIndex;
    if (arguments.length > 2) {
        fromIndex = arguments[2];
    } else {
        var O = ToObject(list);
        var len = (O.length >>> 0);
        fromIndex = len - 1;
    }
    return callFunction(ArrayLastIndexOf, list, searchElement, fromIndex);
}

/* ES5 15.4.4.16. */
function ArrayEvery(callbackfn/*, thisArg*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.every');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));

    /* Step 5. */
    var T = arguments.length > 1 ? arguments[1] : void 0;

    /* Steps 6-7. */
    /* Steps a (implicit), and d. */
    for (var k = 0; k < len; k++) {
        /* Step b */
        if (k in O) {
            /* Step c. */
            if (!callFunction(callbackfn, T, O[k], k, O))
                return false;
        }
    }

    /* Step 8. */
    return true;
}

function ArrayStaticEvery(list, callbackfn/*, thisArg*/) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.every');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    return callFunction(ArrayEvery, list, callbackfn, T);
}

/* ES5 15.4.4.17. */
function ArraySome(callbackfn/*, thisArg*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.some');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));

    /* Step 5. */
    var T = arguments.length > 1 ? arguments[1] : void 0;

    /* Steps 6-7. */
    /* Steps a (implicit), and d. */
    for (var k = 0; k < len; k++) {
        /* Step b */
        if (k in O) {
            /* Step c. */
            if (callFunction(callbackfn, T, O[k], k, O))
                return true;
        }
    }

    /* Step 8. */
    return false;
}

function ArrayStaticSome(list, callbackfn/*, thisArg*/) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.some');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    return callFunction(ArraySome, list, callbackfn, T);
}

/* ES5 15.4.4.18. */
function ArrayForEach(callbackfn/*, thisArg*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.forEach');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));

    /* Step 5. */
    var T = arguments.length > 1 ? arguments[1] : void 0;

    /* Steps 6-7. */
    /* Steps a (implicit), and d. */
    for (var k = 0; k < len; k++) {
        /* Step b */
        if (k in O) {
            /* Step c. */
            callFunction(callbackfn, T, O[k], k, O);
        }
    }

    /* Step 8. */
    return void 0;
}

function ArrayStaticForEach(list, callbackfn/*, thisArg*/) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.forEach');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    var T = arguments.length > 2 ? arguments[2] : void 0;
    callFunction(ArrayForEach, list, callbackfn, T);
}

/* ES5 15.4.4.21. */
function ArrayReduce(callbackfn/*, initialValue*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.reduce');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));

    /* Step 6. */
    var k = 0;

    /* Steps 5, 7-8. */
    var accumulator;
    if (arguments.length > 1) {
        accumulator = arguments[1];
    } else {
        /* Step 5. */
        if (len === 0)
            ThrowError(218);
        var kPresent = false;
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k];
                kPresent = true;
                k++;
                break;
            }
        }
        if (!kPresent)
            ThrowError(218);
    }

    /* Step 9. */
    /* Steps a (implicit), and d. */
    for (; k < len; k++) {
        /* Step b */
        if (k in O) {
            /* Step c. */
            accumulator = callbackfn(accumulator, O[k], k, O);
        }
    }

    /* Step 10. */
    return accumulator;
}

function ArrayStaticReduce(list, callbackfn) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.reduce');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    if (arguments.length > 2)
        return callFunction(ArrayReduce, list, callbackfn, arguments[2]);
    else
        return callFunction(ArrayReduce, list, callbackfn);
}

/* ES5 15.4.4.22. */
function ArrayReduceRight(callbackfn/*, initialValue*/) {
    /* Step 1. */
    var O = ToObject(this);

    /* Steps 2-3. */
    var len = (O.length >>> 0);

    /* Step 4. */
    if (arguments.length === 0)
        ThrowError(227, 0, 'Array.prototype.reduce');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(0, callbackfn));

    /* Step 6. */
    var k = len - 1;

    /* Steps 5, 7-8. */
    var accumulator;
    if (arguments.length > 1) {
        accumulator = arguments[1];
    } else {
        /* Step 5. */
        if (len === 0)
            ThrowError(218);
        var kPresent = false;
        for (; k >= 0; k--) {
            if (k in O) {
                accumulator = O[k];
                kPresent = true;
                k--;
                break;
            }
        }
        if (!kPresent)
            ThrowError(218);
    }

    /* Step 9. */
    /* Steps a (implicit), and d. */
    for (; k >= 0; k--) {
        /* Step b */
        if (k in O) {
            /* Step c. */
            accumulator = callbackfn(accumulator, O[k], k, O);
        }
    }

    /* Step 10. */
    return accumulator;
}

function ArrayStaticReduceRight(list, callbackfn) {
    if (arguments.length < 2)
        ThrowError(227, 0, 'Array.reduceRight');
    if (!IsCallable(callbackfn))
        ThrowError(22, DecompileArg(1, callbackfn));
    if (arguments.length > 2)
        return callFunction(ArrayReduceRight, list, callbackfn, arguments[2]);
    else
        return callFunction(ArrayReduceRight, list, callbackfn);
}
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Portions Copyright Norbert Lindenberg 2011-2012. */

/*global 327: false, 328: false,
         329: false, 330: false,
         331: false, 332: false,
         333: false, 334: false,
         335: false, 336: false,
         337: false,
*/


/********** Locales, Time Zones, and Currencies **********/


/**
 * Convert s to upper case, but limited to characters a-z.
 *
 * Spec: ECMAScript Internationalization API Specification, 6.1.
 */
function toASCIIUpperCase(s) {
    assert(typeof s === "string", "toASCIIUpperCase");

    // String.prototype.toUpperCase may map non-ASCII characters into ASCII,
    // so go character by character (actually code unit by code unit, but
    // since we only care about ASCII characters here, that's OK).
    var result = "";
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if ("a" <= c && c <= "z")
            c = callFunction(std_String_toUpperCase, c);
        result += c;
    }
    return result;
}


/**
 * Regular expression matching a "Unicode locale extension sequence", which the
 * specification defines as: "any substring of a language tag that starts with
 * a separator '-' and the singleton 'u' and includes the maximum sequence of
 * following non-singleton subtags and their preceding '-' separators."
 *
 * Alternatively, this may be defined as: the components of a language tag that
 * match the extension production in RFC 5646, where the singleton component is
 * "u".
 *
 * Spec: ECMAScript Internationalization API Specification, 6.2.1.
 */
var unicodeLocaleExtensionSequence = "-u(-[a-z0-9]{2,8})+";
var unicodeLocaleExtensionSequenceRE = new RegExp(unicodeLocaleExtensionSequence);
var unicodeLocaleExtensionSequenceGlobalRE = new RegExp(unicodeLocaleExtensionSequence, "g");


/**
 * Regular expression defining BCP 47 language tags.
 *
 * Spec: RFC 5646 section 2.1.
 */
var languageTagRE = (function () {
    // RFC 5234 section B.1
    // ALPHA          =  %x41-5A / %x61-7A   ; A-Z / a-z
    var ALPHA = "[a-zA-Z]";
    // DIGIT          =  %x30-39
    //                        ; 0-9
    var DIGIT = "[0-9]";

    // RFC 5646 section 2.1
    // alphanum      = (ALPHA / DIGIT)     ; letters and numbers
    var alphanum = "(?:" + ALPHA + "|" + DIGIT + ")";
    // regular       = "art-lojban"        ; these tags match the 'langtag'
    //               / "cel-gaulish"       ; production, but their subtags
    //               / "no-bok"            ; are not extended language
    //               / "no-nyn"            ; or variant subtags: their meaning
    //               / "zh-guoyu"          ; is defined by their registration
    //               / "zh-hakka"          ; and all of these are deprecated
    //               / "zh-min"            ; in favor of a more modern
    //               / "zh-min-nan"        ; subtag or sequence of subtags
    //               / "zh-xiang"
    var regular = "(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)";
    // irregular     = "en-GB-oed"         ; irregular tags do not match
    //                / "i-ami"             ; the 'langtag' production and
    //                / "i-bnn"             ; would not otherwise be
    //                / "i-default"         ; considered 'well-formed'
    //                / "i-enochian"        ; These tags are all valid,
    //                / "i-hak"             ; but most are deprecated
    //                / "i-klingon"         ; in favor of more modern
    //                / "i-lux"             ; subtags or subtag
    //                / "i-mingo"           ; combination
    //                / "i-navajo"
    //                / "i-pwn"
    //                / "i-tao"
    //                / "i-tay"
    //                / "i-tsu"
    //                / "sgn-BE-FR"
    //                / "sgn-BE-NL"
    //                / "sgn-CH-DE"
    var irregular = "(?:en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)";
    // grandfathered = irregular           ; non-redundant tags registered
    //               / regular             ; during the RFC 3066 era
    var grandfathered = "(?:" + irregular + "|" + regular + ")";
    // privateuse    = "x" 1*("-" (1*8alphanum))
    var privateuse = "(?:x(?:-[a-z0-9]{1,8})+)";
    // singleton     = DIGIT               ; 0 - 9
    //               / %x41-57             ; A - W
    //               / %x59-5A             ; Y - Z
    //               / %x61-77             ; a - w
    //               / %x79-7A             ; y - z
    var singleton = "(?:" + DIGIT + "|[A-WY-Za-wy-z])";
    // extension     = singleton 1*("-" (2*8alphanum))
    var extension = "(?:" + singleton + "(?:-" + alphanum + "{2,8})+)";
    // variant       = 5*8alphanum         ; registered variants
    //               / (DIGIT 3alphanum)
    var variant = "(?:" + alphanum + "{5,8}|(?:" + DIGIT + alphanum + "{3}))";
    // region        = 2ALPHA              ; ISO 3166-1 code
    //               / 3DIGIT              ; UN M.49 code
    var region = "(?:" + ALPHA + "{2}|" + DIGIT + "{3})";
    // script        = 4ALPHA              ; ISO 15924 code
    var script = "(?:" + ALPHA + "{4})";
    // extlang       = 3ALPHA              ; selected ISO 639 codes
    //                 *2("-" 3ALPHA)      ; permanently reserved
    var extlang = "(?:" + ALPHA + "{3}(?:-" + ALPHA + "{3}){0,2})";
    // language      = 2*3ALPHA            ; shortest ISO 639 code
    //                 ["-" extlang]       ; sometimes followed by
    //                                     ; extended language subtags
    //               / 4ALPHA              ; or reserved for future use
    //               / 5*8ALPHA            ; or registered language subtag
    var language = "(?:" + ALPHA + "{2,3}(?:-" + extlang + ")?|" + ALPHA + "{4}|" + ALPHA + "{5,8})";
    // langtag       = language
    //                 ["-" script]
    //                 ["-" region]
    //                 *("-" variant)
    //                 *("-" extension)
    //                 ["-" privateuse]
    var langtag = language + "(?:-" + script + ")?(?:-" + region + ")?(?:-" +
                  variant + ")*(?:-" + extension + ")*(?:-" + privateuse + ")?";
    // Language-Tag  = langtag             ; normal language tags
    //               / privateuse          ; private use tag
    //               / grandfathered       ; grandfathered tags
    var languageTag = "^(?:" + langtag + "|" + privateuse + "|" + grandfathered + ")$";

    // Language tags are case insensitive (RFC 5646 section 2.1.1).
    return new RegExp(languageTag, "i");
}());


var duplicateVariantRE = (function () {
    // RFC 5234 section B.1
    // ALPHA          =  %x41-5A / %x61-7A   ; A-Z / a-z
    var ALPHA = "[a-zA-Z]";
    // DIGIT          =  %x30-39
    //                        ; 0-9
    var DIGIT = "[0-9]";

    // RFC 5646 section 2.1
    // alphanum      = (ALPHA / DIGIT)     ; letters and numbers
    var alphanum = "(?:" + ALPHA + "|" + DIGIT + ")";
    // variant       = 5*8alphanum         ; registered variants
    //               / (DIGIT 3alphanum)
    var variant = "(?:" + alphanum + "{5,8}|(?:" + DIGIT + alphanum + "{3}))";

    // Match a langtag that contains a duplicate variant.
    var duplicateVariant =
        // Match everything in a langtag prior to any variants, and maybe some
        // of the variants as well (which makes this pattern inefficient but
        // not wrong, for our purposes);
        "(?:" + alphanum + "{2,8}-)+" +
        // a variant, parenthesised so that we can refer back to it later;
        "(" + variant + ")-" +
        // zero or more subtags at least two characters long (thus stopping
        // before extension and privateuse components);
        "(?:" + alphanum + "{2,8}-)*" +
        // and the same variant again
        "\\1" +
        // ...but not followed by any characters that would turn it into a
        // different subtag.
        "(?!" + alphanum + ")";

    // Language tags are case insensitive (RFC 5646 section 2.1.1), but for
    // this regular expression that's covered by having its character classes
    // list both upper- and lower-case characters.
    return new RegExp(duplicateVariant);
}());


var duplicateSingletonRE = (function () {
    // RFC 5234 section B.1
    // ALPHA          =  %x41-5A / %x61-7A   ; A-Z / a-z
    var ALPHA = "[a-zA-Z]";
    // DIGIT          =  %x30-39
    //                        ; 0-9
    var DIGIT = "[0-9]";

    // RFC 5646 section 2.1
    // alphanum      = (ALPHA / DIGIT)     ; letters and numbers
    var alphanum = "(?:" + ALPHA + "|" + DIGIT + ")";
    // singleton     = DIGIT               ; 0 - 9
    //               / %x41-57             ; A - W
    //               / %x59-5A             ; Y - Z
    //               / %x61-77             ; a - w
    //               / %x79-7A             ; y - z
    var singleton = "(?:" + DIGIT + "|[A-WY-Za-wy-z])";

    // Match a langtag that contains a duplicate singleton.
    var duplicateSingleton =
        // Match a singleton subtag, parenthesised so that we can refer back to
        // it later;
        "-(" + singleton + ")-" +
        // then zero or more subtags;
        "(?:" + alphanum + "+-)*" +
        // and the same singleton again
        "\\1" +
        // ...but not followed by any characters that would turn it into a
        // different subtag.
        "(?!" + alphanum + ")";

    // Language tags are case insensitive (RFC 5646 section 2.1.1), but for
    // this regular expression that's covered by having its character classes
    // list both upper- and lower-case characters.
    return new RegExp(duplicateSingleton);
}());


/**
 * Verifies that the given string is a well-formed BCP 47 language tag
 * with no duplicate variant or singleton subtags.
 *
 * Spec: ECMAScript Internationalization API Specification, 6.2.2.
 */
function IsStructurallyValidLanguageTag(locale) {
    assert(typeof locale === "string", "IsStructurallyValidLanguageTag");
    if (!callFunction(std_RegExp_test, languageTagRE, locale))
        return false;

    // Before checking for duplicate variant or singleton subtags with
    // regular expressions, we have to get private use subtag sequences
    // out of the picture.
    if (callFunction(std_String_startsWith, locale, "x-"))
        return true;
    var pos = callFunction(std_String_indexOf, locale, "-x-");
    if (pos !== -1)
        locale = callFunction(std_String_substring, locale, 0, pos);

    // Check for duplicate variant or singleton subtags.
    return !callFunction(std_RegExp_test, duplicateVariantRE, locale) &&
           !callFunction(std_RegExp_test, duplicateSingletonRE, locale);
}


/**
 * Canonicalizes the given structurally valid BCP 47 language tag, including
 * regularized case of subtags. For example, the language tag
 * Zh-NAN-haNS-bu-variant2-Variant1-u-ca-chinese-t-Zh-laTN-x-PRIVATE, where
 *
 *     Zh             ; 2*3ALPHA
 *     -NAN           ; ["-" extlang]
 *     -haNS          ; ["-" script]
 *     -bu            ; ["-" region]
 *     -variant2      ; *("-" variant)
 *     -Variant1
 *     -u-ca-chinese  ; *("-" extension)
 *     -t-Zh-laTN
 *     -x-PRIVATE     ; ["-" privateuse]
 *
 * becomes nan-Hans-mm-variant2-variant1-t-zh-latn-u-ca-chinese-x-private
 *
 * Spec: ECMAScript Internationalization API Specification, 6.2.3.
 * Spec: RFC 5646, section 4.5.
 */
function CanonicalizeLanguageTag(locale) {
    assert(IsStructurallyValidLanguageTag(locale), "CanonicalizeLanguageTag");

    // The input
    // "Zh-NAN-haNS-bu-variant2-Variant1-u-ca-chinese-t-Zh-laTN-x-PRIVATE"
    // will be used throughout this method to illustrate how it works.

    // Language tags are compared and processed case-insensitively, so
    // technically it's not necessary to adjust case. But for easier processing,
    // and because the canonical form for most subtags is lower case, we start
    // with lower case for all.
    // "Zh-NAN-haNS-bu-variant2-Variant1-u-ca-chinese-t-Zh-laTN-x-PRIVATE" ->
    // "zh-nan-hans-bu-variant2-variant1-u-ca-chinese-t-zh-latn-x-private"
    locale = callFunction(std_String_toLowerCase, locale);

    // Handle mappings for complete tags.
    if (callFunction(std_Object_hasOwnProperty, langTagMappings, locale))
        return langTagMappings[locale];

    var subtags = callFunction(std_String_split, locale, "-");
    var i = 0;

    // Handle the standard part: All subtags before the first singleton or "x".
    // "zh-nan-hans-bu-variant2-variant1"
    while (i < subtags.length) {
        var subtag = subtags[i];

        // If we reach the start of an extension sequence or private use part,
        // we're done with this loop. We have to check for i > 0 because for
        // irregular language tags, such as i-klingon, the single-character
        // subtag "i" is not the start of an extension sequence.
        // In the example, we break at "u".
        if (subtag.length === 1 && (i > 0 || subtag === "x"))
            break;

        if (subtag.length === 4) {
            // 4-character subtags are script codes; their first character
            // needs to be capitalized. "hans" -> "Hans"
            subtag = callFunction(std_String_toUpperCase, subtag[0]) +
                     callFunction(std_String_substring, subtag, 1);
        } else if (i !== 0 && subtag.length === 2) {
            // 2-character subtags that are not in initial position are region
            // codes; they need to be upper case. "bu" -> "BU"
            subtag = callFunction(std_String_toUpperCase, subtag);
        }
        if (callFunction(std_Object_hasOwnProperty, langSubtagMappings, subtag)) {
            // Replace deprecated subtags with their preferred values.
            // "BU" -> "MM"
            // This has to come after we capitalize region codes because
            // otherwise some language and region codes could be confused.
            // For example, "in" is an obsolete language code for Indonesian,
            // but "IN" is the country code for India.
            // Note that the script generating langSubtagMappings makes sure
            // that no regular subtag mapping will replace an extlang code.
            subtag = langSubtagMappings[subtag];
        } else if (callFunction(std_Object_hasOwnProperty, extlangMappings, subtag)) {
            // Replace deprecated extlang subtags with their preferred values,
            // and remove the preceding subtag if it's a redundant prefix.
            // "zh-nan" -> "nan"
            // Note that the script generating extlangMappings makes sure that
            // no extlang mapping will replace a normal language code.
            subtag = extlangMappings[subtag].preferred;
            if (i === 1 && extlangMappings[subtag].prefix === subtags[0]) {
                callFunction(std_Array_shift, subtags);
                i--;
            }
        }
        subtags[i] = subtag;
        i++;
    }
    var normal = callFunction(std_Array_join, callFunction(std_Array_slice, subtags, 0, i), "-");

    // Extension sequences are sorted by their singleton characters.
    // "u-ca-chinese-t-zh-latn" -> "t-zh-latn-u-ca-chinese"
    var extensions = new List();
    while (i < subtags.length && subtags[i] !== "x") {
        var extensionStart = i;
        i++;
        while (i < subtags.length && subtags[i].length > 1)
            i++;
        var extension = callFunction(std_Array_join, callFunction(std_Array_slice, subtags, extensionStart, i), "-");
        extensions.push(extension);
    }
    extensions.sort();

    // Private use sequences are left as is. "x-private"
    var privateUse = "";
    if (i < subtags.length)
        privateUse = callFunction(std_Array_join, callFunction(std_Array_slice, subtags, i), "-");

    // Put everything back together.
    var canonical = normal;
    if (extensions.length > 0)
        canonical += "-" + extensions.join("-");
    if (privateUse.length > 0) {
        // Be careful of a Language-Tag that is entirely privateuse.
        if (canonical.length > 0)
            canonical += "-" + privateUse;
        else
            canonical = privateUse;
    }

    return canonical;
}


/**
 * Verifies that the given string is a well-formed ISO 4217 currency code.
 *
 * Spec: ECMAScript Internationalization API Specification, 6.3.1.
 */
function IsWellFormedCurrencyCode(currency) {
    var c = ToString(currency);
    var normalized = toASCIIUpperCase(c);
    if (normalized.length !== 3)
        return false;
    return !callFunction(std_RegExp_test, /[^A-Z]/, normalized);
}


/********** Locale and Parameter Negotiation **********/


/**
 * Add old-style language tags without script code for locales that in current
 * usage would include a script subtag. Returns the availableLocales argument
 * provided.
 *
 * Spec: ECMAScript Internationalization API Specification, 9.1.
 */
function addOldStyleLanguageTags(availableLocales) {
    // checking for commonly used old-style language tags only
    if (availableLocales["pa-Arab-PK"])
        availableLocales["pa-PK"] = true;
    if (availableLocales["zh-Hans-CN"])
        availableLocales["zh-CN"] = true;
    if (availableLocales["zh-Hans-SG"])
        availableLocales["zh-SG"] = true;
    if (availableLocales["zh-Hant-HK"])
        availableLocales["zh-HK"] = true;
    if (availableLocales["zh-Hant-TW"])
        availableLocales["zh-TW"] = true;
    return availableLocales;
}


/**
 * Canonicalizes a locale list.
 *
 * Spec: ECMAScript Internationalization API Specification, 9.2.1.
 */
function CanonicalizeLocaleList(locales) {
    if (locales === undefined)
        return new List();
    var seen = new List();
    if (typeof locales === "string")
        locales = [locales];
    var O = ToObject(locales);
    var len = (O.length >>> 0);
    var k = 0;
    while (k < len) {
        // Don't call ToString(k) - SpiderMonkey is faster with integers.
        var kPresent = HasProperty(O, k);
        if (kPresent) {
            var kValue = O[k];
            if (!(typeof kValue === "string" || IsObject(kValue)))
                ThrowError(328);
            var tag = ToString(kValue);
            if (!IsStructurallyValidLanguageTag(tag))
                ThrowError(329, tag);
            tag = CanonicalizeLanguageTag(tag);
            if (seen.indexOf(tag) === -1)
                seen.push(tag);
        }
        k++;
    }
    return seen;
}


/**
 * Compares a BCP 47 language tag against the locales in availableLocales
 * and returns the best available match. Uses the fallback
 * mechanism of RFC 4647, section 3.4.
 *
 * Spec: ECMAScript Internationalization API Specification, 9.2.2.
 * Spec: RFC 4647, section 3.4.
 */
function BestAvailableLocale(availableLocales, locale) {
    assert(IsStructurallyValidLanguageTag(locale), "BestAvailableLocale");
    assert(locale === CanonicalizeLanguageTag(locale), "BestAvailableLocale");
    assert(callFunction(std_String_indexOf, locale, "-u-") === -1, "BestAvailableLocale");

    var candidate = locale;
    while (true) {
        if (availableLocales[candidate])
            return candidate;
        var pos = callFunction(std_String_lastIndexOf, candidate, "-");
        if (pos === -1)
            return undefined;
        if (pos >= 2 && candidate[pos - 2] === "-")
            pos -= 2;
        candidate = callFunction(std_String_substring, candidate, 0, pos);
    }
}


/**
 * Compares a BCP 47 language priority list against the set of locales in
 * availableLocales and determines the best available language to meet the
 * request. Options specified through Unicode extension subsequences are
 * ignored in the lookup, but information about such subsequences is returned
 * separately.
 *
 * This variant is based on the Lookup algorithm of RFC 4647 section 3.4.
 *
 * Spec: ECMAScript Internationalization API Specification, 9.2.3.
 * Spec: RFC 4647, section 3.4.
 */
function LookupMatcher(availableLocales, requestedLocales) {
    var i = 0;
    var len = requestedLocales.length;
    var availableLocale;
    var locale, noExtensionsLocale;
    while (i < len && availableLocale === undefined) {
        locale = requestedLocales[i];
        noExtensionsLocale = callFunction(std_String_replace, locale, unicodeLocaleExtensionSequenceGlobalRE, "");
        availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
        i++;
    }

    var result = new Record();
    if (availableLocale !== undefined) {
        result.__locale = availableLocale;
        if (locale !== noExtensionsLocale) {
            var extensionMatch = callFunction(std_String_match, locale, unicodeLocaleExtensionSequenceRE);
            var extension = extensionMatch[0];
            var extensionIndex = extensionMatch.index;
            result.__extension = extension;
            result.__extensionIndex = extensionIndex;
        }
    } else {
        result.__locale = DefaultLocale();
    }
    return result;
}


/**
 * Compares a BCP 47 language priority list against the set of locales in
 * availableLocales and determines the best available language to meet the
 * request. Options specified through Unicode extension subsequences are
 * ignored in the lookup, but information about such subsequences is returned
 * separately.
 *
 * Spec: ECMAScript Internationalization API Specification, 9.2.4.
 */
function BestFitMatcher(availableLocales, requestedLocales) {
    // this implementation doesn't have anything better
    return LookupMatcher(availableLocales, requestedLocales);
}
// Generated by make_intl_data.py. DO NOT EDIT.

// Mappings from complete tags to preferred values.
// Derived from IANA Language Subtag Registry, file date 2013-01-25.
// http://www.iana.org/assignments/language-subtag-registry
var langTagMappings = {
    "art-lojban": "jbo",
    "cel-gaulish": "cel-gaulish",
    "en-gb-oed": "en-GB-oed",
    "i-ami": "ami",
    "i-bnn": "bnn",
    "i-default": "i-default",
    "i-enochian": "i-enochian",
    "i-hak": "hak",
    "i-klingon": "tlh",
    "i-lux": "lb",
    "i-mingo": "i-mingo",
    "i-navajo": "nv",
    "i-pwn": "pwn",
    "i-tao": "tao",
    "i-tay": "tay",
    "i-tsu": "tsu",
    "ja-latn-hepburn-heploc": "ja-Latn-alalc97",
    "no-bok": "nb",
    "no-nyn": "nn",
    "sgn-be-fr": "sfb",
    "sgn-be-nl": "vgt",
    "sgn-br": "bzs",
    "sgn-ch-de": "sgg",
    "sgn-co": "csn",
    "sgn-de": "gsg",
    "sgn-dk": "dsl",
    "sgn-es": "ssp",
    "sgn-fr": "fsl",
    "sgn-gb": "bfi",
    "sgn-gr": "gss",
    "sgn-ie": "isg",
    "sgn-it": "ise",
    "sgn-jp": "jsl",
    "sgn-mx": "mfs",
    "sgn-ni": "ncs",
    "sgn-nl": "dse",
    "sgn-no": "nsl",
    "sgn-pt": "psr",
    "sgn-se": "swl",
    "sgn-us": "ase",
    "sgn-za": "sfs",
    "zh-cmn": "cmn",
    "zh-cmn-hans": "cmn-Hans",
    "zh-cmn-hant": "cmn-Hant",
    "zh-gan": "gan",
    "zh-guoyu": "cmn",
    "zh-hakka": "hak",
    "zh-min": "zh-min",
    "zh-min-nan": "nan",
    "zh-wuu": "wuu",
    "zh-xiang": "hsn",
    "zh-yue": "yue",
};

// Mappings from non-extlang subtags to preferred values.
// Derived from IANA Language Subtag Registry, file date 2013-01-25.
// http://www.iana.org/assignments/language-subtag-registry
var langSubtagMappings = {
    "BU": "MM",
    "DD": "DE",
    "FX": "FR",
    "TP": "TL",
    "YD": "YE",
    "ZR": "CD",
    "ayx": "nun",
    "bjd": "drl",
    "ccq": "rki",
    "cjr": "mom",
    "cka": "cmr",
    "cmk": "xch",
    "drh": "khk",
    "drw": "prs",
    "gav": "dev",
    "hrr": "jal",
    "ibi": "opa",
    "in": "id",
    "iw": "he",
    "ji": "yi",
    "jw": "jv",
    "kgh": "kml",
    "lcq": "ppr",
    "mo": "ro",
    "mst": "mry",
    "myt": "mry",
    "sca": "hle",
    "tie": "ras",
    "tkk": "twm",
    "tlw": "weo",
    "tnf": "prs",
    "ybd": "rki",
    "yma": "lrr",
};

// Mappings from extlang subtags to preferred values.
// Derived from IANA Language Subtag Registry, file date 2013-01-25.
// http://www.iana.org/assignments/language-subtag-registry
var extlangMappings = {
    "aao": {preferred: "aao", prefix: "ar"},
    "abh": {preferred: "abh", prefix: "ar"},
    "abv": {preferred: "abv", prefix: "ar"},
    "acm": {preferred: "acm", prefix: "ar"},
    "acq": {preferred: "acq", prefix: "ar"},
    "acw": {preferred: "acw", prefix: "ar"},
    "acx": {preferred: "acx", prefix: "ar"},
    "acy": {preferred: "acy", prefix: "ar"},
    "adf": {preferred: "adf", prefix: "ar"},
    "ads": {preferred: "ads", prefix: "sgn"},
    "aeb": {preferred: "aeb", prefix: "ar"},
    "aec": {preferred: "aec", prefix: "ar"},
    "aed": {preferred: "aed", prefix: "sgn"},
    "aen": {preferred: "aen", prefix: "sgn"},
    "afb": {preferred: "afb", prefix: "ar"},
    "afg": {preferred: "afg", prefix: "sgn"},
    "ajp": {preferred: "ajp", prefix: "ar"},
    "apc": {preferred: "apc", prefix: "ar"},
    "apd": {preferred: "apd", prefix: "ar"},
    "arb": {preferred: "arb", prefix: "ar"},
    "arq": {preferred: "arq", prefix: "ar"},
    "ars": {preferred: "ars", prefix: "ar"},
    "ary": {preferred: "ary", prefix: "ar"},
    "arz": {preferred: "arz", prefix: "ar"},
    "ase": {preferred: "ase", prefix: "sgn"},
    "asf": {preferred: "asf", prefix: "sgn"},
    "asp": {preferred: "asp", prefix: "sgn"},
    "asq": {preferred: "asq", prefix: "sgn"},
    "asw": {preferred: "asw", prefix: "sgn"},
    "auz": {preferred: "auz", prefix: "ar"},
    "avl": {preferred: "avl", prefix: "ar"},
    "ayh": {preferred: "ayh", prefix: "ar"},
    "ayl": {preferred: "ayl", prefix: "ar"},
    "ayn": {preferred: "ayn", prefix: "ar"},
    "ayp": {preferred: "ayp", prefix: "ar"},
    "bbz": {preferred: "bbz", prefix: "ar"},
    "bfi": {preferred: "bfi", prefix: "sgn"},
    "bfk": {preferred: "bfk", prefix: "sgn"},
    "bjn": {preferred: "bjn", prefix: "ms"},
    "bog": {preferred: "bog", prefix: "sgn"},
    "bqn": {preferred: "bqn", prefix: "sgn"},
    "bqy": {preferred: "bqy", prefix: "sgn"},
    "btj": {preferred: "btj", prefix: "ms"},
    "bve": {preferred: "bve", prefix: "ms"},
    "bvl": {preferred: "bvl", prefix: "sgn"},
    "bvu": {preferred: "bvu", prefix: "ms"},
    "bzs": {preferred: "bzs", prefix: "sgn"},
    "cdo": {preferred: "cdo", prefix: "zh"},
    "cds": {preferred: "cds", prefix: "sgn"},
    "cjy": {preferred: "cjy", prefix: "zh"},
    "cmn": {preferred: "cmn", prefix: "zh"},
    "coa": {preferred: "coa", prefix: "ms"},
    "cpx": {preferred: "cpx", prefix: "zh"},
    "csc": {preferred: "csc", prefix: "sgn"},
    "csd": {preferred: "csd", prefix: "sgn"},
    "cse": {preferred: "cse", prefix: "sgn"},
    "csf": {preferred: "csf", prefix: "sgn"},
    "csg": {preferred: "csg", prefix: "sgn"},
    "csl": {preferred: "csl", prefix: "sgn"},
    "csn": {preferred: "csn", prefix: "sgn"},
    "csq": {preferred: "csq", prefix: "sgn"},
    "csr": {preferred: "csr", prefix: "sgn"},
    "czh": {preferred: "czh", prefix: "zh"},
    "czo": {preferred: "czo", prefix: "zh"},
    "doq": {preferred: "doq", prefix: "sgn"},
    "dse": {preferred: "dse", prefix: "sgn"},
    "dsl": {preferred: "dsl", prefix: "sgn"},
    "dup": {preferred: "dup", prefix: "ms"},
    "ecs": {preferred: "ecs", prefix: "sgn"},
    "esl": {preferred: "esl", prefix: "sgn"},
    "esn": {preferred: "esn", prefix: "sgn"},
    "eso": {preferred: "eso", prefix: "sgn"},
    "eth": {preferred: "eth", prefix: "sgn"},
    "fcs": {preferred: "fcs", prefix: "sgn"},
    "fse": {preferred: "fse", prefix: "sgn"},
    "fsl": {preferred: "fsl", prefix: "sgn"},
    "fss": {preferred: "fss", prefix: "sgn"},
    "gan": {preferred: "gan", prefix: "zh"},
    "gds": {preferred: "gds", prefix: "sgn"},
    "gom": {preferred: "gom", prefix: "kok"},
    "gse": {preferred: "gse", prefix: "sgn"},
    "gsg": {preferred: "gsg", prefix: "sgn"},
    "gsm": {preferred: "gsm", prefix: "sgn"},
    "gss": {preferred: "gss", prefix: "sgn"},
    "gus": {preferred: "gus", prefix: "sgn"},
    "hab": {preferred: "hab", prefix: "sgn"},
    "haf": {preferred: "haf", prefix: "sgn"},
    "hak": {preferred: "hak", prefix: "zh"},
    "hds": {preferred: "hds", prefix: "sgn"},
    "hji": {preferred: "hji", prefix: "ms"},
    "hks": {preferred: "hks", prefix: "sgn"},
    "hos": {preferred: "hos", prefix: "sgn"},
    "hps": {preferred: "hps", prefix: "sgn"},
    "hsh": {preferred: "hsh", prefix: "sgn"},
    "hsl": {preferred: "hsl", prefix: "sgn"},
    "hsn": {preferred: "hsn", prefix: "zh"},
    "icl": {preferred: "icl", prefix: "sgn"},
    "ils": {preferred: "ils", prefix: "sgn"},
    "inl": {preferred: "inl", prefix: "sgn"},
    "ins": {preferred: "ins", prefix: "sgn"},
    "ise": {preferred: "ise", prefix: "sgn"},
    "isg": {preferred: "isg", prefix: "sgn"},
    "isr": {preferred: "isr", prefix: "sgn"},
    "jak": {preferred: "jak", prefix: "ms"},
    "jax": {preferred: "jax", prefix: "ms"},
    "jcs": {preferred: "jcs", prefix: "sgn"},
    "jhs": {preferred: "jhs", prefix: "sgn"},
    "jls": {preferred: "jls", prefix: "sgn"},
    "jos": {preferred: "jos", prefix: "sgn"},
    "jsl": {preferred: "jsl", prefix: "sgn"},
    "jus": {preferred: "jus", prefix: "sgn"},
    "kgi": {preferred: "kgi", prefix: "sgn"},
    "knn": {preferred: "knn", prefix: "kok"},
    "kvb": {preferred: "kvb", prefix: "ms"},
    "kvk": {preferred: "kvk", prefix: "sgn"},
    "kvr": {preferred: "kvr", prefix: "ms"},
    "kxd": {preferred: "kxd", prefix: "ms"},
    "lbs": {preferred: "lbs", prefix: "sgn"},
    "lce": {preferred: "lce", prefix: "ms"},
    "lcf": {preferred: "lcf", prefix: "ms"},
    "liw": {preferred: "liw", prefix: "ms"},
    "lls": {preferred: "lls", prefix: "sgn"},
    "lsg": {preferred: "lsg", prefix: "sgn"},
    "lsl": {preferred: "lsl", prefix: "sgn"},
    "lso": {preferred: "lso", prefix: "sgn"},
    "lsp": {preferred: "lsp", prefix: "sgn"},
    "lst": {preferred: "lst", prefix: "sgn"},
    "lsy": {preferred: "lsy", prefix: "sgn"},
    "ltg": {preferred: "ltg", prefix: "lv"},
    "lvs": {preferred: "lvs", prefix: "lv"},
    "lzh": {preferred: "lzh", prefix: "zh"},
    "max": {preferred: "max", prefix: "ms"},
    "mdl": {preferred: "mdl", prefix: "sgn"},
    "meo": {preferred: "meo", prefix: "ms"},
    "mfa": {preferred: "mfa", prefix: "ms"},
    "mfb": {preferred: "mfb", prefix: "ms"},
    "mfs": {preferred: "mfs", prefix: "sgn"},
    "min": {preferred: "min", prefix: "ms"},
    "mnp": {preferred: "mnp", prefix: "zh"},
    "mqg": {preferred: "mqg", prefix: "ms"},
    "mre": {preferred: "mre", prefix: "sgn"},
    "msd": {preferred: "msd", prefix: "sgn"},
    "msi": {preferred: "msi", prefix: "ms"},
    "msr": {preferred: "msr", prefix: "sgn"},
    "mui": {preferred: "mui", prefix: "ms"},
    "mzc": {preferred: "mzc", prefix: "sgn"},
    "mzg": {preferred: "mzg", prefix: "sgn"},
    "mzy": {preferred: "mzy", prefix: "sgn"},
    "nan": {preferred: "nan", prefix: "zh"},
    "nbs": {preferred: "nbs", prefix: "sgn"},
    "ncs": {preferred: "ncs", prefix: "sgn"},
    "nsi": {preferred: "nsi", prefix: "sgn"},
    "nsl": {preferred: "nsl", prefix: "sgn"},
    "nsp": {preferred: "nsp", prefix: "sgn"},
    "nsr": {preferred: "nsr", prefix: "sgn"},
    "nzs": {preferred: "nzs", prefix: "sgn"},
    "okl": {preferred: "okl", prefix: "sgn"},
    "orn": {preferred: "orn", prefix: "ms"},
    "ors": {preferred: "ors", prefix: "ms"},
    "pel": {preferred: "pel", prefix: "ms"},
    "pga": {preferred: "pga", prefix: "ar"},
    "pks": {preferred: "pks", prefix: "sgn"},
    "prl": {preferred: "prl", prefix: "sgn"},
    "prz": {preferred: "prz", prefix: "sgn"},
    "psc": {preferred: "psc", prefix: "sgn"},
    "psd": {preferred: "psd", prefix: "sgn"},
    "pse": {preferred: "pse", prefix: "ms"},
    "psg": {preferred: "psg", prefix: "sgn"},
    "psl": {preferred: "psl", prefix: "sgn"},
    "pso": {preferred: "pso", prefix: "sgn"},
    "psp": {preferred: "psp", prefix: "sgn"},
    "psr": {preferred: "psr", prefix: "sgn"},
    "pys": {preferred: "pys", prefix: "sgn"},
    "rms": {preferred: "rms", prefix: "sgn"},
    "rsi": {preferred: "rsi", prefix: "sgn"},
    "rsl": {preferred: "rsl", prefix: "sgn"},
    "sdl": {preferred: "sdl", prefix: "sgn"},
    "sfb": {preferred: "sfb", prefix: "sgn"},
    "sfs": {preferred: "sfs", prefix: "sgn"},
    "sgg": {preferred: "sgg", prefix: "sgn"},
    "sgx": {preferred: "sgx", prefix: "sgn"},
    "shu": {preferred: "shu", prefix: "ar"},
    "slf": {preferred: "slf", prefix: "sgn"},
    "sls": {preferred: "sls", prefix: "sgn"},
    "sqk": {preferred: "sqk", prefix: "sgn"},
    "sqs": {preferred: "sqs", prefix: "sgn"},
    "ssh": {preferred: "ssh", prefix: "ar"},
    "ssp": {preferred: "ssp", prefix: "sgn"},
    "ssr": {preferred: "ssr", prefix: "sgn"},
    "svk": {preferred: "svk", prefix: "sgn"},
    "swc": {preferred: "swc", prefix: "sw"},
    "swh": {preferred: "swh", prefix: "sw"},
    "swl": {preferred: "swl", prefix: "sgn"},
    "syy": {preferred: "syy", prefix: "sgn"},
    "tmw": {preferred: "tmw", prefix: "ms"},
    "tse": {preferred: "tse", prefix: "sgn"},
    "tsm": {preferred: "tsm", prefix: "sgn"},
    "tsq": {preferred: "tsq", prefix: "sgn"},
    "tss": {preferred: "tss", prefix: "sgn"},
    "tsy": {preferred: "tsy", prefix: "sgn"},
    "tza": {preferred: "tza", prefix: "sgn"},
    "ugn": {preferred: "ugn", prefix: "sgn"},
    "ugy": {preferred: "ugy", prefix: "sgn"},
    "ukl": {preferred: "ukl", prefix: "sgn"},
    "uks": {preferred: "uks", prefix: "sgn"},
    "urk": {preferred: "urk", prefix: "ms"},
    "uzn": {preferred: "uzn", prefix: "uz"},
    "uzs": {preferred: "uzs", prefix: "uz"},
    "vgt": {preferred: "vgt", prefix: "sgn"},
    "vkk": {preferred: "vkk", prefix: "ms"},
    "vkt": {preferred: "vkt", prefix: "ms"},
    "vsi": {preferred: "vsi", prefix: "sgn"},
    "vsl": {preferred: "vsl", prefix: "sgn"},
    "vsv": {preferred: "vsv", prefix: "sgn"},
    "wuu": {preferred: "wuu", prefix: "zh"},
    "xki": {preferred: "xki", prefix: "sgn"},
    "xml": {preferred: "xml", prefix: "sgn"},
    "xmm": {preferred: "xmm", prefix: "ms"},
    "xms": {preferred: "xms", prefix: "sgn"},
    "yds": {preferred: "yds", prefix: "sgn"},
    "ysl": {preferred: "ysl", prefix: "sgn"},
    "yue": {preferred: "yue", prefix: "zh"},
    "zib": {preferred: "zib", prefix: "sgn"},
    "zlm": {preferred: "zlm", prefix: "ms"},
    "zmi": {preferred: "zmi", prefix: "ms"},
    "zsl": {preferred: "zsl", prefix: "sgn"},
    "zsm": {preferred: "zsm", prefix: "ms"},
};
