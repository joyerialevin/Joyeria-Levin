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
    if (filtros.orden === "destacado") return productosFiltrados;
    const signo = filtros.orden === "precio-asc" ? 1 : -1;
    return [...productosFiltrados].sort((a, b) => {
      // Productos sin precio (a consultar) siempre quedan al final,
      // sea cual sea el sentido del orden.
      if (a.precio == null && b.precio == null) return 0;
      if (a.precio == null) return 1;
      if (b.precio == null) return -1;
      return (a.precio - b.precio) * signo;
    });
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
            return (
              <button
                key={slug}
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
            );
          })}
        </div>
      )}

      {!categoriaInfo ? (
        <p style={{ color: "var(--ink-soft)", marginTop: 40 }}>Próximamente.</p>
      ) : (
      <div className="catalogo-filtros-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 44, marginTop: 40 }}>
        {/* Filtros según la categoría activa */}
        <aside>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 16 }}>
            Filtros
          </h3>

          {categoriaInfo.filtros.includes("marca") && marcasDisponibles.length > 0 && (
            <FiltroGrupo titulo="Marca">
              {marcasDisponibles.map((m) => (
                <FiltroOpcion
                  key={m}
                  label={m}
                  checked={filtros.marca.has(m)}
                  onChange={() => toggleSetFiltro("marca", m)}
                />
              ))}
            </FiltroGrupo>
          )}

          {categoriaInfo.filtros.includes("material") && (
            <FiltroGrupo titulo="Material">
              {(categoriaActiva === "alianzas" ? MATERIALES_ALIANZAS : MATERIALES_ESTANDAR).map((v) => (
                <FiltroOpcion
                  key={v}
                  label={MATERIAL_LABEL[v]}
                  checked={filtros.material.has(v)}
                  onChange={() => toggleSetFiltro("material", v)}
                />
              ))}
            </FiltroGrupo>
          )}

          {categoriaInfo.filtros.includes("nuevo") && (
            <FiltroGrupo titulo="Novedades">
              <FiltroOpcion
                label="Nuevos ingresos"
                checked={filtros.soloNuevos}
                onChange={() => setFiltros((prev) => ({ ...prev, soloNuevos: !prev.soloNuevos }))}
              />
            </FiltroGrupo>
          )}

          {categoriaInfo.filtros.includes("tipoProducto") && tiposProductoDisponibles.length > 0 && (
            <FiltroGrupo titulo="Tipo de producto">
              {tiposProductoDisponibles.map((t) => (
                <FiltroOpcion
                  key={t}
                  label={TIPO_PRODUCTO_LABEL[t]}
                  checked={filtros.tipoProducto === t}
                  onChange={() =>
                    setFiltros((prev) => ({
                      ...prev,
                      tipoProducto: prev.tipoProducto === t ? null : t,
                    }))
                  }
                />
              ))}
            </FiltroGrupo>
          )}

          {categoriaInfo.filtros.includes("color") && coloresDisponibles.length > 0 && (
            <FiltroGrupo titulo="Color">
              {coloresDisponibles.map((c) => (
                <FiltroOpcion
                  key={c}
                  label={c}
                  checked={filtros.color.has(c)}
                  onChange={() => toggleSetFiltro("color", c)}
                />
              ))}
            </FiltroGrupo>
          )}

          {categoriaInfo.filtros.includes("precio") && (
            <FiltroGrupo titulo="Precio">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Desde"
                  value={filtros.precioMin}
                  onChange={(e) =>
                    setFiltros((prev) => ({ ...prev, precioMin: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    fontSize: 13,
                    color: "var(--ink)",
                    background: "var(--card-bg)",
                  }}
                />
                <span style={{ color: "var(--ink-soft)" }}>–</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Hasta"
                  value={filtros.precioMax}
                  onChange={(e) =>
                    setFiltros((prev) => ({ ...prev, precioMax: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    fontSize: 13,
                    color: "var(--ink)",
                    background: "var(--card-bg)",
                  }}
                />
              </div>
            </FiltroGrupo>
          )}

          {categoriaInfo.filtros.includes("abridor") && (
            <FiltroGrupo titulo="Cierre">
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
            </FiltroGrupo>
          )}
        </aside>

        {/* Grilla de productos */}
        <div>
          {categoriaInfo.filtros.includes("precio") && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <label
                className="stamp"
                htmlFor="ordenar-por"
                style={{ fontSize: 11.5, color: "var(--ink-soft)" }}
              >
                Ordenar por
              </label>
              <select
                id="ordenar-por"
                value={filtros.orden}
                onChange={(e) => setFiltros((prev) => ({ ...prev, orden: e.target.value }))}
                style={{
                  padding: "8px 10px",
                  border: "1px solid var(--line)",
                  borderRadius: 4,
                  fontSize: 13,
                  color: "var(--ink)",
                  background: "var(--card-bg)",
                  cursor: "pointer",
                }}
              >
                {OPCIONES_ORDEN.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.etiqueta}
                  </option>
                ))}
              </select>
            </div>
          )}

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
      </div>
      )}
    </section>
  );
}

function FiltroGrupo({ titulo, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h4
        className="stamp"
        style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 10 }}
      >
        {titulo}
      </h4>
      {children}
    </div>
  );
}

function FiltroOpcion({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        fontSize: 13.5,
        padding: "6px 0",
        cursor: "pointer",
        color: "var(--ink-soft)",
      }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
