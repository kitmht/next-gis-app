"use client";

import { defaults as defaultControls } from "ol/control";
import TileLayer from "ol/layer/Tile";
import OLMap from "ol/Map";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { useEffect, useRef } from "react";

const MAP_CENTER: [number, number] = [139.6917, 35.6895];

export function OlMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<OLMap | null>(null);

  useEffect(() => {
    if (mapInstanceRef.current || !mapContainerRef.current) {
      return;
    }

    const map = new OLMap({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(MAP_CENTER),
        zoom: 11,
      }),
      controls: defaultControls({
        attributionOptions: {
          collapsible: false,
        },
      }),
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full">
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
