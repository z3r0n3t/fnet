/**
 * marked - a markdown parser
 * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).marked = t());
})(this, function () {
    "use strict";
    function i(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function s(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
    }
    function u(e, t) {
        var n;
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator]) return (n = e[Symbol.iterator]()).next.bind(n);
        if (
            Array.isArray(e) ||
            (n = (function (e, t) {
                if (e) {
                    if ("string" == typeof e) return s(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
                }
            })(e)) ||
            (t && e && "number" == typeof e.length)
        ) {
            n && (e = n);
            var r = 0;
            return function () {
                return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function n(e) {
        return c[e];
    }
    var e,
        t =
            ((function (t) {
                function e() {
                    return {
                        baseUrl: null,
                        breaks: !1,
                        gfm: !0,
                        headerIds: !0,
                        headerPrefix: "",
                        highlight: null,
                        langPrefix: "language-",
                        mangle: !0,
                        pedantic: !1,
                        renderer: null,
                        sanitize: !1,
                        sanitizer: null,
                        silent: !1,
                        smartLists: !1,
                        smartypants: !1,
                        tokenizer: null,
                        walkTokens: null,
                        xhtml: !1,
                    };
                }
                t.exports = {
                    defaults: e(),
                    getDefaults: e,
                    changeDefaults: function (e) {
                        t.exports.defaults = e;
                    },
                };
            })((e = { exports: {} })),
            e.exports),
        r = (t.defaults, t.getDefaults, t.changeDefaults, /[&<>"']/),
        l = /[&<>"']/g,
        a = /[<>"']|&(?!#?\w+;)/,
        o = /[<>"']|&(?!#?\w+;)/g,
        c = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    var p = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
    function h(e) {
        return e.replace(p, function (e, t) {
            return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? ("x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1))) : "";
        });
    }
    var g = /(^|[^\[])\^/g;
    var f = /[^\w:]/g,
        d = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    var k = {},
        b = /^[^:]+:\/*[^/]*$/,
        m = /^([^:]+:)[\s\S]*$/,
        x = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    function w(e, t) {
        k[" " + e] || (b.test(e) ? (k[" " + e] = e + "/") : (k[" " + e] = v(e, "/", !0)));
        var n = -1 === (e = k[" " + e]).indexOf(":");
        return "//" === t.substring(0, 2) ? (n ? t : e.replace(m, "$1") + t) : "/" === t.charAt(0) ? (n ? t : e.replace(x, "$1") + t) : e + t;
    }
    function v(e, t, n) {
        var r = e.length;
        if (0 === r) return "";
        for (var i = 0; i < r; ) {
            var s = e.charAt(r - i - 1);
            if (s !== t || n) {
                if (s === t || !n) break;
                i++;
            } else i++;
        }
        return e.substr(0, r - i);
    }
    var _ = function (e, t) {
            if (t) {
                if (r.test(e)) return e.replace(l, n);
            } else if (a.test(e)) return e.replace(o, n);
            return e;
        },
        y = h,
        z = function (n, e) {
            (n = n.source || n), (e = e || "");
            var r = {
                replace: function (e, t) {
                    return (t = (t = t.source || t).replace(g, "$1")), (n = n.replace(e, t)), r;
                },
                getRegex: function () {
                    return new RegExp(n, e);
                },
            };
            return r;
        },
        S = function (e, t, n) {
            if (e) {
                var r;
                try {
                    r = decodeURIComponent(h(n)).replace(f, "").toLowerCase();
                } catch (e) {
                    return null;
                }
                if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:") || 0 === r.indexOf("data:")) return null;
            }
            t && !d.test(n) && (n = w(t, n));
            try {
                n = encodeURI(n).replace(/%25/g, "%");
            } catch (e) {
                return null;
            }
            return n;
        },
        $ = { exec: function () {} },
        A = function (e) {
            for (var t, n, r = 1; r < arguments.length; r++) for (n in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
        },
        R = function (e, t) {
            var n = e
                    .replace(/\|/g, function (e, t, n) {
                        for (var r = !1, i = t; 0 <= --i && "\\" === n[i]; ) r = !r;
                        return r ? "|" : " |";
                    })
                    .split(/ \|/),
                r = 0;
            if (n.length > t) n.splice(t);
            else for (; n.length < t; ) n.push("");
            for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
            return n;
        },
        T = function (e, t) {
            if (-1 === e.indexOf(t[1])) return -1;
            for (var n = e.length, r = 0, i = 0; i < n; i++)
                if ("\\" === e[i]) i++;
                else if (e[i] === t[0]) r++;
                else if (e[i] === t[1] && --r < 0) return i;
            return -1;
        },
        I = function (e) {
            e &&
                e.sanitize &&
                !e.silent &&
                console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
        },
        Z = function (e, t) {
            if (t < 1) return "";
            for (var n = ""; 1 < t; ) 1 & t && (n += e), (t >>= 1), (e += e);
            return n + e;
        },
        q = t.defaults,
        O = v,
        C = R,
        U = _,
        j = T;
    function E(e, t, n) {
        var r = t.href,
            i = t.title ? U(t.title) : null,
            t = e[1].replace(/\\([\[\]])/g, "$1");
        return "!" !== e[0].charAt(0) ? { type: "link", raw: n, href: r, title: i, text: t } : { type: "image", raw: n, href: r, title: i, text: U(t) };
    }
    var D = (function () {
            function e(e) {
                this.options = e || q;
            }
            var t = e.prototype;
            return (
                (t.space = function (e) {
                    e = this.rules.block.newline.exec(e);
                    if (e) return 1 < e[0].length ? { type: "space", raw: e[0] } : { raw: "\n" };
                }),
                (t.code = function (e, t) {
                    e = this.rules.block.code.exec(e);
                    if (e) {
                        t = t[t.length - 1];
                        if (t && "paragraph" === t.type) return { raw: e[0], text: e[0].trimRight() };
                        t = e[0].replace(/^ {4}/gm, "");
                        return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : O(t, "\n") };
                    }
                }),
                (t.fences = function (e) {
                    var t = this.rules.block.fences.exec(e);
                    if (t) {
                        var n = t[0],
                            e = (function (e, t) {
                                if (null === (e = e.match(/^(\s+)(?:```)/))) return t;
                                var n = e[1];
                                return t
                                    .split("\n")
                                    .map(function (e) {
                                        var t = e.match(/^\s+/);
                                        return null !== t && t[0].length >= n.length ? e.slice(n.length) : e;
                                    })
                                    .join("\n");
                            })(n, t[3] || "");
                        return { type: "code", raw: n, lang: t[2] && t[2].trim(), text: e };
                    }
                }),
                (t.heading = function (e) {
                    e = this.rules.block.heading.exec(e);
                    if (e) return { type: "heading", raw: e[0], depth: e[1].length, text: e[2] };
                }),
                (t.nptable = function (e) {
                    e = this.rules.block.nptable.exec(e);
                    if (e) {
                        var t = { type: "table", header: C(e[1].replace(/^ *| *\| *$/g, "")), align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : [], raw: e[0] };
                        if (t.header.length === t.align.length) {
                            for (var n = t.align.length, r = 0; r < n; r++)
                                /^ *-+: *$/.test(t.align[r]) ? (t.align[r] = "right") : /^ *:-+: *$/.test(t.align[r]) ? (t.align[r] = "center") : /^ *:-+ *$/.test(t.align[r]) ? (t.align[r] = "left") : (t.align[r] = null);
                            for (n = t.cells.length, r = 0; r < n; r++) t.cells[r] = C(t.cells[r], t.header.length);
                            return t;
                        }
                    }
                }),
                (t.hr = function (e) {
                    e = this.rules.block.hr.exec(e);
                    if (e) return { type: "hr", raw: e[0] };
                }),
                (t.blockquote = function (e) {
                    var t = this.rules.block.blockquote.exec(e);
                    if (t) {
                        e = t[0].replace(/^ *> ?/gm, "");
                        return { type: "blockquote", raw: t[0], text: e };
                    }
                }),
                (t.list = function (e) {
                    e = this.rules.block.list.exec(e);
                    if (e) {
                        for (
                            var t,
                                n,
                                r,
                                i,
                                s = e[0],
                                l = e[2],
                                a = 1 < l.length,
                                o = { type: "list", raw: s, ordered: a, start: a ? +l.slice(0, -1) : "", loose: !1, items: [] },
                                c = e[0].match(this.rules.block.item),
                                u = !1,
                                p = c.length,
                                h = this.rules.block.listItemStart.exec(c[0]),
                                g = 0;
                            g < p;
                            g++
                        ) {
                            if (((s = t = c[g]), g !== p - 1)) {
                                if ((i = this.rules.block.listItemStart.exec(c[g + 1]))[1].length > h[0].length || 3 < i[1].length) {
                                    c.splice(g, 2, c[g] + "\n" + c[g + 1]), g--, p--;
                                    continue;
                                }
                                (!this.options.pedantic || this.options.smartLists ? i[2][i[2].length - 1] !== l[l.length - 1] : a == (1 === i[2].length)) &&
                                    ((n = c.slice(g + 1).join("\n")), (o.raw = o.raw.substring(0, o.raw.length - n.length)), (g = p - 1)),
                                    (h = i);
                            }
                            (r = t.length),
                                ~(t = t.replace(/^ *([*+-]|\d+[.)]) ?/, "")).indexOf("\n ") && ((r -= t.length), (t = this.options.pedantic ? t.replace(/^ {1,4}/gm, "") : t.replace(new RegExp("^ {1," + r + "}", "gm"), ""))),
                                (n = u || /\n\n(?!\s*$)/.test(t)),
                                g !== p - 1 && ((u = "\n" === t.charAt(t.length - 1)), (n = n || u)),
                                n && (o.loose = !0),
                                (i = void 0),
                                (r = /^\[[ xX]\] /.test(t)) && ((i = " " !== t[1]), (t = t.replace(/^\[[ xX]\] +/, ""))),
                                o.items.push({ type: "list_item", raw: s, task: r, checked: i, loose: n, text: t });
                        }
                        return o;
                    }
                }),
                (t.html = function (e) {
                    e = this.rules.block.html.exec(e);
                    if (e)
                        return {
                            type: this.options.sanitize ? "paragraph" : "html",
                            raw: e[0],
                            pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]),
                            text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(e[0]) : U(e[0])) : e[0],
                        };
                }),
                (t.def = function (e) {
                    e = this.rules.block.def.exec(e);
                    if (e) return e[3] && (e[3] = e[3].substring(1, e[3].length - 1)), { tag: e[1].toLowerCase().replace(/\s+/g, " "), raw: e[0], href: e[2], title: e[3] };
                }),
                (t.table = function (e) {
                    e = this.rules.block.table.exec(e);
                    if (e) {
                        var t = { type: "table", header: C(e[1].replace(/^ *| *\| *$/g, "")), align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : [] };
                        if (t.header.length === t.align.length) {
                            t.raw = e[0];
                            for (var n = t.align.length, r = 0; r < n; r++)
                                /^ *-+: *$/.test(t.align[r]) ? (t.align[r] = "right") : /^ *:-+: *$/.test(t.align[r]) ? (t.align[r] = "center") : /^ *:-+ *$/.test(t.align[r]) ? (t.align[r] = "left") : (t.align[r] = null);
                            for (n = t.cells.length, r = 0; r < n; r++) t.cells[r] = C(t.cells[r].replace(/^ *\| *| *\| *$/g, ""), t.header.length);
                            return t;
                        }
                    }
                }),
                (t.lheading = function (e) {
                    e = this.rules.block.lheading.exec(e);
                    if (e) return { type: "heading", raw: e[0], depth: "=" === e[2].charAt(0) ? 1 : 2, text: e[1] };
                }),
                (t.paragraph = function (e) {
                    e = this.rules.block.paragraph.exec(e);
                    if (e) return { type: "paragraph", raw: e[0], text: "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1] };
                }),
                (t.text = function (e, t) {
                    e = this.rules.block.text.exec(e);
                    if (e) {
                        t = t[t.length - 1];
                        return t && "text" === t.type ? { raw: e[0], text: e[0] } : { type: "text", raw: e[0], text: e[0] };
                    }
                }),
                (t.escape = function (e) {
                    e = this.rules.inline.escape.exec(e);
                    if (e) return { type: "escape", raw: e[0], text: U(e[1]) };
                }),
                (t.tag = function (e, t, n) {
                    e = this.rules.inline.tag.exec(e);
                    if (e)
                        return (
                            !t && /^<a /i.test(e[0]) ? (t = !0) : t && /^<\/a>/i.test(e[0]) && (t = !1),
                            !n && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? (n = !0) : n && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (n = !1),
                            { type: this.options.sanitize ? "text" : "html", raw: e[0], inLink: t, inRawBlock: n, text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(e[0]) : U(e[0])) : e[0] }
                        );
                }),
                (t.link = function (e) {
                    var t = this.rules.inline.link.exec(e);
                    if (t) {
                        e = j(t[2], "()");
                        -1 < e && ((r = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e), (t[2] = t[2].substring(0, e)), (t[0] = t[0].substring(0, r).trim()), (t[3] = ""));
                        var n,
                            e = t[2],
                            r = "";
                        return (
                            (r = this.options.pedantic ? ((n = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(e)), n ? ((e = n[1]), n[3]) : "") : t[3] ? t[3].slice(1, -1) : ""),
                            E(t, { href: (e = e.trim().replace(/^<([\s\S]*)>$/, "$1")) && e.replace(this.rules.inline._escapes, "$1"), title: r && r.replace(this.rules.inline._escapes, "$1") }, t[0])
                        );
                    }
                }),
                (t.reflink = function (e, t) {
                    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                        e = (n[2] || n[1]).replace(/\s+/g, " ");
                        if ((e = t[e.toLowerCase()]) && e.href) return E(n, e, n[0]);
                        var n = n[0].charAt(0);
                        return { type: "text", raw: n, text: n };
                    }
                }),
                (t.strong = function (e, t, n) {
                    void 0 === n && (n = "");
                    var r = this.rules.inline.strong.start.exec(e);
                    if (r && (!r[1] || (r[1] && ("" === n || this.rules.inline.punctuation.exec(n))))) {
                        t = t.slice(-1 * e.length);
                        var i,
                            s = "**" === r[0] ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
                        for (s.lastIndex = 0; null != (r = s.exec(t)); ) if ((i = this.rules.inline.strong.middle.exec(t.slice(0, r.index + 3)))) return { type: "strong", raw: e.slice(0, i[0].length), text: e.slice(2, i[0].length - 2) };
                    }
                }),
                (t.em = function (e, t, n) {
                    void 0 === n && (n = "");
                    var r = this.rules.inline.em.start.exec(e);
                    if (r && (!r[1] || (r[1] && ("" === n || this.rules.inline.punctuation.exec(n))))) {
                        t = t.slice(-1 * e.length);
                        var i,
                            s = "*" === r[0] ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
                        for (s.lastIndex = 0; null != (r = s.exec(t)); ) if ((i = this.rules.inline.em.middle.exec(t.slice(0, r.index + 2)))) return { type: "em", raw: e.slice(0, i[0].length), text: e.slice(1, i[0].length - 1) };
                    }
                }),
                (t.codespan = function (e) {
                    var t = this.rules.inline.code.exec(e);
                    if (t) {
                        var n = t[2].replace(/\n/g, " "),
                            r = /[^ ]/.test(n),
                            e = n.startsWith(" ") && n.endsWith(" ");
                        return r && e && (n = n.substring(1, n.length - 1)), (n = U(n, !0)), { type: "codespan", raw: t[0], text: n };
                    }
                }),
                (t.br = function (e) {
                    e = this.rules.inline.br.exec(e);
                    if (e) return { type: "br", raw: e[0] };
                }),
                (t.del = function (e) {
                    e = this.rules.inline.del.exec(e);
                    if (e) return { type: "del", raw: e[0], text: e[1] };
                }),
                (t.autolink = function (e, t) {
                    e = this.rules.inline.autolink.exec(e);
                    if (e) {
                        var n,
                            t = "@" === e[2] ? "mailto:" + (n = U(this.options.mangle ? t(e[1]) : e[1])) : (n = U(e[1]));
                        return { type: "link", raw: e[0], text: n, href: t, tokens: [{ type: "text", raw: n, text: n }] };
                    }
                }),
                (t.url = function (e, t) {
                    var n, r, i, s;
                    if ((n = this.rules.inline.url.exec(e))) {
                        if ("@" === n[2]) i = "mailto:" + (r = U(this.options.mangle ? t(n[0]) : n[0]));
                        else {
                            for (; (s = n[0]), (n[0] = this.rules.inline._backpedal.exec(n[0])[0]), s !== n[0]; );
                            (r = U(n[0])), (i = "www." === n[1] ? "http://" + r : r);
                        }
                        return { type: "link", raw: n[0], text: r, href: i, tokens: [{ type: "text", raw: r, text: r }] };
                    }
                }),
                (t.inlineText = function (e, t, n) {
                    e = this.rules.inline.text.exec(e);
                    if (e) {
                        n = t ? (this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(e[0]) : U(e[0])) : e[0]) : U(this.options.smartypants ? n(e[0]) : e[0]);
                        return { type: "text", raw: e[0], text: n };
                    }
                }),
                e
            );
        })(),
        R = $,
        T = z,
        $ = A,
        z = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
            hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
            heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
            html:
                "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
            def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
            nptable: R,
            table: R,
            lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
        };
    (z.def = T(z.def).replace("label", z._label).replace("title", z._title).getRegex()),
        (z.bullet = /(?:[*+-]|\d{1,9}[.)])/),
        (z.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/),
        (z.item = T(z.item, "gm").replace(/bull/g, z.bullet).getRegex()),
        (z.listItemStart = T(/^( *)(bull)/)
            .replace("bull", z.bullet)
            .getRegex()),
        (z.list = T(z.list)
            .replace(/bull/g, z.bullet)
            .replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))")
            .replace("def", "\\n+(?=" + z.def.source + ")")
            .getRegex()),
        (z._tag =
            "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
        (z._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
        (z.html = T(z.html, "i")
            .replace("comment", z._comment)
            .replace("tag", z._tag)
            .replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
            .getRegex()),
        (z.paragraph = T(z._paragraph)
            .replace("hr", z.hr)
            .replace("heading", " {0,3}#{1,6} ")
            .replace("|lheading", "")
            .replace("blockquote", " {0,3}>")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)")
            .replace("tag", z._tag)
            .getRegex()),
        (z.blockquote = T(z.blockquote).replace("paragraph", z.paragraph).getRegex()),
        (z.normal = $({}, z)),
        (z.gfm = $({}, z.normal, {
            nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
            table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
        })),
        (z.gfm.nptable = T(z.gfm.nptable)
            .replace("hr", z.hr)
            .replace("heading", " {0,3}#{1,6} ")
            .replace("blockquote", " {0,3}>")
            .replace("code", " {4}[^\\n]")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)")
            .replace("tag", z._tag)
            .getRegex()),
        (z.gfm.table = T(z.gfm.table)
            .replace("hr", z.hr)
            .replace("heading", " {0,3}#{1,6} ")
            .replace("blockquote", " {0,3}>")
            .replace("code", " {4}[^\\n]")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)")
            .replace("tag", z._tag)
            .getRegex()),
        (z.pedantic = $({}, z.normal, {
            html: T("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))")
                .replace("comment", z._comment)
                .replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b")
                .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
            fences: R,
            paragraph: T(z.normal._paragraph)
                .replace("hr", z.hr)
                .replace("heading", " *#{1,6} *[^\n]")
                .replace("lheading", z.lheading)
                .replace("blockquote", " {0,3}>")
                .replace("|fences", "")
                .replace("|list", "")
                .replace("|html", "")
                .getRegex(),
        }));
    R = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: R,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        strong: {
            start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
            middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
            endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
            endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/,
        },
        em: {
            start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
            middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
            endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
            endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/,
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: R,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\s*punctuation])/,
        _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",
    };
    (R.punctuation = T(R.punctuation)
        .replace(/punctuation/g, R._punctuation)
        .getRegex()),
        (R._blockSkip = "\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>"),
        (R._overlapSkip = "__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*"),
        (R._comment = T(z._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex()),
        (R.em.start = T(R.em.start)
            .replace(/punctuation/g, R._punctuation)
            .getRegex()),
        (R.em.middle = T(R.em.middle)
            .replace(/punctuation/g, R._punctuation)
            .replace(/overlapSkip/g, R._overlapSkip)
            .getRegex()),
        (R.em.endAst = T(R.em.endAst, "g")
            .replace(/punctuation/g, R._punctuation)
            .getRegex()),
        (R.em.endUnd = T(R.em.endUnd, "g")
            .replace(/punctuation/g, R._punctuation)
            .getRegex()),
        (R.strong.start = T(R.strong.start)
            .replace(/punctuation/g, R._punctuation)
            .getRegex()),
        (R.strong.middle = T(R.strong.middle)
            .replace(/punctuation/g, R._punctuation)
            .replace(/overlapSkip/g, R._overlapSkip)
            .getRegex()),
        (R.strong.endAst = T(R.strong.endAst, "g")
            .replace(/punctuation/g, R._punctuation)
            .getRegex()),
        (R.strong.endUnd = T(R.strong.endUnd, "g")
            .replace(/punctuation/g, R._punctuation)
            .getRegex()),
        (R.blockSkip = T(R._blockSkip, "g").getRegex()),
        (R.overlapSkip = T(R._overlapSkip, "g").getRegex()),
        (R._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
        (R._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
        (R._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
        (R.autolink = T(R.autolink).replace("scheme", R._scheme).replace("email", R._email).getRegex()),
        (R._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
        (R.tag = T(R.tag).replace("comment", R._comment).replace("attribute", R._attribute).getRegex()),
        (R._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
        (R._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/),
        (R._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
        (R.link = T(R.link).replace("label", R._label).replace("href", R._href).replace("title", R._title).getRegex()),
        (R.reflink = T(R.reflink).replace("label", R._label).getRegex()),
        (R.reflinkSearch = T(R.reflinkSearch, "g").replace("reflink", R.reflink).replace("nolink", R.nolink).getRegex()),
        (R.normal = $({}, R)),
        (R.pedantic = $({}, R.normal, {
            strong: { start: /^__|\*\*/, middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, endAst: /\*\*(?!\*)/g, endUnd: /__(?!_)/g },
            em: { start: /^_|\*/, middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/, endAst: /\*(?!\*)/g, endUnd: /_(?!_)/g },
            link: T(/^!?\[(label)\]\((.*?)\)/)
                .replace("label", R._label)
                .getRegex(),
            reflink: T(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                .replace("label", R._label)
                .getRegex(),
        })),
        (R.gfm = $({}, R.normal, {
            escape: T(R.escape).replace("])", "~|])").getRegex(),
            _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^~+(?=\S)([\s\S]*?\S)~+/,
            text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/,
        })),
        (R.gfm.url = T(R.gfm.url, "i").replace("email", R.gfm._extended_email).getRegex()),
        (R.breaks = $({}, R.gfm, {
            br: T(R.br).replace("{2,}", "*").getRegex(),
            text: T(R.gfm.text)
                .replace("\\b_", "\\b_| {2,}\\n")
                .replace(/\{2,\}/g, "*")
                .getRegex(),
        }));
    var R = { block: z, inline: R },
        P = t.defaults,
        L = R.block,
        N = R.inline,
        B = Z;
    function F(e) {
        return e
            .replace(/---/g, "—")
            .replace(/--/g, "–")
            .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
            .replace(/'/g, "’")
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
            .replace(/"/g, "”")
            .replace(/\.{3}/g, "…");
    }
    function M(e) {
        for (var t, n = "", r = e.length, i = 0; i < r; i++) (t = e.charCodeAt(i)), 0.5 < Math.random() && (t = "x" + t.toString(16)), (n += "&#" + t + ";");
        return n;
    }
    var W = (function () {
            function n(e) {
                (this.tokens = []),
                    (this.tokens.links = Object.create(null)),
                    (this.options = e || P),
                    (this.options.tokenizer = this.options.tokenizer || new D()),
                    (this.tokenizer = this.options.tokenizer),
                    (this.tokenizer.options = this.options);
                e = { block: L.normal, inline: N.normal };
                this.options.pedantic ? ((e.block = L.pedantic), (e.inline = N.pedantic)) : this.options.gfm && ((e.block = L.gfm), this.options.breaks ? (e.inline = N.breaks) : (e.inline = N.gfm)), (this.tokenizer.rules = e);
            }
            (n.lex = function (e, t) {
                return new n(t).lex(e);
            }),
                (n.lexInline = function (e, t) {
                    return new n(t).inlineTokens(e);
                });
            var e,
                t,
                r = n.prototype;
            return (
                (r.lex = function (e) {
                    return (e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ")), this.blockTokens(e, this.tokens, !0), this.inline(this.tokens), this.tokens;
                }),
                (r.blockTokens = function (e, t, n) {
                    var r, i, s, l;
                    for (void 0 === t && (t = []), void 0 === n && (n = !0), e = e.replace(/^ +$/gm, ""); e; )
                        if ((r = this.tokenizer.space(e))) (e = e.substring(r.raw.length)), r.type && t.push(r);
                        else if ((r = this.tokenizer.code(e, t))) (e = e.substring(r.raw.length)), r.type ? t.push(r) : (((l = t[t.length - 1]).raw += "\n" + r.raw), (l.text += "\n" + r.text));
                        else if ((r = this.tokenizer.fences(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if ((r = this.tokenizer.heading(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if ((r = this.tokenizer.nptable(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if ((r = this.tokenizer.hr(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if ((r = this.tokenizer.blockquote(e))) (e = e.substring(r.raw.length)), (r.tokens = this.blockTokens(r.text, [], n)), t.push(r);
                        else if ((r = this.tokenizer.list(e))) {
                            for (e = e.substring(r.raw.length), s = r.items.length, i = 0; i < s; i++) r.items[i].tokens = this.blockTokens(r.items[i].text, [], !1);
                            t.push(r);
                        } else if ((r = this.tokenizer.html(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if (n && (r = this.tokenizer.def(e))) (e = e.substring(r.raw.length)), this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title });
                        else if ((r = this.tokenizer.table(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if ((r = this.tokenizer.lheading(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if (n && (r = this.tokenizer.paragraph(e))) (e = e.substring(r.raw.length)), t.push(r);
                        else if ((r = this.tokenizer.text(e, t))) (e = e.substring(r.raw.length)), r.type ? t.push(r) : (((l = t[t.length - 1]).raw += "\n" + r.raw), (l.text += "\n" + r.text));
                        else if (e) {
                            var a = "Infinite loop on byte: " + e.charCodeAt(0);
                            if (this.options.silent) {
                                console.error(a);
                                break;
                            }
                            throw new Error(a);
                        }
                    return t;
                }),
                (r.inline = function (e) {
                    for (var t, n, r, i, s, l = e.length, a = 0; a < l; a++)
                        switch ((s = e[a]).type) {
                            case "paragraph":
                            case "text":
                            case "heading":
                                (s.tokens = []), this.inlineTokens(s.text, s.tokens);
                                break;
                            case "table":
                                for (s.tokens = { header: [], cells: [] }, r = s.header.length, t = 0; t < r; t++) (s.tokens.header[t] = []), this.inlineTokens(s.header[t], s.tokens.header[t]);
                                for (r = s.cells.length, t = 0; t < r; t++) for (i = s.cells[t], s.tokens.cells[t] = [], n = 0; n < i.length; n++) (s.tokens.cells[t][n] = []), this.inlineTokens(i[n], s.tokens.cells[t][n]);
                                break;
                            case "blockquote":
                                this.inline(s.tokens);
                                break;
                            case "list":
                                for (r = s.items.length, t = 0; t < r; t++) this.inline(s.items[t].tokens);
                        }
                    return e;
                }),
                (r.inlineTokens = function (e, t, n, r, i) {
                    var s;
                    void 0 === t && (t = []), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === i && (i = "");
                    var l,
                        a = e;
                    if (this.tokens.links) {
                        var o = Object.keys(this.tokens.links);
                        if (0 < o.length)
                            for (; null != (l = this.tokenizer.rules.inline.reflinkSearch.exec(a)); )
                                o.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, l.index) + "[" + B("a", l[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
                    }
                    for (; null != (l = this.tokenizer.rules.inline.blockSkip.exec(a)); ) a = a.slice(0, l.index) + "[" + B("a", l[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                    for (; e; )
                        if ((s = this.tokenizer.escape(e))) (e = e.substring(s.raw.length)), t.push(s);
                        else if ((s = this.tokenizer.tag(e, n, r))) (e = e.substring(s.raw.length)), (n = s.inLink), (r = s.inRawBlock), t.push(s);
                        else if ((s = this.tokenizer.link(e))) (e = e.substring(s.raw.length)), "link" === s.type && (s.tokens = this.inlineTokens(s.text, [], !0, r)), t.push(s);
                        else if ((s = this.tokenizer.reflink(e, this.tokens.links))) (e = e.substring(s.raw.length)), "link" === s.type && (s.tokens = this.inlineTokens(s.text, [], !0, r)), t.push(s);
                        else if ((s = this.tokenizer.strong(e, a, i))) (e = e.substring(s.raw.length)), (s.tokens = this.inlineTokens(s.text, [], n, r)), t.push(s);
                        else if ((s = this.tokenizer.em(e, a, i))) (e = e.substring(s.raw.length)), (s.tokens = this.inlineTokens(s.text, [], n, r)), t.push(s);
                        else if ((s = this.tokenizer.codespan(e))) (e = e.substring(s.raw.length)), t.push(s);
                        else if ((s = this.tokenizer.br(e))) (e = e.substring(s.raw.length)), t.push(s);
                        else if ((s = this.tokenizer.del(e))) (e = e.substring(s.raw.length)), (s.tokens = this.inlineTokens(s.text, [], n, r)), t.push(s);
                        else if ((s = this.tokenizer.autolink(e, M))) (e = e.substring(s.raw.length)), t.push(s);
                        else if (n || !(s = this.tokenizer.url(e, M))) {
                            if ((s = this.tokenizer.inlineText(e, r, F))) (e = e.substring(s.raw.length)), (i = s.raw.slice(-1)), t.push(s);
                            else if (e) {
                                var c = "Infinite loop on byte: " + e.charCodeAt(0);
                                if (this.options.silent) {
                                    console.error(c);
                                    break;
                                }
                                throw new Error(c);
                            }
                        } else (e = e.substring(s.raw.length)), t.push(s);
                    return t;
                }),
                (e = n),
                (t = [
                    {
                        key: "rules",
                        get: function () {
                            return { block: L, inline: N };
                        },
                    },
                ]),
                (r = null) && i(e.prototype, r),
                t && i(e, t),
                n
            );
        })(),
        X = t.defaults,
        G = S,
        V = _,
        H = (function () {
            function e(e) {
                this.options = e || X;
            }
            var t = e.prototype;
            return (
                (t.code = function (e, t, n) {
                    var r = (t || "").match(/\S*/)[0];
                    return (
                        !this.options.highlight || (null != (t = this.options.highlight(e, r)) && t !== e && ((n = !0), (e = t))),
                        r ? '<pre><code class="' + this.options.langPrefix + V(r, !0) + '">' + (n ? e : V(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : V(e, !0)) + "</code></pre>\n"
                    );
                }),
                (t.blockquote = function (e) {
                    return "<blockquote>\n" + e + "</blockquote>\n";
                }),
                (t.html = function (e) {
                    return e;
                }),
                (t.heading = function (e, t, n, r) {
                    return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + r.slug(n) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n";
                }),
                (t.hr = function () {
                    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
                }),
                (t.list = function (e, t, n) {
                    var r = t ? "ol" : "ul";
                    return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n";
                }),
                (t.listitem = function (e) {
                    return "<li>" + e + "</li>\n";
                }),
                (t.checkbox = function (e) {
                    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
                }),
                (t.paragraph = function (e) {
                    return "<p>" + e + "</p>\n";
                }),
                (t.table = function (e, t) {
                    return "<table>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n";
                }),
                (t.tablerow = function (e) {
                    return "<tr>\n" + e + "</tr>\n";
                }),
                (t.tablecell = function (e, t) {
                    var n = t.header ? "th" : "td";
                    return (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n";
                }),
                (t.strong = function (e) {
                    return "<strong>" + e + "</strong>";
                }),
                (t.em = function (e) {
                    return "<em>" + e + "</em>";
                }),
                (t.codespan = function (e) {
                    return "<code>" + e + "</code>";
                }),
                (t.br = function () {
                    return this.options.xhtml ? "<br/>" : "<br>";
                }),
                (t.del = function (e) {
                    return "<del>" + e + "</del>";
                }),
                (t.link = function (e, t, n) {
                    if (null === (e = G(this.options.sanitize, this.options.baseUrl, e))) return n;
                    e = '<a href="' + V(e) + '"';
                    return t && (e += ' title="' + t + '"'), (e += ">" + n + "</a>");
                }),
                (t.image = function (e, t, n) {
                    if (null === (e = G(this.options.sanitize, this.options.baseUrl, e))) return n;
                    n = '<img src="' + e + '" alt="' + n + '"';
                    return t && (n += ' title="' + t + '"'), (n += this.options.xhtml ? "/>" : ">");
                }),
                (t.text = function (e) {
                    return e;
                }),
                e
            );
        })(),
        J = (function () {
            function e() {}
            var t = e.prototype;
            return (
                (t.strong = function (e) {
                    return e;
                }),
                (t.em = function (e) {
                    return e;
                }),
                (t.codespan = function (e) {
                    return e;
                }),
                (t.del = function (e) {
                    return e;
                }),
                (t.html = function (e) {
                    return e;
                }),
                (t.text = function (e) {
                    return e;
                }),
                (t.link = function (e, t, n) {
                    return "" + n;
                }),
                (t.image = function (e, t, n) {
                    return "" + n;
                }),
                (t.br = function () {
                    return "";
                }),
                e
            );
        })(),
        K = (function () {
            function e() {
                this.seen = {};
            }
            var t = e.prototype;
            return (
                (t.serialize = function (e) {
                    return e
                        .toLowerCase()
                        .trim()
                        .replace(/<[!\/a-z].*?>/gi, "")
                        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "")
                        .replace(/\s/g, "-");
                }),
                (t.getNextSafeSlug = function (e, t) {
                    var n = e,
                        r = 0;
                    if (this.seen.hasOwnProperty(n)) for (r = this.seen[e]; (n = e + "-" + ++r), this.seen.hasOwnProperty(n); );
                    return t || ((this.seen[e] = r), (this.seen[n] = 0)), n;
                }),
                (t.slug = function (e, t) {
                    void 0 === t && (t = {});
                    var n = this.serialize(e);
                    return this.getNextSafeSlug(n, t.dryrun);
                }),
                e
            );
        })(),
        Q = t.defaults,
        Y = y,
        ee = (function () {
            function n(e) {
                (this.options = e || Q), (this.options.renderer = this.options.renderer || new H()), (this.renderer = this.options.renderer), (this.renderer.options = this.options), (this.textRenderer = new J()), (this.slugger = new K());
            }
            (n.parse = function (e, t) {
                return new n(t).parse(e);
            }),
                (n.parseInline = function (e, t) {
                    return new n(t).parseInline(e);
                });
            var e = n.prototype;
            return (
                (e.parse = function (e, t) {
                    void 0 === t && (t = !0);
                    for (var n, r, i, s, l, a, o, c, u, p, h, g, f, d, k, b = "", m = e.length, x = 0; x < m; x++)
                        switch ((c = e[x]).type) {
                            case "space":
                                continue;
                            case "hr":
                                b += this.renderer.hr();
                                continue;
                            case "heading":
                                b += this.renderer.heading(this.parseInline(c.tokens), c.depth, Y(this.parseInline(c.tokens, this.textRenderer)), this.slugger);
                                continue;
                            case "code":
                                b += this.renderer.code(c.text, c.lang, c.escaped);
                                continue;
                            case "table":
                                for (a = u = "", i = c.header.length, n = 0; n < i; n++) a += this.renderer.tablecell(this.parseInline(c.tokens.header[n]), { header: !0, align: c.align[n] });
                                for (u += this.renderer.tablerow(a), o = "", i = c.cells.length, n = 0; n < i; n++) {
                                    for (a = "", s = (l = c.tokens.cells[n]).length, r = 0; r < s; r++) a += this.renderer.tablecell(this.parseInline(l[r]), { header: !1, align: c.align[r] });
                                    o += this.renderer.tablerow(a);
                                }
                                b += this.renderer.table(u, o);
                                continue;
                            case "blockquote":
                                (o = this.parse(c.tokens)), (b += this.renderer.blockquote(o));
                                continue;
                            case "list":
                                for (u = c.ordered, w = c.start, p = c.loose, i = c.items.length, o = "", n = 0; n < i; n++)
                                    (f = (g = c.items[n]).checked),
                                        (d = g.task),
                                        (h = ""),
                                        g.task &&
                                            ((k = this.renderer.checkbox(f)),
                                            p
                                                ? 0 < g.tokens.length && "text" === g.tokens[0].type
                                                    ? ((g.tokens[0].text = k + " " + g.tokens[0].text),
                                                      g.tokens[0].tokens && 0 < g.tokens[0].tokens.length && "text" === g.tokens[0].tokens[0].type && (g.tokens[0].tokens[0].text = k + " " + g.tokens[0].tokens[0].text))
                                                    : g.tokens.unshift({ type: "text", text: k })
                                                : (h += k)),
                                        (h += this.parse(g.tokens, p)),
                                        (o += this.renderer.listitem(h, d, f));
                                b += this.renderer.list(o, u, w);
                                continue;
                            case "html":
                                b += this.renderer.html(c.text);
                                continue;
                            case "paragraph":
                                b += this.renderer.paragraph(this.parseInline(c.tokens));
                                continue;
                            case "text":
                                for (o = c.tokens ? this.parseInline(c.tokens) : c.text; x + 1 < m && "text" === e[x + 1].type; ) o += "\n" + ((c = e[++x]).tokens ? this.parseInline(c.tokens) : c.text);
                                b += t ? this.renderer.paragraph(o) : o;
                                continue;
                            default:
                                var w = 'Token with "' + c.type + '" type was not found.';
                                if (this.options.silent) return void console.error(w);
                                throw new Error(w);
                        }
                    return b;
                }),
                (e.parseInline = function (e, t) {
                    t = t || this.renderer;
                    for (var n = "", r = e.length, i = 0; i < r; i++)
                        switch ((s = e[i]).type) {
                            case "escape":
                                n += t.text(s.text);
                                break;
                            case "html":
                                n += t.html(s.text);
                                break;
                            case "link":
                                n += t.link(s.href, s.title, this.parseInline(s.tokens, t));
                                break;
                            case "image":
                                n += t.image(s.href, s.title, s.text);
                                break;
                            case "strong":
                                n += t.strong(this.parseInline(s.tokens, t));
                                break;
                            case "em":
                                n += t.em(this.parseInline(s.tokens, t));
                                break;
                            case "codespan":
                                n += t.codespan(s.text);
                                break;
                            case "br":
                                n += t.br();
                                break;
                            case "del":
                                n += t.del(this.parseInline(s.tokens, t));
                                break;
                            case "text":
                                n += t.text(s.text);
                                break;
                            default:
                                var s = 'Token with "' + s.type + '" type was not found.';
                                if (this.options.silent) return void console.error(s);
                                throw new Error(s);
                        }
                    return n;
                }),
                n
            );
        })(),
        te = A,
        ne = I,
        re = _,
        _ = t.getDefaults,
        ie = t.changeDefaults,
        t = t.defaults;
    function se(e, n, r) {
        if (null == e) throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        if (("function" == typeof n && ((r = n), (n = null)), (n = te({}, se.defaults, n || {})), ne(n), r)) {
            var i,
                s = n.highlight;
            try {
                i = W.lex(e, n);
            } catch (e) {
                return r(e);
            }
            var l = function (t) {
                var e;
                if (!t)
                    try {
                        e = ee.parse(i, n);
                    } catch (e) {
                        t = e;
                    }
                return (n.highlight = s), t ? r(t) : r(null, e);
            };
            if (!s || s.length < 3) return l();
            if ((delete n.highlight, !i.length)) return l();
            var a = 0;
            return (
                se.walkTokens(i, function (n) {
                    "code" === n.type &&
                        (a++,
                        setTimeout(function () {
                            s(n.text, n.lang, function (e, t) {
                                return e ? l(e) : (null != t && t !== n.text && ((n.text = t), (n.escaped = !0)), void (0 === --a && l()));
                            });
                        }, 0));
                }),
                void (0 === a && l())
            );
        }
        try {
            var t = W.lex(e, n);
            return n.walkTokens && se.walkTokens(t, n.walkTokens), ee.parse(t, n);
        } catch (e) {
            if (((e.message += "\nPlease report this to https://github.com/markedjs/marked."), n.silent)) return "<p>An error occurred:</p><pre>" + re(e.message + "", !0) + "</pre>";
            throw e;
        }
    }
    return (
        (se.options = se.setOptions = function (e) {
            return te(se.defaults, e), ie(se.defaults), se;
        }),
        (se.getDefaults = _),
        (se.defaults = t),
        (se.use = function (a) {
            var t,
                n = te({}, a);
            a.renderer &&
                (function () {
                    var e,
                        l = se.defaults.renderer || new H();
                    for (e in a.renderer)
                        !(function (i) {
                            var s = l[i];
                            l[i] = function () {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                var r = a.renderer[i].apply(l, t);
                                return !1 === r && (r = s.apply(l, t)), r;
                            };
                        })(e);
                    n.renderer = l;
                })(),
                a.tokenizer &&
                    (function () {
                        var e,
                            l = se.defaults.tokenizer || new D();
                        for (e in a.tokenizer)
                            !(function (i) {
                                var s = l[i];
                                l[i] = function () {
                                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                    var r = a.tokenizer[i].apply(l, t);
                                    return !1 === r && (r = s.apply(l, t)), r;
                                };
                            })(e);
                        n.tokenizer = l;
                    })(),
                a.walkTokens &&
                    ((t = se.defaults.walkTokens),
                    (n.walkTokens = function (e) {
                        a.walkTokens(e), t && t(e);
                    })),
                se.setOptions(n);
        }),
        (se.walkTokens = function (e, t) {
            for (var n = u(e); !(r = n()).done; ) {
                var r = r.value;
                switch ((t(r), r.type)) {
                    case "table":
                        for (var i = u(r.tokens.header); !(s = i()).done; ) {
                            var s = s.value;
                            se.walkTokens(s, t);
                        }
                        for (var l, a = u(r.tokens.cells); !(l = a()).done; )
                            for (var o = u(l.value); !(c = o()).done; ) {
                                var c = c.value;
                                se.walkTokens(c, t);
                            }
                        break;
                    case "list":
                        se.walkTokens(r.items, t);
                        break;
                    default:
                        r.tokens && se.walkTokens(r.tokens, t);
                }
            }
        }),
        (se.parseInline = function (e, t) {
            if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");
            if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
            (t = te({}, se.defaults, t || {})), ne(t);
            try {
                var n = W.lexInline(e, t);
                return t.walkTokens && se.walkTokens(n, t.walkTokens), ee.parseInline(n, t);
            } catch (e) {
                if (((e.message += "\nPlease report this to https://github.com/markedjs/marked."), t.silent)) return "<p>An error occurred:</p><pre>" + re(e.message + "", !0) + "</pre>";
                throw e;
            }
        }),
        (se.Parser = ee),
        (se.parser = ee.parse),
        (se.Renderer = H),
        (se.TextRenderer = J),
        (se.Lexer = W),
        (se.lexer = W.lex),
        (se.Tokenizer = D),
        (se.Slugger = K),
        (se.parse = se)
    );
});