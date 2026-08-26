"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORIAS, MATERIAL_LABEL, TIPO_LABEL } from "../lib/categorias";

export default function CatalogoClient({ productos }) {
  const [categoriaActiva, setCategoriaActiva] = useState("relojes");

  // Permite entrar directo a una categoría vía /catalogo?cat=swarovski
  // (usado por los links de "Comprá por categoría" en la home).
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && CATEGORIAS.some((c) => c.slug === cat)) {
      setCategoriaActiva(cat);
    }
  }, []);

  const [filtros, setFiltros] = useState({
    tipo: new Set(),
    marca: new Set(),
    material: new Set(),
    abridor: null, // true | false | null (null = sin filtrar)
  });

  const categoriaInfo = CATEGORIAS.find((c) => c.slug === categoriaActiva);

  const productosCategoria = useMemo(
    () => productos.filter((p) => p.categoria_slug === categoriaActiva),
    [productos, categoriaActiva]
  );

  const marcasDisponibles = useMemo(
    () =>
      [...new Set(productosCategoria.map((p) => p.marca).filter(Boolean))].sort(),
    [productosCategoria]
  );

  const productosFiltrados = useMemo(() => {
    return productosCategoria.filter((p) => {
      if (filtros.tipo.size && !filtros.tipo.has(p.tipo)) return false;
      if (filtros.marca.size && !filtros.marca.has(p.marca)) return false;
      if (filtros.material.size && !filtros.material.has(p.material))
        return false;
      if (filtros.abridor !== null && p.tiene_abridor !== filtros.abridor)
        return false;
      return true;
    });
  }, [productosCategoria, filtros]);

  function cambiarCategoria(slug) {
    setCategoriaActiva(slug);
    setFiltros({ tipo: new Set(), marca: new Set(), material: new Set(), abridor: null });
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
      {/* Tira de categorías */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "10px 0 40px", borderBottom: "1px solid var(--line)" }}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => cambiarCategoria(cat.slug)}
            className="stamp"
            style={{
              padding: "14px 22px",
              border: `1px solid ${categoriaActiva === cat.slug ? "var(--oro)" : "var(--line)"}`,
              borderRadius: 4,
              background: categoriaActiva === cat.slug ? "#FBF6EC" : "var(--card-bg)",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 44, marginTop: 40 }}>
        {/* Filtros según la categoría activa */}
        <aside>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 16 }}>
            Filtros
          </h3>

          {categoriaInfo.filtros.includes("tipo") && (
            <FiltroGrupo titulo="Tipo">
              {["dama", "caballero"].map((v) => (
                <FiltroOpcion
                  key={v}
                  label={TIPO_LABEL[v]}
                  checked={filtros.tipo.has(v)}
                  onChange={() => toggleSetFiltro("tipo", v)}
                />
              ))}
            </FiltroGrupo>
          )}

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
              {["oro_18k", "plata_925"].map((v) => (
                <FiltroOpcion
                  key={v}
                  label={MATERIAL_LABEL[v]}
                  checked={filtros.material.has(v)}
                  onChange={() => toggleSetFiltro("material", v)}
                />
              ))}
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
          {productosFiltrados.length === 0 ? (
            <p style={{ color: "var(--ink-soft)" }}>
              Todavía no hay productos cargados en esta categoría.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 26,
              }}
            >
              {productosFiltrados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
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
