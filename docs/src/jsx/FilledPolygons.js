//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

// #BEGIN EXAMPLE
import polygonGenerator from "polygon-generator";
import React, { useState } from "react";

import useRange from "./utils/useRange";
import Worldview, { FilledPolygons, Axes } from "regl-worldview";

// #BEGIN EDITABLE
function Example() {
  const [selectedObj, setSelectedObj] = useState();
  const range = useRange();
  const sideLength = 5 * range + 5;
  const startingAngle = 15 * range;
  const numSides = Math.floor(range * 15) + 1;
  const randomPolygon = polygonGenerator.coordinates(numSides, sideLength, startingAngle);
  const vertices = randomPolygon.map(({ x, y }) => ({ x, y, z: 0 }));
  const polygons = [
    {
      points: vertices,
      color: { r: 1 - range * 0.5, g: range, b: 1, a: 1 - range * 0.3 },
      id: 1,
    },
  ];
  return (
    <div style={{ position: "relative" }}>
      <Worldview
        onClick={(_, clickInfo) => {
          setSelectedObj(polygons.find(({ id }) => id === clickInfo.objectId));
        }}>
        <FilledPolygons getHitmapId={({ id }) => id}>{polygons}</FilledPolygons>
        <Axes />
        {selectedObj && (
          <div
            style={{
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              fontSize: "10px",
            }}>
            {JSON.stringify(selectedObj)}
          </div>
        )}
      </Worldview>
    </div>
  );
}
// #END EXAMPLE

export default Example;
