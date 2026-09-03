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
} from "../lib/categorias";

export default function CatalogoClient({ productos }) {
  const searchParams = useSearchParams();
  const [grupoActivo, setGrupoActivo] = useState("caballero");
  const [categoriaActiva, setCategoriaActiva] = useState("relojes");
  const [filtros, setFiltros] = useState({
    marca: new Set(),
    material: new Set(),
    abridor: null, // true | false | null (null = sin filtrar)
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

  const productosFiltrados = useMemo(() => {
    return productosCategoria.filter((p) => {
      if (filtros.marca.size && !filtros.marca.has(p.marca)) return false;
      if (filtros.material.size && !filtros.material.has(p.material))
        return false;
      if (filtros.abridor !== null && p.tiene_abridor !== filtros.abridor)
        return false;
      return true;
    });
  }, [productosCategoria, filtros]);

  function limpiarFiltros() {
    setFiltros({ marca: new Set(), material: new Set(), abridor: null });
  }

  function cambiarCategoria(slug) {
    setCategoriaActiva(slug);
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
      {/* Tira de categorías dentro del grupo activo (Caballero/Dama/Alianzas
          se elige desde el menú de arriba, no se repite acá) */}
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
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 44, marginTop: 40 }}>
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
