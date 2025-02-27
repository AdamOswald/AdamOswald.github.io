var hljs = new (function () {
  function l(o) {
    return o.replace(/&/gm, "&amp;").replace(/</gm, "&lt;");
  }
  function c(q, p, o) {
    return RegExp(p, "m" + (q.cI ? "i" : "") + (o ? "g" : ""));
  }
  function i(q) {
    for (var o = 0; o < q.childNodes.length; o++) {
      var p = q.childNodes[o];
      if (p.nodeName.toLowerCase() == "code") {
        return p;
      }
      if (!(p.nodeType == 3 && p.nodeValue.match(/\s+/))) {
        break;
      }
    }
  }
  function g(s, r) {
    var q = "";
    for (var p = 0; p < s.childNodes.length; p++) {
      if (s.childNodes[p].nodeType == 3) {
        var o = s.childNodes[p].nodeValue;
        if (r) {
          o = o.replace(/\n/g, "");
        }
        q += o;
      } else {
        if (s.childNodes[p].nodeName == "BR") {
          q += "\n";
        } else {
          q += g(s.childNodes[p]);
        }
      }
    }
    if (/MSIE [678]/.test(navigator.userAgent)) {
      q = q.replace(/\r/g, "\n");
    }
    return q;
  }
  function a(r) {
    var p = r.className.split(/\s+/);
    p = p.concat(r.parentNode.className.split(/\s+/));
    for (var o = 0; o < p.length; o++) {
      var q = p[o].replace(/^language-/, "");
      if (d[q] || q == "no-highlight") {
        return q;
      }
    }
  }
  function b(o) {
    var p = [];
    (function (r, s) {
      for (var q = 0; q < r.childNodes.length; q++) {
        if (r.childNodes[q].nodeType == 3) {
          s += r.childNodes[q].nodeValue.length;
        } else {
          if (r.childNodes[q].nodeName == "BR") {
            s += 1;
          } else {
            p.push({ event: "start", offset: s, node: r.childNodes[q] });
            s = arguments.callee(r.childNodes[q], s);
            p.push({ event: "stop", offset: s, node: r.childNodes[q] });
          }
        }
      }
      return s;
    })(o, 0);
    return p;
  }
  function k(x, y, w) {
    var q = 0;
    var v = "";
    var s = [];
    function t() {
      if (x.length && y.length) {
        if (x[0].offset != y[0].offset) {
          return x[0].offset < y[0].offset ? x : y;
        } else {
          return y[0].event == "start" ? x : y;
        }
      } else {
        return x.length ? x : y;
      }
    }
    function r(B) {
      var C = "<" + B.nodeName.toLowerCase();
      for (var z = 0; z < B.attributes.length; z++) {
        var A = B.attributes[z];
        C += " " + A.nodeName.toLowerCase();
        if (A.nodeValue != undefined) {
          C += '="' + l(A.nodeValue) + '"';
        }
      }
      return C + ">";
    }
    while (x.length || y.length) {
      var u = t().splice(0, 1)[0];
      v += l(w.substr(q, u.offset - q));
      q = u.offset;
      if (u.event == "start") {
        v += r(u.node);
        s.push(u.node);
      } else {
        if (u.event == "stop") {
          var p = s.length;
          do {
            p--;
            var o = s[p];
            v += "</" + o.nodeName.toLowerCase() + ">";
          } while (o != u.node);
          s.splice(p, 1);
          while (p < s.length) {
            v += r(s[p]);
            p++;
          }
        }
      }
    }
    v += w.substr(q);
    return v;
  }
  function f(I, C) {
    function y(r, L) {
      for (var K = 0; K < L.c.length; K++) {
        if (L.c[K].bR.test(r)) {
          return L.c[K];
        }
      }
    }
    function v(K, r) {
      if (B[K].e && B[K].eR.test(r)) {
        return 1;
      }
      if (B[K].eW) {
        var L = v(K - 1, r);
        return L ? L + 1 : 0;
      }
      return 0;
    }
    function w(r, K) {
      return K.iR && K.iR.test(r);
    }
    function z(N, M) {
      var L = [];
      for (var K = 0; K < N.c.length; K++) {
        L.push(N.c[K].b);
      }
      var r = B.length - 1;
      do {
        if (B[r].e) {
          L.push(B[r].e);
        }
        r--;
      } while (B[r + 1].eW);
      if (N.i) {
        L.push(N.i);
      }
      return c(M, "(" + L.join("|") + ")", true);
    }
    function q(L, K) {
      var M = B[B.length - 1];
      if (!M.t) {
        M.t = z(M, G);
      }
      M.t.lastIndex = K;
      var r = M.t.exec(L);
      if (r) {
        return [L.substr(K, r.index - K), r[0], false];
      } else {
        return [L.substr(K), "", true];
      }
    }
    function o(N, r) {
      var K = G.cI ? r[0].toLowerCase() : r[0];
      for (var M in N.kG) {
        if (!N.kG.hasOwnProperty(M)) {
          continue;
        }
        var L = N.kG[M].hasOwnProperty(K);
        if (L) {
          return [M, L];
        }
      }
      return false;
    }
    function E(L, N) {
      if (!N.k) {
        return l(L);
      }
      var M = "";
      var O = 0;
      N.lR.lastIndex = 0;
      var K = N.lR.exec(L);
      while (K) {
        M += l(L.substr(O, K.index - O));
        var r = o(N, K);
        if (r) {
          s += r[1];
          M += '<span class="' + r[0] + '">' + l(K[0]) + "</span>";
        } else {
          M += l(K[0]);
        }
        O = N.lR.lastIndex;
        K = N.lR.exec(L);
      }
      M += l(L.substr(O, L.length - O));
      return M;
    }
    function J(r, L) {
      if (L.sL && d[L.sL]) {
        var K = f(L.sL, r);
        s += K.keyword_count;
        return K.value;
      } else {
        return E(r, L);
      }
    }
    function H(L, r) {
      var K = L.cN ? '<span class="' + L.cN + '">' : "";
      if (L.rB) {
        p += K;
        L.buffer = "";
      } else {
        if (L.eB) {
          p += l(r) + K;
          L.buffer = "";
        } else {
          p += K;
          L.buffer = r;
        }
      }
      B.push(L);
      A += L.r;
    }
    function D(N, K, P) {
      var Q = B[B.length - 1];
      if (P) {
        p += J(Q.buffer + N, Q);
        return false;
      }
      var L = y(K, Q);
      if (L) {
        p += J(Q.buffer + N, Q);
        H(L, K);
        return L.rB;
      }
      var r = v(B.length - 1, K);
      if (r) {
        var M = Q.cN ? "</span>" : "";
        if (Q.rE) {
          p += J(Q.buffer + N, Q) + M;
        } else {
          if (Q.eE) {
            p += J(Q.buffer + N, Q) + M + l(K);
          } else {
            p += J(Q.buffer + N + K, Q) + M;
          }
        }
        while (r > 1) {
          M = B[B.length - 2].cN ? "</span>" : "";
          p += M;
          r--;
          B.length--;
        }
        var O = B[B.length - 1];
        B.length--;
        B[B.length - 1].buffer = "";
        if (O.starts) {
          H(O.starts, "");
        }
        return Q.rE;
      }
      if (w(K, Q)) {
        throw "Illegal";
      }
    }
    var G = d[I];
    var B = [G.dM];
    var A = 0;
    var s = 0;
    var p = "";
    try {
      var u = 0;
      G.dM.buffer = "";
      do {
        var x = q(C, u);
        var t = D(x[0], x[1], x[2]);
        u += x[0].length;
        if (!t) {
          u += x[1].length;
        }
      } while (!x[2]);
      if (B.length > 1) {
        throw "Illegal";
      }
      return { language: I, r: A, keyword_count: s, value: p };
    } catch (F) {
      if (F == "Illegal") {
        return { language: null, r: 0, keyword_count: 0, value: l(C) };
      } else {
        throw F;
      }
    }
  }
  function h() {
    function o(t, s, u) {
      if (t.compiled) {
        return;
      }
      if (!u) {
        t.bR = c(s, t.b ? t.b : "\\B|\\b");
        if (!t.e && !t.eW) {
          t.e = "\\B|\\b";
        }
        if (t.e) {
          t.eR = c(s, t.e);
        }
      }
      if (t.i) {
        t.iR = c(s, t.i);
      }
      if (t.r == undefined) {
        t.r = 1;
      }
      if (t.k) {
        t.lR = c(s, t.l || hljs.IR, true);
      }
      for (var r in t.k) {
        if (!t.k.hasOwnProperty(r)) {
          continue;
        }
        if (t.k[r] instanceof Object) {
          t.kG = t.k;
        } else {
          t.kG = { keyword: t.k };
        }
        break;
      }
      if (!t.c) {
        t.c = [];
      }
      t.compiled = true;
      for (var q = 0; q < t.c.length; q++) {
        o(t.c[q], s, false);
      }
      if (t.starts) {
        o(t.starts, s, false);
      }
    }
    for (var p in d) {
      if (!d.hasOwnProperty(p)) {
        continue;
      }
      o(d[p].dM, d[p], true);
    }
  }
  function e() {
    if (e.called) {
      return;
    }
    e.called = true;
    h();
  }
  function n(t, y, p) {
    e();
    var A = g(t, p);
    var r = a(t);
    if (r == "no-highlight") {
      return;
    }
    if (r) {
      var w = f(r, A);
    } else {
      var w = { language: "", keyword_count: 0, r: 0, value: l(A) };
      var x = w;
      for (var z in d) {
        if (!d.hasOwnProperty(z)) {
          continue;
        }
        var u = f(z, A);
        if (u.keyword_count + u.r > x.keyword_count + x.r) {
          x = u;
        }
        if (u.keyword_count + u.r > w.keyword_count + w.r) {
          x = w;
          w = u;
        }
      }
    }
    var s = t.className;
    if (!s.match(w.language)) {
      s = s ? s + " " + w.language : w.language;
    }
    var o = b(t);
    if (o.length) {
      var q = document.createElement("pre");
      q.innerHTML = w.value;
      w.value = k(o, b(q), A);
    }
    if (y) {
      w.value = w.value.replace(/^((<[^>]+>|\t)+)/gm, function (B, E, D, C) {
        return E.replace(/\t/g, y);
      });
    }
    if (p) {
      w.value = w.value.replace(/\n/g, "<br>");
    }
    if (
      /MSIE [678]/.test(navigator.userAgent) &&
      t.tagName.toLowerCase() == "code" &&
      t.parentNode.tagName == "PRE"
    ) {
      var q = t.parentNode;
      var v = document.createElement("div");
      v.innerHTML = "<pre><code>" + w.value + "</code></pre>";
      t = v.firstChild.firstChild;
      v.firstChild.cN = q.cN;
      q.parentNode.replaceChild(v.firstChild, q);
    } else {
      t.innerHTML = w.value;
    }
    t.className = s;
    t.dataset = {};
    t.dataset.result = { language: w.language, kw: w.keyword_count, re: w.r };
    if (x && x.language) {
      t.dataset.second_best = {
        language: x.language,
        kw: x.keyword_count,
        re: x.r,
      };
    }
  }
  function j() {
    if (j.called) {
      return;
    }
    j.called = true;
    e();
    var q = document.getElementsByTagName("pre");
    for (var o = 0; o < q.length; o++) {
      var p = i(q[o]);
      if (p) {
        n(p, hljs.tabReplace);
      }
    }
  }
  function m() {
    var o = arguments;
    var p = function () {
      j.apply(null, o);
    };
    if (window.addEventListener) {
      window.addEventListener("DOMContentLoaded", p, false);
      window.addEventListener("load", p, false);
    } else {
      if (window.attachEvent) {
        window.attachEvent("onload", p);
      } else {
        window.onload = p;
      }
    }
  }
  var d = {};
  this.LANGUAGES = d;
  this.initHighlightingOnLoad = m;
  this.highlightBlock = n;
  this.initHighlighting = j;
  this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
  this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
  this.NR = "\\b\\d+(\\.\\d+)?";
  this.CNR = "\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";
  this.RSR =
    "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
  this.BE = { b: "\\\\.", r: 0 };
  this.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [this.BE], r: 0 };
  this.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [this.BE], r: 0 };
  this.CLCM = { cN: "comment", b: "//", e: "$" };
  this.CBLCLM = { cN: "comment", b: "/\\*", e: "\\*/" };
  this.HCM = { cN: "comment", b: "#", e: "$" };
  this.NM = { cN: "number", b: this.NR, r: 0 };
  this.CNM = { cN: "number", b: this.CNR, r: 0 };
  this.inherit = function (o, r) {
    var q = {};
    for (var p in o) {
      q[p] = o[p];
    }
    if (r) {
      for (var p in r) {
        q[p] = r[p];
      }
    }
    return q;
  };
})();
hljs.LANGUAGES.cs = {
  dM: {
    k: {
      abstract: 1,
      as: 1,
      base: 1,
      bool: 1,
      break: 1,
      byte: 1,
      case: 1,
      catch: 1,
      char: 1,
      checked: 1,
      class: 1,
      const: 1,
      continue: 1,
      decimal: 1,
      default: 1,
      delegate: 1,
      do: 1,
      do: 1,
      double: 1,
      else: 1,
      enum: 1,
      event: 1,
      explicit: 1,
      extern: 1,
      false: 1,
      finally: 1,
      fixed: 1,
      float: 1,
      for: 1,
      foreach: 1,
      goto: 1,
      if: 1,
      implicit: 1,
      in: 1,
      int: 1,
      interface: 1,
      internal: 1,
      is: 1,
      lock: 1,
      long: 1,
      namespace: 1,
      new: 1,
      null: 1,
      object: 1,
      operator: 1,
      out: 1,
      override: 1,
      params: 1,
      private: 1,
      protected: 1,
      public: 1,
      readonly: 1,
      ref: 1,
      return: 1,
      sbyte: 1,
      sealed: 1,
      short: 1,
      sizeof: 1,
      stackalloc: 1,
      static: 1,
      string: 1,
      struct: 1,
      switch: 1,
      this: 1,
      throw: 1,
      true: 1,
      try: 1,
      typeof: 1,
      uint: 1,
      ulong: 1,
      unchecked: 1,
      unsafe: 1,
      ushort: 1,
      using: 1,
      virtual: 1,
      volatile: 1,
      void: 1,
      while: 1,
      ascending: 1,
      descending: 1,
      from: 1,
      get: 1,
      group: 1,
      into: 1,
      join: 1,
      let: 1,
      orderby: 1,
      partial: 1,
      select: 1,
      set: 1,
      value: 1,
      var: 1,
      where: 1,
      yield: 1,
    },
    c: [
      {
        cN: "comment",
        b: "///",
        e: "$",
        rB: true,
        c: [
          { cN: "xmlDocTag", b: "///|<!--|-->" },
          { cN: "xmlDocTag", b: "</?", e: ">" },
        ],
      },
      hljs.CLCM,
      hljs.CBLCLM,
      { cN: "string", b: '@"', e: '"', c: [{ b: '""' }] },
      hljs.ASM,
      hljs.QSM,
      hljs.CNM,
    ],
  },
};
hljs.LANGUAGES.javascript = {
  dM: {
    k: {
      keyword: {
        in: 1,
        if: 1,
        for: 1,
        while: 1,
        finally: 1,
        var: 1,
        new: 1,
        function: 1,
        do: 1,
        return: 1,
        void: 1,
        else: 1,
        break: 1,
        catch: 1,
        instanceof: 1,
        with: 1,
        throw: 1,
        case: 1,
        default: 1,
        try: 1,
        this: 1,
        switch: 1,
        continue: 1,
        typeof: 1,
        delete: 1,
      },
      literal: { true: 1, false: 1, null: 1 },
    },
    c: [
      hljs.ASM,
      hljs.QSM,
      hljs.CLCM,
      hljs.CBLCLM,
      hljs.CNM,
      {
        b: "(" + hljs.RSR + "|case|return|throw)\\s*",
        k: { return: 1, throw: 1, case: 1 },
        c: [hljs.CLCM, hljs.CBLCLM, { cN: "regexp", b: "/.*?[^\\\\/]/[gim]*" }],
        r: 0,
      },
      {
        cN: "function",
        b: "\\bfunction\\b",
        e: "{",
        k: { function: 1 },
        c: [
          { cN: "title", b: "[A-Za-z$_][0-9A-Za-z$_]*" },
          {
            cN: "params",
            b: "\\(",
            e: "\\)",
            c: [hljs.ASM, hljs.QSM, hljs.CLCM, hljs.CBLCLM],
          },
        ],
      },
    ],
  },
};
hljs.LANGUAGES.lua = (function () {
  var b = "\\[=*\\[";
  var e = "\\]=*\\]";
  var a = { b: b, e: e };
  a.c = [a];
  var d = { cN: "comment", b: "--(?!" + b + ")", e: "$" };
  var c = { cN: "comment", b: "--" + b, e: e, c: [a], r: 10 };
  return {
    dM: {
      l: hljs.UIR,
      k: {
        keyword: {
          and: 1,
          break: 1,
          do: 1,
          else: 1,
          elseif: 1,
          end: 1,
          false: 1,
          for: 1,
          if: 1,
          in: 1,
          local: 1,
          nil: 1,
          not: 1,
          or: 1,
          repeat: 1,
          return: 1,
          then: 1,
          true: 1,
          until: 1,
          while: 1,
        },
        built_in: {
          _G: 1,
          _VERSION: 1,
          assert: 1,
          collectgarbage: 1,
          dofile: 1,
          error: 1,
          getfenv: 1,
          getmetatable: 1,
          ipairs: 1,
          load: 1,
          loadfile: 1,
          loadstring: 1,
          module: 1,
          next: 1,
          pairs: 1,
          pcall: 1,
          print: 1,
          rawequal: 1,
          rawget: 1,
          rawset: 1,
          require: 1,
          select: 1,
          setfenv: 1,
          setmetatable: 1,
          tonumber: 1,
          tostring: 1,
          type: 1,
          unpack: 1,
          xpcall: 1,
          coroutine: 1,
          debug: 1,
          io: 1,
          math: 1,
          os: 1,
          package: 1,
          string: 1,
          table: 1,
        },
      },
      c: [
        d,
        c,
        {
          cN: "function",
          b: "\\bfunction\\b",
          e: "\\)",
          k: { function: 1 },
          c: [
            {
              cN: "title",
              b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*",
            },
            { cN: "params", b: "\\(", eW: true, c: [d, c] },
            d,
            c,
          ],
        },
        hljs.CNM,
        hljs.ASM,
        hljs.QSM,
        { cN: "string", b: b, e: e, c: [a], r: 10 },
      ],
    },
  };
})();
hljs.LANGUAGES.css = (function () {
  var a = {
    cN: "function",
    b: hljs.IR + "\\(",
    e: "\\)",
    c: [{ eW: true, eE: true, c: [hljs.NM, hljs.ASM, hljs.QSM] }],
  };
  return {
    cI: true,
    dM: {
      i: "[=/|']",
      c: [
        hljs.CBLCLM,
        { cN: "id", b: "\\#[A-Za-z0-9_-]+" },
        { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 },
        { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" },
        { cN: "pseudo", b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+" },
        {
          cN: "at_rule",
          b: "@font-face",
          l: "[a-z-]+",
          k: { "font-face": 1 },
        },
        {
          cN: "at_rule",
          b: "@",
          e: "[{;]",
          eE: true,
          k: { import: 1, page: 1, media: 1, charset: 1 },
          c: [a, hljs.ASM, hljs.QSM, hljs.NM],
        },
        { cN: "tag", b: hljs.IR, r: 0 },
        {
          cN: "rules",
          b: "{",
          e: "}",
          i: "[^\\s]",
          r: 0,
          c: [
            hljs.CBLCLM,
            {
              cN: "rule",
              b: "[^\\s]",
              rB: true,
              e: ";",
              eW: true,
              c: [
                {
                  cN: "attribute",
                  b: "[A-Z\\_\\.\\-]+",
                  e: ":",
                  eE: true,
                  i: "[^\\s]",
                  starts: {
                    cN: "value",
                    eW: true,
                    eE: true,
                    c: [
                      a,
                      hljs.NM,
                      hljs.QSM,
                      hljs.ASM,
                      hljs.CBLCLM,
                      { cN: "hexcolor", b: "\\#[0-9A-F]+" },
                      { cN: "important", b: "!important" },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };
})();
hljs.LANGUAGES.xml = (function () {
  var b = "[A-Za-z0-9\\._:-]+";
  var a = {
    eW: true,
    c: [
      { cN: "attribute", b: b, r: 0 },
      {
        b: '="',
        rB: true,
        e: '"',
        c: [{ cN: "value", b: '"', eW: true }],
      },
      {
        b: "='",
        rB: true,
        e: "'",
        c: [{ cN: "value", b: "'", eW: true }],
      },
      { b: "=", c: [{ cN: "value", b: "[^\\s/>]+" }] },
    ],
  };
  return {
    cI: true,
    dM: {
      c: [
        { cN: "pi", b: "<\\?", e: "\\?>", r: 10 },
        { cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10 },
        { cN: "comment", b: "<!--", e: "-->", r: 10 },
        { cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 },
        {
          cN: "tag",
          b: "<style",
          e: ">",
          k: { title: { style: 1 } },
          c: [a],
          starts: { cN: "css", e: "</style>", rE: true, sL: "css" },
        },
        {
          cN: "tag",
          b: "<script",
          e: ">",
          k: { title: { script: 1 } },
          c: [a],
          starts: {
            cN: "javascript",
            e: "</script>",
            rE: true,
            sL: "javascript",
          },
        },
        { cN: "vbscript", b: "<%", e: "%>", sL: "vbscript" },
        {
          cN: "tag",
          b: "</?",
          e: "/?>",
          c: [{ cN: "title", b: "[^ />]+" }, a],
        },
      ],
    },
  };
})();
hljs.LANGUAGES.java = {
  dM: {
    k: {
      false: 1,
      synchronized: 1,
      int: 1,
      abstract: 1,
      float: 1,
      private: 1,
      char: 1,
      interface: 1,
      boolean: 1,
      static: 1,
      null: 1,
      if: 1,
      const: 1,
      for: 1,
      true: 1,
      while: 1,
      long: 1,
      throw: 1,
      strictfp: 1,
      finally: 1,
      protected: 1,
      extends: 1,
      import: 1,
      native: 1,
      final: 1,
      implements: 1,
      return: 1,
      void: 1,
      enum: 1,
      else: 1,
      break: 1,
      transient: 1,
      new: 1,
      catch: 1,
      instanceof: 1,
      byte: 1,
      super: 1,
      class: 1,
      volatile: 1,
      case: 1,
      assert: 1,
      short: 1,
      package: 1,
      default: 1,
      double: 1,
      public: 1,
      try: 1,
      this: 1,
      switch: 1,
      continue: 1,
      throws: 1,
    },
    c: [
      {
        cN: "javadoc",
        b: "/\\*\\*",
        e: "\\*/",
        c: [{ cN: "javadoctag", b: "@[A-Za-z]+" }],
        r: 10,
      },
      hljs.CLCM,
      hljs.CBLCLM,
      hljs.ASM,
      hljs.QSM,
      {
        cN: "class",
        b: "(class |interface )",
        e: "{",
        k: { class: 1, interface: 1 },
        i: ":",
        c: [
          {
            b: "(implements|extends)",
            k: { extends: 1, implements: 1 },
            r: 10,
          },
          { cN: "title", b: hljs.UIR },
        ],
      },
      hljs.CNM,
      { cN: "annotation", b: "@[A-Za-z]+" },
    ],
  },
};
hljs.LANGUAGES.php = {
  cI: true,
  dM: {
    k: {
      and: 1,
      include_once: 1,
      list: 1,
      abstract: 1,
      global: 1,
      private: 1,
      echo: 1,
      interface: 1,
      as: 1,
      static: 1,
      endswitch: 1,
      array: 1,
      null: 1,
      if: 1,
      endwhile: 1,
      or: 1,
      const: 1,
      for: 1,
      endforeach: 1,
      self: 1,
      var: 1,
      while: 1,
      isset: 1,
      public: 1,
      protected: 1,
      exit: 1,
      foreach: 1,
      throw: 1,
      elseif: 1,
      extends: 1,
      include: 1,
      __FILE__: 1,
      empty: 1,
      require_once: 1,
      function: 1,
      do: 1,
      xor: 1,
      return: 1,
      implements: 1,
      parent: 1,
      clone: 1,
      use: 1,
      __CLASS__: 1,
      __LINE__: 1,
      else: 1,
      break: 1,
      print: 1,
      eval: 1,
      new: 1,
      catch: 1,
      __METHOD__: 1,
      class: 1,
      case: 1,
      exception: 1,
      php_user_filter: 1,
      default: 1,
      die: 1,
      require: 1,
      __FUNCTION__: 1,
      enddeclare: 1,
      final: 1,
      try: 1,
      this: 1,
      switch: 1,
      continue: 1,
      endfor: 1,
      endif: 1,
      declare: 1,
      unset: 1,
      true: 1,
      false: 1,
      namespace: 1,
    },
    c: [
      hljs.CLCM,
      hljs.HCM,
      {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [{ cN: "phpdoc", b: "\\s@[A-Za-z]+", r: 10 }],
      },
      hljs.CNM,
      hljs.inherit(hljs.ASM, { i: null }),
      hljs.inherit(hljs.QSM, { i: null }),
      { cN: "variable", b: "\\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*" },
      { cN: "preprocessor", b: "<\\?php", r: 10 },
      { cN: "preprocessor", b: "\\?>" },
    ],
  },
};
hljs.LANGUAGES.python = (function () {
  var c = { cN: "string", b: "u?r?'''", e: "'''", r: 10 };
  var b = { cN: "string", b: 'u?r?"""', e: '"""', r: 10 };
  var a = { cN: "string", b: "(u|r|ur)'", e: "'", c: [hljs.BE], r: 10 };
  var f = { cN: "string", b: '(u|r|ur)"', e: '"', c: [hljs.BE], r: 10 };
  var d = { cN: "title", b: hljs.UIR };
  var e = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: [c, b, a, f, hljs.ASM, hljs.QSM],
  };
  return {
    dM: {
      k: {
        keyword: {
          and: 1,
          elif: 1,
          is: 1,
          global: 1,
          as: 1,
          in: 1,
          if: 1,
          from: 1,
          raise: 1,
          for: 1,
          except: 1,
          finally: 1,
          print: 1,
          import: 1,
          pass: 1,
          return: 1,
          exec: 1,
          else: 1,
          break: 1,
          not: 1,
          with: 1,
          class: 1,
          assert: 1,
          yield: 1,
          try: 1,
          while: 1,
          continue: 1,
          del: 1,
          or: 1,
          def: 1,
          lambda: 1,
          nonlocal: 10,
        },
        built_in: {
          None: 1,
          True: 1,
          False: 1,
          Ellipsis: 1,
          NotImplemented: 1,
        },
      },
      i: "(</|->|\\?)",
      c: [
        hljs.HCM,
        c,
        b,
        a,
        f,
        hljs.ASM,
        hljs.QSM,
        {
          cN: "function",
          b: "\\bdef ",
          e: ":",
          i: "$",
          k: { def: 1 },
          c: [d, e],
          r: 10,
        },
        {
          cN: "class",
          b: "\\bclass ",
          e: ":",
          i: "[${]",
          k: { class: 1 },
          c: [d, e],
          r: 10,
        },
        hljs.CNM,
        { cN: "decorator", b: "@", e: "$" },
      ],
    },
  };
})();
hljs.LANGUAGES.sql = {
  cI: true,
  dM: {
    i: "[^\\s]",
    c: [
      {
        cN: "operator",
        b: "(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma)\\b",
        e: ";|$",
        k: {
          keyword: {
            all: 1,
            partial: 1,
            global: 1,
            month: 1,
            current_timestamp: 1,
            using: 1,
            go: 1,
            revoke: 1,
            smallint: 1,
            indicator: 1,
            "end-exec": 1,
            disconnect: 1,
            zone: 1,
            with: 1,
            character: 1,
            assertion: 1,
            to: 1,
            add: 1,
            current_user: 1,
            usage: 1,
            input: 1,
            local: 1,
            alter: 1,
            match: 1,
            collate: 1,
            real: 1,
            then: 1,
            rollback: 1,
            get: 1,
            read: 1,
            timestamp: 1,
            session_user: 1,
            not: 1,
            integer: 1,
            bit: 1,
            unique: 1,
            day: 1,
            minute: 1,
            desc: 1,
            insert: 1,
            execute: 1,
            like: 1,
            ilike: 2,
            level: 1,
            decimal: 1,
            drop: 1,
            continue: 1,
            isolation: 1,
            found: 1,
            where: 1,
            constraints: 1,
            domain: 1,
            right: 1,
            national: 1,
            some: 1,
            module: 1,
            transaction: 1,
            relative: 1,
            second: 1,
            connect: 1,
            escape: 1,
            close: 1,
            system_user: 1,
            for: 1,
            deferred: 1,
            section: 1,
            cast: 1,
            current: 1,
            sqlstate: 1,
            allocate: 1,
            intersect: 1,
            deallocate: 1,
            numeric: 1,
            public: 1,
            preserve: 1,
            full: 1,
            goto: 1,
            initially: 1,
            asc: 1,
            no: 1,
            key: 1,
            output: 1,
            collation: 1,
            group: 1,
            by: 1,
            union: 1,
            session: 1,
            both: 1,
            last: 1,
            language: 1,
            constraint: 1,
            column: 1,
            of: 1,
            space: 1,
            foreign: 1,
            deferrable: 1,
            prior: 1,
            connection: 1,
            unknown: 1,
            action: 1,
            commit: 1,
            view: 1,
            or: 1,
            first: 1,
            into: 1,
            float: 1,
            year: 1,
            primary: 1,
            cascaded: 1,
            except: 1,
            restrict: 1,
            set: 1,
            references: 1,
            names: 1,
            table: 1,
            outer: 1,
            open: 1,
            select: 1,
            size: 1,
            are: 1,
            rows: 1,
            from: 1,
            prepare: 1,
            distinct: 1,
            leading: 1,
            create: 1,
            only: 1,
            next: 1,
            inner: 1,
            authorization: 1,
            schema: 1,
            corresponding: 1,
            option: 1,
            declare: 1,
            precision: 1,
            immediate: 1,
            else: 1,
            timezone_minute: 1,
            external: 1,
            varying: 1,
            translation: 1,
            true: 1,
            case: 1,
            exception: 1,
            join: 1,
            hour: 1,
            default: 1,
            double: 1,
            scroll: 1,
            value: 1,
            cursor: 1,
            descriptor: 1,
            values: 1,
            dec: 1,
            fetch: 1,
            procedure: 1,
            delete: 1,
            and: 1,
            false: 1,
            int: 1,
            is: 1,
            describe: 1,
            char: 1,
            as: 1,
            at: 1,
            in: 1,
            varchar: 1,
            null: 1,
            trailing: 1,
            any: 1,
            absolute: 1,
            current_time: 1,
            end: 1,
            grant: 1,
            privileges: 1,
            when: 1,
            cross: 1,
            check: 1,
            write: 1,
            current_date: 1,
            pad: 1,
            begin: 1,
            temporary: 1,
            exec: 1,
            time: 1,
            update: 1,
            catalog: 1,
            user: 1,
            sql: 1,
            date: 1,
            on: 1,
            identity: 1,
            timezone_hour: 1,
            natural: 1,
            whenever: 1,
            interval: 1,
            work: 1,
            order: 1,
            cascade: 1,
            diagnostics: 1,
            nchar: 1,
            having: 1,
            left: 1,
            call: 1,
            do: 1,
            handler: 1,
            load: 1,
            replace: 1,
            truncate: 1,
            start: 1,
            lock: 1,
            show: 1,
            pragma: 1,
          },
          aggregate: { count: 1, sum: 1, min: 1, max: 1, avg: 1 },
        },
        c: [
          { cN: "string", b: "'", e: "'", c: [hljs.BE, { b: "''" }], r: 0 },
          { cN: "string", b: '"', e: '"', c: [hljs.BE, { b: '""' }], r: 0 },
          { cN: "string", b: "`", e: "`", c: [hljs.BE] },
          hljs.CNM,
          { b: "\\n" },
        ],
      },
      hljs.CBLCLM,
      { cN: "comment", b: "--", e: "$" },
    ],
  },
};
hljs.LANGUAGES.cpp = (function () {
  var b = {
    keyword: {
      false: 1,
      int: 1,
      float: 1,
      while: 1,
      private: 1,
      char: 1,
      catch: 1,
      export: 1,
      virtual: 1,
      operator: 2,
      sizeof: 2,
      dynamic_cast: 2,
      typedef: 2,
      const_cast: 2,
      const: 1,
      struct: 1,
      for: 1,
      static_cast: 2,
      union: 1,
      namespace: 1,
      unsigned: 1,
      long: 1,
      throw: 1,
      volatile: 2,
      static: 1,
      protected: 1,
      bool: 1,
      template: 1,
      mutable: 1,
      if: 1,
      public: 1,
      friend: 2,
      do: 1,
      return: 1,
      goto: 1,
      auto: 1,
      void: 2,
      enum: 1,
      else: 1,
      break: 1,
      new: 1,
      extern: 1,
      using: 1,
      true: 1,
      class: 1,
      asm: 1,
      case: 1,
      typeid: 1,
      short: 1,
      reinterpret_cast: 2,
      default: 1,
      double: 1,
      register: 1,
      explicit: 1,
      signed: 1,
      typename: 1,
      try: 1,
      this: 1,
      switch: 1,
      continue: 1,
      wchar_t: 1,
      inline: 1,
      delete: 1,
      alignof: 1,
      char16_t: 1,
      char32_t: 1,
      constexpr: 1,
      decltype: 1,
      noexcept: 1,
      nullptr: 1,
      static_assert: 1,
      thread_local: 1,
    },
    built_in: {
      std: 1,
      string: 1,
      cin: 1,
      cout: 1,
      cerr: 1,
      clog: 1,
      stringstream: 1,
      istringstream: 1,
      ostringstream: 1,
      auto_ptr: 1,
      deque: 1,
      list: 1,
      queue: 1,
      stack: 1,
      vector: 1,
      map: 1,
      set: 1,
      bitset: 1,
      multiset: 1,
      multimap: 1,
      unordered_set: 1,
      unordered_map: 1,
      unordered_multiset: 1,
      unordered_multimap: 1,
      array: 1,
      shared_ptr: 1,
    },
  };
  var a = {
    cN: "stl_container",
    b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
    e: ">",
    k: b.built_in,
    r: 10,
  };
  a.c = [a];
  return {
    dM: {
      k: b,
      i: "</",
      c: [
        hljs.CLCM,
        hljs.CBLCLM,
        hljs.QSM,
        { cN: "string", b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" },
        hljs.CNM,
        { cN: "preprocessor", b: "#", e: "$" },
        a,
      ],
    },
  };
})();
