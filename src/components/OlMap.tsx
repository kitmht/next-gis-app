"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type OpenLayersNamespace = {
  Map: new (options: {
    target: HTMLElement;
    layers: unknown[];
    view: unknown;
    controls?: unknown;
  }) => {
    setTarget: (target?: string | HTMLElement) => void;
  };
  View: new (options: { center: [number, number]; zoom: number }) => unknown;
  layer: {
    Tile: new (options: { source: unknown }) => unknown;
  };
  source: {
    OSM: new () => unknown;
  };
  proj: {
    fromLonLat: (coordinates: [number, number]) => [number, number];
  };
  control: {
    defaults: (options?: {
      attributionOptions?: { collapsible?: boolean };
    }) => unknown;
  };
};

declare global {
  interface Window {
    ol?: OpenLayersNamespace;
  }
}

const MAP_CENTER: [number, number] = [139.6917, 35.6895];

export function OlMap() {
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<InstanceType<
    OpenLayersNamespace["Map"]
  > | null>(null);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    if (
      !isLibraryLoaded ||
      mapInstanceRef.current ||
      !mapContainerRef.current
    ) {
      return;
    }

    const ol = typeof window !== "undefined" ? window.ol : undefined;

    if (!ol) {
      return;
    }

    const { Map: OlMapConstructor, View } = ol;

    mapInstanceRef.current = new OlMapConstructor({
      target: mapContainerRef.current,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new View({
        center: ol.proj.fromLonLat(MAP_CENTER),
        zoom: 11,
      }),
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false,
        },
      }),
    });

    return () => {
      mapInstanceRef.current?.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, [isLibraryLoaded]);

  return (
    <div className="relative w-full">
      <Script
        src="https://cdn.jsdelivr.net/npm/ol/ol.js"
        strategy="afterInteractive"
        onLoad={() => setIsLibraryLoaded(true)}
      />
      <section
        ref={mapContainerRef}
        className="h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl"
        aria-label="OpenLayers map"
      />
      <p className="mt-3 text-xs text-slate-300">
        地図データ ©{" "}
        <a className="underline" href="https://www.openstreetmap.org/copyright">
          OpenStreetMap
        </a>{" "}
        contributors
      </p>
    </div>
  );
}

export default OlMap;
