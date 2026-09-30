"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import {
  CATEGORIAS,
  GRUPOS,
  MATERIAL_LABEL,
  MATERIALES_ESTANDAR,
  MATERIALES_ALIANZAS,
  TIPO_PRODUCTO_LABEL,
  TIPOS_PRODUCTO_ORDEN,
  inferirTipoProducto,
  OPCIONES_ORDEN,
  colorSwatch,
} from "../lib/categorias";

export default function CatalogoClient({ productos }) {
  const searchParams = useSearchParams();
  const [grupoActivo, setGrupoActivo] = useState("caballero");
  const [categoriaActiva, setCategoriaActiva] = useState("relojes");
  const [filtros, setFiltros] = useState({
    marca: new Set(),
    material: new Set(),
    abridor: null, // true | false | null (null = sin filtrar)
    soloNuevos: false,
    tipoProducto: null, // "aros" | "pulseras" | "collares" | "dijes" | "anillos" | null
    color: new Set(),
    precioMin: "",
    precioMax: "",
    orden: "destacado",
  });
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [seccionesAbiertas, setSeccionesAbiertas] = useState(
    () => new Set(["orden", "precio", "color", "marca", "material", "abridor"])
  );

  function toggleSeccion(clave) {
    setSeccionesAbiertas((prev) => {
      const next = new Set(prev);
      next.has(clave) ? next.delete(clave) : next.add(clave);
      return next;
    });
  }

  // Permite entrar directo a un grupo vía /catalogo?grupo=dama, a una
  // categoría vía ?cat=anillos y con filtros de marca/material ya
  // aplicados (usado por el mega menú del header y por los links de
  // "Comprá por categoría" en la home). Como una misma categoría puede
  // vivir en más de un grupo (ej. relojes en Caballero y en Dama), si no
  // viene ?grupo= entra al primer grupo que contenga esa categoría.
  // Usa useSearchParams (no window.location) para que también reaccione
  // cuando se navega entre estos links sin recargar la página.
  useEffect(() => {
    const cat = searchParams.get("cat");
    const grupoParam = searchParams.get("grupo");
    const materialParams = searchParams.getAll("material");
    const marcaParams = searchParams.getAll("marca");
    const soloNuevosParam = searchParams.get("nuevo") === "1";

    let grupo = null;
    let cat_ = null;

    if (grupoParam && GRUPOS.some((g) => g.slug === grupoParam)) {
      grupo = GRUPOS.find((g) => g.slug === grupoParam);
      cat_ = cat && grupo.categorias.some((c) => c.slug === cat) ? cat : grupo.categorias[0]?.slug ?? null;
    } else if (cat) {
      grupo = GRUPOS.find((g) => g.categorias.some((c) => c.slug === cat));
      cat_ = grupo ? cat : null;
    }

    if (!grupo) return;

    setGrupoActivo(grupo.slug);
    setCategoriaActiva(cat_);
    setFiltros({
      marca: new Set(marcaParams),
      material: new Set(materialParams),
      abridor: null,
      soloNuevos: soloNuevosParam,
      tipoProducto: null,
      color: new Set(),
      precioMin: "",
      precioMax: "",
      orden: "destacado",
    });
  }, [searchParams]);

  const grupoInfo = GRUPOS.find((g) => g.slug === grupoActivo);
  const categoriaConfig = grupoInfo?.categorias.find((c) => c.slug === categoriaActiva);
  const categoriaInfo = categoriaConfig && CATEGORIAS.find((c) => c.slug === categoriaConfig.slug);

  const productosCategoria = useMemo(() => {
    if (!categoriaConfig) return [];
    return productos.filter(
      (p) =>
        p.categoria_slug === categoriaConfig.slug &&
        (categoriaConfig.tipo == null || p.tipo === categoriaConfig.tipo)
    );
  }, [productos, categoriaConfig]);

  const marcasDisponibles = useMemo(
    () =>
      [...new Set(productosCategoria.map((p) => p.marca).filter(Boolean))].sort(),
    [productosCategoria]
  );

  const tiposProductoDisponibles = useMemo(() => {
    const presentes = new Set(
      productosCategoria.map((p) => inferirTipoProducto(p.titulo)).filter(Boolean)
    );
    return TIPOS_PRODUCTO_ORDEN.filter((t) => presentes.has(t));
  }, [productosCategoria]);

  const coloresDisponibles = useMemo(
    () => [...new Set(productosCategoria.map((p) => p.linea).filter(Boolean))].sort(),
    [productosCategoria]
  );

  const productosFiltrados = useMemo(() => {
    const min = filtros.precioMin !== "" ? Number(filtros.precioMin) : null;
    const max = filtros.precioMax !== "" ? Number(filtros.precioMax) : null;
    return productosCategoria.filter((p) => {
      if (filtros.marca.size && !filtros.marca.has(p.marca)) return false;
      if (filtros.material.size && !filtros.material.has(p.material))
        return false;
      if (filtros.abridor !== null && p.tiene_abridor !== filtros.abridor)
        return false;
      if (filtros.soloNuevos && !p.destacar_nuevo) return false;
      if (filtros.tipoProducto && inferirTipoProducto(p.titulo) !== filtros.tipoProducto)
        return false;
      if (filtros.color.size && !filtros.color.has(p.linea)) return false;
      if (min !== null && !(p.precio >= min)) return false;
      if (max !== null && !(p.precio <= max)) return false;
      return true;
    });
  }, [productosCategoria, filtros]);

  const productosOrdenados = useMemo(() => {
    if (filtros.orden === "az" || filtros.orden === "za") {
      const signo = filtros.orden === "az" ? 1 : -1;
      return [...productosFiltrados].sort(
        (a, b) => signo * (a.titulo || "").localeCompare(b.titulo || "")
      );
    }
    if (filtros.orden === "precio-asc" || filtros.orden === "precio-desc") {
      const signo = filtros.orden === "precio-asc" ? 1 : -1;
      return [...productosFiltrados].sort((a, b) => {
        // Productos sin precio (a consultar) siempre quedan al final,
        // sea cual sea el sentido del orden.
        if (a.precio == null && b.precio == null) return 0;
        if (a.precio == null) return 1;
        if (b.precio == null) return -1;
        return (a.precio - b.precio) * signo;
      });
    }
    return productosFiltrados;
  }, [productosFiltrados, filtros.orden]);

  function limpiarFiltros() {
    setFiltros({
      marca: new Set(),
      material: new Set(),
      abridor: null,
      soloNuevos: false,
      tipoProducto: null,
      color: new Set(),
      precioMin: "",
      precioMax: "",
      orden: "destacado",
    });
  }

  function cambiarCategoria(slug) {
    setCategoriaActiva(slug);
    limpiarFiltros();
  }

  // Acceso directo a "Nuevos ingresos" desde el hover de la tira de
  // categorías (ej. Swarovski), igual que el link del mega menú del
  // header pero sin salir de la página si ya estás en el catálogo.
  function irANuevosIngresos(slug) {
    setCategoriaActiva(slug);
    setFiltros({
      marca: new Set(),
      material: new Set(),
      abridor: null,
      soloNuevos: true,
      tipoProducto: null,
      color: new Set(),
      precioMin: "",
      precioMax: "",
      orden: "destacado",
    });
  }

  // Permite saltar de Caballero a Dama (y viceversa) sin pasar por el
  // menú de arriba, manteniendo la misma categoría si existe en el
  // otro grupo (ej. de Caballero > Relojes a Dama > Relojes).
  function cambiarGrupo(slug) {
    const grupo = GRUPOS.find((g) => g.slug === slug);
    const mantieneCategoria = grupo.categorias.some((c) => c.slug === categoriaActiva);
    setGrupoActivo(slug);
    setCategoriaActiva(mantieneCategoria ? categoriaActiva : grupo.categorias[0]?.slug ?? null);
    limpiarFiltros();
  }

  function toggleSetFiltro(campo, valor) {
    setFiltros((prev) => {
      const next = new Set(prev[campo]);
      next.has(valor) ? next.delete(valor) : next.add(valor);
      return { ...prev, [campo]: next };
    });
  }

  return (
    <section className="container" style={{ padding: "20px 0 90px" }}>
      {/* Indicador de grupo activo (Caballero/Dama), con acceso directo
          para saltar al otro sin volver al menú de arriba. Alianzas no
          tiene contraparte de género, así que no muestra el switch. */}
      {(grupoActivo === "caballero" || grupoActivo === "dama") && (
        <div
          className="stamp"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "18px 0 0",
            color: "var(--ink-soft)",
          }}
        >
          <span style={{ color: "var(--ink)", fontWeight: 700 }}>
            {grupoActivo === "caballero" ? "Caballero" : "Dama"}
          </span>
          <span style={{ opacity: 0.5 }}>·</span>
          <button
            type="button"
            onClick={() => cambiarGrupo(grupoActivo === "caballero" ? "dama" : "caballero")}
            className="stamp"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--oro-deep)",
              borderBottom: "1px solid var(--oro)",
            }}
          >
            Cambiar a {grupoActivo === "caballero" ? "Dama" : "Caballero"}
          </button>
        </div>
      )}

      {/* Tira de categorías dentro del grupo activo */}
      {grupoInfo.categorias.length > 1 && (
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "10px 0 40px", borderBottom: "1px solid var(--line)" }}>
          {grupoInfo.categorias.map(({ slug }) => {
            const cat = CATEGORIAS.find((c) => c.slug === slug);
            const tieneNuevos = cat.filtros.includes("nuevo");
            return (
              <div key={slug} className={tieneNuevos ? "tab-hover-wrap" : undefined}>
                <button
                  onClick={() => cambiarCategoria(slug)}
                  className="stamp"
                  style={{
                    padding: "14px 22px",
                    border: `1px solid ${categoriaActiva === slug ? "var(--oro)" : "var(--line)"}`,
                    borderRadius: 4,
                    background: categoriaActiva === slug ? "#FBF6EC" : "var(--card-bg)",
                    color: "var(--ink)",
                    cursor: "pointer",
                  }}
                >
                  {cat.nombre}
                </button>

                {tieneNuevos && (
                  <div className="tab-hover-panel">
                    <button
                      onClick={() => irANuevosIngresos(slug)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 16px",
                        border: "none",
                        background: "none",
                        fontFamily: "var(--font-sans)",
                        color: "var(--ink-soft)",
                        fontSize: 13,
                        fontWeight: 400,
                        letterSpacing: "normal",
                        textTransform: "none",
                        cursor: "pointer",
                      }}
                    >
                      Nuevos ingresos
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!categoriaInfo ? (
        <p style={{ color: "var(--ink-soft)", marginTop: 40 }}>Próximamente.</p>
      ) : (
      <div style={{ marginTop: 40 }}>
        {/* Fila superior: filtros siempre visibles (Tipo de producto,
            Novedades) a la izquierda, disparador de "Filtrar y ordenar"
            a la derecha. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            {categoriaInfo.filtros.includes("tipoProducto") && tiposProductoDisponibles.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                {tiposProductoDisponibles.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setFiltros((prev) => ({
                        ...prev,
                        tipoProducto: prev.tipoProducto === t ? null : t,
                      }))
                    }
                    className="stamp"
                    style={{
                      padding: "9px 16px",
                      border: `1px solid ${filtros.tipoProducto === t ? "var(--oro)" : "var(--line)"}`,
                      borderRadius: 999,
                      background: filtros.tipoProducto === t ? "#FBF6EC" : "var(--card-bg)",
                      color: "var(--ink)",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {TIPO_PRODUCTO_LABEL[t]}
                  </button>
                ))}
              </div>
            )}

            {categoriaInfo.filtros.includes("nuevo") && (
              <FiltroOpcion
                label="Nuevos ingresos"
                checked={filtros.soloNuevos}
                onChange={() => setFiltros((prev) => ({ ...prev, soloNuevos: !prev.soloNuevos }))}
              />
            )}
          </div>

          {categoriaInfo.filtros.length > 0 && (
            <button
              type="button"
              onClick={() => setPanelAbierto(true)}
              className="stamp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 4px",
                border: "none",
                background: "none",
                color: "var(--ink)",
                fontSize: 12.5,
                letterSpacing: "0.06em",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <IconSliders />
              Filtrar y ordenar
            </button>
          )}
        </div>

        {productosOrdenados.length === 0 ? (
          <p style={{ color: "var(--ink-soft)" }}>
            Todavía no hay productos cargados en esta categoría.
          </p>
        ) : (
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 26,
            }}
          >
            {productosOrdenados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </div>
      )}

      {/* Panel de filtros deslizable, con overlay */}
      {panelAbierto && categoriaInfo && (
        <>
          <div
            onClick={() => setPanelAbierto(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(38,38,31,0.45)",
              zIndex: 300,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              right: 0,
              width: 380,
              maxWidth: "90vw",
              background: "var(--card-bg)",
              zIndex: 301,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-4px 0 24px rgba(38,38,31,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 24px 20px",
              }}
            >
              <h2 className="display" style={{ fontSize: 26, margin: 0 }}>
                Filtrar
              </h2>
              <button
                type="button"
                onClick={() => setPanelAbierto(false)}
                aria-label="Cerrar"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
              {categoriaInfo.filtros.includes("precio") && (
                <FiltroSeccion
                  titulo="Ordenar por"
                  abierta={seccionesAbiertas.has("orden")}
                  onToggle={() => toggleSeccion("orden")}
                >
                  {OPCIONES_ORDEN.map((o) => (
                    <FiltroOpcionRadio
                      key={o.valor}
                      label={o.etiqueta}
                      checked={filtros.orden === o.valor}
                      onChange={() => setFiltros((prev) => ({ ...prev, orden: o.valor }))}
                    />
                  ))}
                </FiltroSeccion>
              )}

              {categoriaInfo.filtros.includes("precio") && (
                <FiltroSeccion
                  titulo="Precio"
                  abierta={seccionesAbiertas.has("precio")}
                  onToggle={() => toggleSeccion("precio")}
                >
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label
                        className="stamp"
                        style={{ display: "block", fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 6 }}
                      >
                        Desde
                      </label>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 4, padding: "0 10px" }}>
                        <span style={{ color: "var(--ink-soft)", fontSize: 13 }}>$</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="100000"
                          value={filtros.precioMin}
                          onChange={(e) => setFiltros((prev) => ({ ...prev, precioMin: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "9px 8px",
                            border: "none",
                            outline: "none",
                            fontSize: 13,
                            color: "var(--ink)",
                            background: "transparent",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        className="stamp"
                        style={{ display: "block", fontSize: 10.5, color: "var(--ink-soft)", marginBottom: 6 }}
                      >
                        Hasta
                      </label>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 4, padding: "0 10px" }}>
                        <span style={{ color: "var(--ink-soft)", fontSize: 13 }}>$</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="200000"
                          value={filtros.precioMax}
                          onChange={(e) => setFiltros((prev) => ({ ...prev, precioMax: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "9px 8px",
                            border: "none",
                            outline: "none",
                            fontSize: 13,
                            color: "var(--ink)",
                            background: "transparent",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </FiltroSeccion>
              )}

              {categoriaInfo.filtros.includes("color") && coloresDisponibles.length > 0 && (
                <FiltroSeccion
                  titulo="Color"
                  abierta={seccionesAbiertas.has("color")}
                  onToggle={() => toggleSeccion("color")}
                >
                  {coloresDisponibles.map((c) => (
                    <FiltroOpcion
                      key={c}
                      label={c}
                      checked={filtros.color.has(c)}
                      onChange={() => toggleSetFiltro("color", c)}
                      swatch={colorSwatch(c)}
                    />
                  ))}
                </FiltroSeccion>
              )}

              {categoriaInfo.filtros.includes("marca") && marcasDisponibles.length > 0 && (
                <FiltroSeccion
                  titulo="Marca"
                  abierta={seccionesAbiertas.has("marca")}
                  onToggle={() => toggleSeccion("marca")}
                >
                  {marcasDisponibles.map((m) => (
                    <FiltroOpcion
                      key={m}
                      label={m}
                      checked={filtros.marca.has(m)}
                      onChange={() => toggleSetFiltro("marca", m)}
                    />
                  ))}
                </FiltroSeccion>
              )}

              {categoriaInfo.filtros.includes("material") && (
                <FiltroSeccion
                  titulo="Material"
                  abierta={seccionesAbiertas.has("material")}
                  onToggle={() => toggleSeccion("material")}
                >
                  {(categoriaActiva === "alianzas" ? MATERIALES_ALIANZAS : MATERIALES_ESTANDAR).map((v) => (
                    <FiltroOpcion
                      key={v}
                      label={MATERIAL_LABEL[v]}
                      checked={filtros.material.has(v)}
                      onChange={() => toggleSetFiltro("material", v)}
                    />
                  ))}
                </FiltroSeccion>
              )}

              {categoriaInfo.filtros.includes("abridor") && (
                <FiltroSeccion
                  titulo="Cierre"
                  abierta={seccionesAbiertas.has("abridor")}
                  onToggle={() => toggleSeccion("abridor")}
                >
                  <FiltroOpcion
                    label="Con abridor"
                    checked={filtros.abridor === true}
                    onChange={() =>
                      setFiltros((prev) => ({
                        ...prev,
                        abridor: prev.abridor === true ? null : true,
                      }))
                    }
                  />
                  <FiltroOpcion
                    label="Sin abridor"
                    checked={filtros.abridor === false}
                    onChange={() =>
                      setFiltros((prev) => ({
                        ...prev,
                        abridor: prev.abridor === false ? null : false,
                      }))
                    }
                  />
                </FiltroSeccion>
              )}
            </div>

            <div style={{ padding: 24 }}>
              <button
                type="button"
                onClick={() => setPanelAbierto(false)}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "none",
                  borderRadius: 4,
                  background: "var(--ink)",
                  color: "var(--porcelain)",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                APLICAR FILTROS
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function IconSliders() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.3" />
      <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7" cy="5" r="2" fill="var(--card-bg)" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13" cy="10" r="2" fill="var(--card-bg)" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="15" r="2" fill="var(--card-bg)" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function FiltroSeccion({ titulo, abierta, onToggle, children }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)", padding: "18px 0" }}>
      <button
        type="button"
        onClick={onToggle}
        className="stamp"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "var(--ink)",
          cursor: "pointer",
        }}
      >
        {titulo}
        <span style={{ fontSize: 11, transform: abierta ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {abierta && <div style={{ marginTop: 16 }}>{children}</div>}
    </div>
  );
}

function FiltroOpcion({ label, checked, onChange, swatch }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13.5,
        padding: "6px 0",
        cursor: "pointer",
        color: "var(--ink-soft)",
      }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {swatch && (
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 3,
            background: swatch,
            border: "1px solid var(--line)",
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </label>
  );
}

function FiltroOpcionRadio({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13.5,
        padding: "6px 0",
        cursor: "pointer",
        color: "var(--ink-soft)",
      }}
    >
      <input type="radio" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
