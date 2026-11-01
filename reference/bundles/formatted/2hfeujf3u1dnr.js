(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  86210,
  (e) => {
    "use strict";
    var t = e.i(43476),
      r = e.i(71645);
    let n = (0, e.i(75254).default)("x", [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
    ]);
    var o = e.i(89970),
      a = e.i(65747);
    (o.default.registerPlugin(a.useGSAP),
      e.s(
        [
          "default",
          0,
          ({
            isOpen: e = !1,
            onClose: l,
            children: i,
            className: u = "",
            contentClassName: s = "",
            showCloseButton: c = !0,
            closeOnBackdrop: d = !0,
            closeOnEsc: m = !0,
            closeButtonClassName: f = "",
            ariaLabel: p = "Dialog",
            ariaLabelledby: b,
            overlayOpacity: v = 0.82,
          }) => {
            let y = (0, r.useRef)(null),
              x = (0, r.useRef)(null),
              h = (0, r.useRef)(null),
              w = (0, r.useRef)(null),
              g = (0, r.useRef)(null),
              [k, j] = (0, r.useState)(!1),
              [C, E] = (0, r.useState)(e);
            e !== C && (E(e), j(!e && C));
            let T = e || k;
            return (
              (0, a.useGSAP)(
                () => {
                  let t = h.current,
                    r = w.current;
                  if (!t || !r) return;
                  g.current?.kill();
                  let n = window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches,
                    a = n ? 0.2 : e ? 0.7 : 0.5,
                    l = n ? "none" : e ? "power3.out" : "power2.in";
                  if (e) {
                    let e = o.default.timeline();
                    ((g.current = e),
                      e
                        .fromTo(
                          t,
                          { opacity: 0 },
                          { opacity: 1, duration: a, ease: l },
                        )
                        .fromTo(
                          r,
                          { opacity: 0, scale: n ? 1 : 0.8 },
                          { opacity: 1, scale: 1, duration: a, ease: l },
                          0,
                        ));
                    return;
                  }
                  let i = o.default.timeline({ onComplete: () => j(!1) });
                  ((g.current = i),
                    i
                      .to(t, { opacity: 0, duration: a, ease: l })
                      .to(
                        r,
                        {
                          opacity: 0,
                          scale: n ? 1 : 0.8,
                          duration: a,
                          ease: l,
                        },
                        0,
                      ));
                },
                { dependencies: [e], revertOnUpdate: !1 },
              ),
              (0, r.useEffect)(() => () => void g.current?.kill(), []),
              (0, r.useEffect)(() => {
                if (!T) return;
                let e = y.current;
                ((x.current = document.activeElement), e?.focus());
                let t = (t) => {
                  if (m && "Escape" === t.key) return void l?.();
                  if ("Tab" !== t.key) return;
                  let r = e
                    ? Array.from(
                        e.querySelectorAll(
                          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
                        ),
                      ).filter(
                        (e) =>
                          null !== e.offsetParent ||
                          e === document.activeElement,
                      )
                    : [];
                  if (0 === r.length) {
                    (t.preventDefault(), e?.focus());
                    return;
                  }
                  let n = r[0],
                    o = r[r.length - 1],
                    a = document.activeElement,
                    i = e?.contains(a);
                  t.shiftKey && (a === n || !i)
                    ? (t.preventDefault(), o.focus())
                    : t.shiftKey ||
                      (a !== o && i) ||
                      (t.preventDefault(), n.focus());
                };
                document.addEventListener("keydown", t);
                let r = document.body.style.overflow;
                return (
                  (document.body.style.overflow = "hidden"),
                  () => {
                    (document.removeEventListener("keydown", t),
                      (document.body.style.overflow = r),
                      x.current?.focus?.());
                  }
                );
              }, [T, l, m]),
              (0, t.jsxs)("div", {
                ref: y,
                role: "dialog",
                "aria-modal": "true",
                "aria-label": b ? void 0 : p,
                "aria-labelledby": b,
                tabIndex: -1,
                "data-lenis-prevent": !0,
                ...(!e ? { inert: !0, "aria-hidden": "true" } : {}),
                className: `
        fixed inset-0 z-9999
        ${e ? "pointer-events-auto" : "pointer-events-none"}
        ${u}
      `,
                children: [
                  (0, t.jsx)("button", {
                    ref: h,
                    type: "button",
                    "aria-label": "Close modal",
                    onClick: d ? l : void 0,
                    style: { opacity: 0 },
                    className:
                      "absolute inset-0 cursor-pointer border-0 backdrop-blur-lg bg-black/10 will-change-[opacity]",
                  }),
                  c &&
                    (0, t.jsx)("button", {
                      type: "button",
                      onClick: (e) => {
                        (e.stopPropagation(), l?.());
                      },
                      "aria-label": "Close modal",
                      className: `
            absolute z-99999
            flex items-center justify-center
            rounded-full border-0
             text-white
            cursor-pointer
            backdrop-blur-md
            transition-all duration-300
            hover:scale-[1.04]
            hover:bg-white/20
            pointer-events-auto
            touch-manipulation
            min-w-10 min-h-10

            top-[1.5vw] right-[1.5vw] w-[3vw] h-[3vw]
            max-[1025px]:top-8 max-[1025px]:right-8 max-[1025px]:w-14 max-[1025px]:h-14
            max-md:top-4 max-md:right-4 max-md:w-10 max-md:h-10

            ${f}
          `,
                      children: (0, t.jsx)(n, {
                        size: 24,
                        className: "pointer-events-none",
                      }),
                    }),
                  (0, t.jsx)("div", {
                    ref: w,
                    onClick: (e) => {
                      d && e.target === e.currentTarget && l?.();
                    },
                    style: { opacity: 0, transform: "scale(0.8)" },
                    className: `
          relative z-1
          flex h-screen w-screen items-center
          will-change-[transform,opacity]
          px-0

          max-[1025px]:px-0
          max-md:justify-center max-md:px-0

          ${s}
        `,
                    children: i,
                  }),
                ],
              })
            );
          },
        ],
        86210,
      ));
  },
  3924,
  function (e) {
    e.n(e.i(86210));
  },
]);
